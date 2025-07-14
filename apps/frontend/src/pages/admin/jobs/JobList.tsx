import React from "react";
import { Link } from "react-router-dom";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
}

const dummyJobs: JobPosting[] = [
  {
    id: "1",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    postedDate: "2025-07-01",
  },
  {
    id: "2",
    title: "HR Manager",
    department: "Human Resources",
    location: "Nairobi",
    type: "Part-time",
    postedDate: "2025-06-20",
  },
];

const AdminJobList: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-orange-500">
          Job Listings
        </h2>
        <Link
          to="/admin/jobs/create"
          className="bg-cadetblue hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded-lg transition"
          style={{ backgroundColor: "cadetblue" }}
        >
          + Add New Job
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 rounded-md">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Posted</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyJobs.map((job) => (
              <tr
                key={job.id}
                className="border-t border-gray-200 hover:bg-orange-50 transition"
              >
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.department}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.type}</td>
                <td className="p-3">{job.postedDate}</td>
                <td className="p-3">
                  <Link
                    to={`/admin/jobs/${job.id}/applications`}
                    className="text-cadetblue font-medium hover:underline"
                    style={{ color: "cadetblue" }}
                  >
                    View Applications
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobList;
