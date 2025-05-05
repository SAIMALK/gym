import React, { useState, useRef } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { BASE_URL } from "../constants";

// Image optimization helper
const optimizeImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      return reject(new Error('File is not an image'));
    }

    // Create file reader
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        // Create canvas for resizing
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        
        // Set canvas dimensions and draw resized image
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with reduced quality
        const optimizedBase64 = canvas.toDataURL(file.type, quality);
        resolve(optimizedBase64);
      };
      
      img.onerror = (error) => {
        reject(error);
      };
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

function AddMember() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    fatherName: "",
    age: "",
    gender: "",
    joinDate: "",
    phone: "",
    membershipType: "",
    membershipStartDate: "",
    membershipEndDate: "",
  });

  const [useNowDate, setUseNowDate] = useState(false);
  const navigate = useNavigate();
  const [imageSource, setImageSource] = useState("url"); // 'url' or 'upload'
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleUseNowChange = (checked) => {
    setUseNowDate(checked);
    if (checked) {
      const today = new Date().toISOString().split("T")[0];
      setForm((prevForm) => ({ ...prevForm, joinDate: today }));
    } else {
      setForm((prevForm) => ({ ...prevForm, joinDate: "" }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const requiredFields = ["name", "email", "phone", "membershipType", "membershipStartDate", "membershipEndDate"];
    const missing = requiredFields.filter(field => !form[field]);
    
    if (missing.length > 0) {
      setError(`Missing required fields: ${missing.join(', ')}`);
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    // Validate phone number (basic validation)
    if (form.phone.length < 10) {
      setError("Phone number should be at least 10 digits");
      return false;
    }
    
    // Validate dates
    try {
      const startDate = new Date(form.membershipStartDate);
      const endDate = new Date(form.membershipEndDate);
      
      if (endDate < startDate) {
        setError("Membership end date must be after start date");
        return false;
      }
    } catch (err) {
      setError("Invalid date format");
      return false;
    }
    
    return true;
  };

  // Handle image upload with optimization
  const handleImageUpload = async (file) => {
    try {
      setImageProcessing(true);
      setError("");
      
      // Check file size before optimization (limit to 5MB for initial upload)
      const maxInitialSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxInitialSize) {
        setError("Image file is too large. Please select an image under 5MB.");
        setImageProcessing(false);
        return;
      }
      
      // Optimize the image
      const optimizedImage = await optimizeImage(file);
      
      // Check if the optimized image is still too large
      // Roughly estimating base64 size - this is approximate
      const base64Length = optimizedImage.length;
      const maxBase64Length = 800000; // ~800KB for safety
      
      if (base64Length > maxBase64Length) {
        setError("Image is still too large after optimization. Please use a smaller image.");
        setImageProcessing(false);
        return;
      }
      
      // Set the optimized image
      setForm(prevForm => ({ ...prevForm, image: optimizedImage }));
      setPreviewImage(optimizedImage);
      setImageProcessing(false);
      
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Error processing image. Please try again or use a different image.");
      setImageProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Don't proceed if image is still processing
    if (imageProcessing) {
      setError("Please wait for the image to finish processing");
      return;
    }
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    const token = localStorage.getItem("token");
    
    // Prepare payload
    const payload = {
      ...form,
      joinDate: useNowDate ? new Date().toISOString() : form.joinDate ? new Date(form.joinDate).toISOString() : new Date().toISOString(),
      age: form.age ? Number(form.age) : null,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Get response as text first to debug any JSON parsing issues
      const responseText = await res.text();
      let data;
      
      try {
        // Try to parse as JSON
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText);
        throw new Error("Server returned an invalid response");
      }
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to add member");
      }

      setSuccess(true);
      
      // Reset form
      setForm({
        name: "",
        email: "",
        image: "",
        fatherName: "",
        age: "",
        gender: "",
        joinDate: "",
        phone: "",
        membershipType: "",
        membershipStartDate: "",
        membershipEndDate: "",
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      setUseNowDate(false);
      setPreviewImage("");
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/members");
      }, 1500);
      
    } catch (error) {
      setError(error.message || "Error adding member. Please try again.");
      console.error("Error adding member:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageSourceChange = (source) => {
    setImageSource(source);
    // When changing image source, clear image data but maintain empty string (not undefined)
    setForm(prevForm => ({ ...prevForm, image: "" }));
    setPreviewImage("");
    resetFileInput();
  };

  return (
    <div className="p-4">
      <div style={{ marginLeft: "10%", marginBottom: "20px" }}>
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      </div>

      <FormContainer>
        <h1 className="mb-4">Add Member</h1>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Member added successfully!</Alert>}
        
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Form.Group>

          {/* Father Name */}
          <Form.Group controlId="fatherName" className="mb-3">
            <Form.Label>Father Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter father name"
              value={form.fatherName}
              onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
            />
          </Form.Group>

          {/* Age */}
          <Form.Group controlId="age" className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              min="1"
              max="120"
            />
          </Form.Group>

          {/* Gender */}
          <Form.Group controlId="gender" className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>

          {/* Join Date */}
          <Form.Group controlId="joinDate" className="mb-3">
            <Form.Label>Join Date</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="date"
                value={form.joinDate}
                onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
                disabled={useNowDate}
              />
              <Form.Check
                type="checkbox"
                label="Use Now"
                checked={useNowDate}
                onChange={(e) => handleUseNowChange(e.target.checked)}
                className="ms-3"
              />
            </div>
          </Form.Group>

          {/* Membership Start Date */}
          <Form.Group controlId="membershipStartDate" className="mb-3">
            <Form.Label>Membership Start Date <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              value={form.membershipStartDate}
              onChange={(e) => setForm({ ...form, membershipStartDate: e.target.value })}
              required
            />
          </Form.Group>

          {/* Membership End Date */}
          <Form.Group controlId="membershipEndDate" className="mb-3">
            <Form.Label>Membership End Date <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              value={form.membershipEndDate}
              onChange={(e) => setForm({ ...form, membershipEndDate: e.target.value })}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </Form.Group>

          {/* Membership Type */}
          <Form.Group controlId="membershipType" className="mb-3">
            <Form.Label>Membership Type <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              value={form.membershipType}
              onChange={(e) => setForm({ ...form, membershipType: e.target.value })}
              required
            >
              <option value="">Select Membership Type</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </Form.Control>
          </Form.Group>

          {/* Image Source Selection */}
          <Form.Group controlId="imageSource" className="mb-3">
            <Form.Label>Image Source</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="URL"
                name="imageSource"
                value="url"
                checked={imageSource === 'url'}
                onChange={() => handleImageSourceChange('url')}
              />
              <Form.Check
                inline
                type="radio"
                label="Upload"
                name="imageSource"
                value="upload"
                checked={imageSource === 'upload'}
                onChange={() => handleImageSourceChange('upload')}
              />
            </div>
          </Form.Group>
          
          {/* Image Input (URL or Upload) */}
          {imageSource === 'url' ? (
            <Form.Group controlId="image" className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={form.image}
                onChange={(e) => {
                  setForm({ ...form, image: e.target.value });
                  setPreviewImage(e.target.value);
                }}
              />
            </Form.Group>
          ) : (
            <Form.Group controlId="imageUpload" className="mb-4">
              <Form.Label>Upload Image <small>(Max 5MB, will be optimized)</small></Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
                disabled={imageProcessing}
              />
              {imageProcessing && (
                <div className="mt-2 d-flex align-items-center">
                  <Spinner animation="border" size="sm" className="me-2" />
                  <span>Optimizing image...</span>
                </div>
              )}
            </Form.Group>
          )}

          {/* Image Preview */}
          {previewImage && (
            <div className="mb-4">
              <h6>Image Preview</h6>
              <img 
                src={previewImage} 
                alt="Preview" 
                style={{ maxWidth: '300px', maxHeight: '200px' }}
                className="img-thumbnail"
              />
            </div>
          )}
          
          {/* Form submission button */}
          <Button 
            type="submit" 
            variant="primary" 
            disabled={loading || imageProcessing}
          >
            {loading ? 'Adding...' : 'Add Member'}
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default AddMember;