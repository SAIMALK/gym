import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { BASE_URL } from '../constants';

const AttendanceView = () => {
  const [date, setDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/api/attendance?date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch attendance');
      
      const result = await response.json();
      console.log('API Response:', result);
      setAttendanceData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <h2 className="mb-4">Attendance Records</h2>
      
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="date" className="d-flex gap-3">
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ maxWidth: '300px' }}
          />
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Records'}
          </Button>
          <Button 
              variant="outline-dark" 
              onClick={handlePrint}
              disabled={loading}
              className="ml-auto d-block"            >
              Print Report
            </Button>
        </Form.Group>
      </Form>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .table {
            font-size: 14px;
          }
          .table thead th {
            background-color: #f8f9fa !important;
            color: #000 !important;
          }
          .table-bordered td, .table-bordered th {
            border: 1px solid #dee2e6 !important;
          }
        }
      `}</style>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="print-section">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Member Name</th>
            <th>Check-in Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record) => (
            <tr key={record._id}>
              <td>{record.MemberId}</td>
              <td>{record.memberName}</td> {/* Display member's name */}
              <td>
                {new Date(record.CheckIn).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
              <td>
                {new Date(record.Date).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {attendanceData.length === 0 && !loading && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No records found for this date
              </td>
            </tr>
          )}
        </tbody>
      </Table>
        </div>
    </div>

  );
};

export default AttendanceView;
