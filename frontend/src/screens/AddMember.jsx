import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
function AddMember() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    fatherName: "",
    age: '',
    gender: "",
    joinDate: "",
    phone: "",
    membershipType: "",
  });

  const [useNowDate, setUseNowDate] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const payload = {
      ...form,
      joinDate: useNowDate ? new Date().toISOString() : form.joinDate,
    };

    await fetch("http://localhost:5000/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    alert("Member added!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Member</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="fatherName">
          <Form.Label>Father Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter father name"
            value={form.fatherName}
            onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="gender">
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

        <Form.Group controlId="joinDate">
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
              onChange={(e) => setUseNowDate(e.target.checked)}
              className="ml-2"
            />
          </div>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="membershipType">
          <Form.Label>Membership Type</Form.Label>
          <Form.Control
            as="select"
            value={form.membershipType}
            onChange={(e) => setForm({ ...form, membershipType: e.target.value })}
          >
            <option value="">Select Membership Type</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="mt-3"
        >
          Add Member
        </Button>
      </Form>
    </div>
  );
}

export default AddMember;
