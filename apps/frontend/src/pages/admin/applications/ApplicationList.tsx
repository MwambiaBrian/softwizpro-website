import React from "react";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";

interface Application {
  id: string;
  name: string;
  email: string;
  resumeUrl: string;
  submittedAt: string;
}

const dummyApplications: Application[] = [
  {
    id: "a1",
    name: "John Doe",
    email: "john@example.com",
    resumeUrl: "https://example.com/resume.pdf",
    submittedAt: "2025-07-05",
  },
  {
    id: "a2",
    name: "Jane Smith",
    email: "jane@example.com",
    resumeUrl: "https://example.com/resume2.pdf",
    submittedAt: "2025-07-06",
  },
];

const ApplicationsList: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-500">
          Applications for Job ID: {jobId}
        </h2>
        <CSVLink
          data={dummyApplications}
          filename={`job_${jobId}_applicants.csv`}
          className="bg-cadetblue text-white px-4 py-2 rounded"
        >
          Export CSV
        </CSVLink>
      </div>
      <table className="w-full border">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Resume</th>
            <th className="p-2">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {dummyApplications.map((app) => (
            <tr key={app.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{app.name}</td>
              <td className="p-2">{app.email}</td>
              <td className="p-2">
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </td>
              <td className="p-2">{app.submittedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
