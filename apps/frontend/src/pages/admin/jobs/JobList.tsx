import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
}

const AdminJobList = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/job-posting`);
        setJobs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this job listing?")) {
      try {
        await axios.delete(`${BASE_URL}/job-posting/${id}`);
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete job.");
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold" style={{ color: "orange" }}>
        Job Listings Management
      </h2>

      <button
        onClick={() => navigate("/admin/jobs/create")}
        className="btn btn-success mb-3"
        style={{ backgroundColor: "cadetblue" }}
      >
        <i className="bi bi-plus-circle me-1"></i> Add New Job
      </button>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <i className="bi bi-briefcase me-2"></i> Current Job Openings
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No job listings available.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{job.employmentType}</td>
                    <td>{job.description}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/jobs/edit/${job._id}`)
                          }
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applications`)
                          }
                          className="btn btn-sm btn-outline-info"
                          title="View Applications"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobList;
