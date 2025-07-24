import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Application {
  _id: string;
  name: string;
  email: string;
  resumePath: string;
  createdAt: string;
}

interface Job {
  _id: string;
  title: string;
}

const ApplicationsList: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!jobId) return;

    // Fetch job applications
    axios
      .get(`${BASE_URL}/job-application/job/${jobId}`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching applications:", err));

    // Fetch job details (e.g., job title)
    axios
      .get(`${BASE_URL}/job-posting/${jobId}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Error fetching job:", err));
  }, [jobId]);

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportExcel = () => {
    const worksheetData = filteredApplications.map((app) => ({
      Name: app.name,
      Email: app.email,
      "Resume URL": `${BASE_URL}/uploads/resumes/${app.resumePath}`,
      "Submitted At": new Date(app.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const safeJobTitle =
      job?.title?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "job";

    saveAs(blob, `${safeJobTitle}_applications.xlsx`);
  };

  return (
    <div
      className="container"
      style={{ marginLeft: "100px", maxWidth: "960px" }}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 mt-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "orange" }}>
            Applications for: {job?.title || `Job ID ${jobId}`}
          </h2>
          <p className="text-muted small">
            Total Applications: {filteredApplications.length}
          </p>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0">
          <input
            type="text"
            placeholder="Search by name or email"
            className="form-control"
            style={{ width: "250px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleExportExcel} className="btn btn-success">
            ⬇ Export to Excel
          </button>
        </div>
      </div>

      <div className="table-responsive bg-white shadow rounded">
        <table className="table table-bordered text-center align-middle">
          <thead
            className="table-dark"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>
                    <a
                      href={`${BASE_URL}/uploads/resumes/${app.resumePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "cadetblue" }}
                    >
                      View Resume
                    </a>
                  </td>
                  <td>{new Date(app.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-muted py-3">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsList;
