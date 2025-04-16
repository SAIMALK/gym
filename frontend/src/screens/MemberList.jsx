import { useEffect, useState } from "react";

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/members", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMembers(data);
        } else if (Array.isArray(data.members)) {
          setMembers(data.members);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Members</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Father's Name</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Join Date</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Membership</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr
                key={m._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-12 h-12 object-cover rounded-full border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>
                <td className="py-3 px-4">{m.name}</td>
                <td className="py-3 px-4">{m.email}</td>
                <td className="py-3 px-4">{m.fatherName}</td>
                <td className="py-3 px-4">{m.age}</td>
                <td className="py-3 px-4 capitalize">{m.gender}</td>
                <td className="py-3 px-4">{new Date(m.joinDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{m.phone}</td>
                <td className="py-3 px-4 capitalize">{m.membershipType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberList;
