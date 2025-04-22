import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/formContainer"; // Reuse same container
import { BASE_URL } from "../constants";
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
  });

  const [useNowDate, setUseNowDate] = useState(false);
  const handleUseNowChange = (checked) => {
    setUseNowDate(checked);
    if (checked) {
      const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
      setForm((prevForm) => ({ ...prevForm, joinDate: today }));
    } else {
      setForm((prevForm) => ({ ...prevForm, joinDate: "" }));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault(); // <-- prevent reload
  const token = localStorage.getItem("token");
  const payload = {
    ...form,
    joinDate: useNowDate ? new Date().toISOString() : form.joinDate,
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

    if (!res.ok) throw new Error("Failed to add member");

    alert("Member added!");
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
    });
    setUseNowDate(false);
  } catch (error) {
    alert("Error adding member.");
    console.error(error);
  }
};


  return (
    <div className="p-4">
      {/* Move the Go Back link below logo with 50px margin-left */}
      <div style={{ marginLeft: "10%", marginBottom: "20px" }}>
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      </div>

      <FormContainer>
        <h1 className="mb-4">Add Member</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="fatherName" className="mb-3">
            <Form.Label>Father Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter father name"
              value={form.fatherName}
              onChange={(e) =>
                setForm({ ...form, fatherName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="age" className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </Form.Group>

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

          <Form.Group controlId="joinDate" className="mb-3">
  <Form.Label>Join Date</Form.Label>
  <div className="d-flex align-items-center">
    <Form.Control
      type="date"
      value={form.joinDate}
      onChange={(e) =>
        setForm({ ...form, joinDate: e.target.value })
      }
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

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="membershipType" className="mb-3">
            <Form.Label>Membership Type</Form.Label>
            <Form.Control
              as="select"
              value={form.membershipType}
              onChange={(e) =>
                setForm({ ...form, membershipType: e.target.value })
              }
            >
              <option value="">Select Membership Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="mb-4">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Add Member
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}
export default AddMember;
