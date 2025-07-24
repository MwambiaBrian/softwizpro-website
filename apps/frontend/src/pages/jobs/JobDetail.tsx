import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  createdAt: string;
}

export default function JobDetail() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/job-posting`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  const selectedJob = jobs.find((j) => j._id === jobId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume || !jobId) {
      alert("Please upload a resume and make sure job ID is valid.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume", formData.resume);
    data.append("jobId", jobId);

    try {
      await axios.post(`${BASE_URL}/job-application`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application submitted successfully!");
      navigate("/careers");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit application. Try again.");
    }
  };

  if (!selectedJob) {
    return (
      <Layout>
        <div className="text-white py-5 text-center">
          <h2 className="text-warning">Job Not Found</h2>
          <p>The job you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className="py-5 text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="container">
          <h2 className="text-warning mb-2">{selectedJob.title}</h2>
          <p className="text-light">
            <strong>Location:</strong> {selectedJob.location} |{" "}
            <strong>Type:</strong> {selectedJob.employmentType}
          </p>
          <p className="mb-4">{selectedJob.description}</p>

          <h5 className="text-warning">Responsibilities</h5>
          <ul>
            {selectedJob.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h5 className="mt-4 text-warning">Qualifications</h5>
          <ul>
            {selectedJob.qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr className="my-5" />

          <h4 className="text-warning">Apply Now</h4>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Upload Resume (PDF or DOC)</label>
              <input
                type="file"
                name="resume"
                className="form-control"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-warning">
              Submit Application
            </button>
          </form>

          {/* Scroll Feed of Other Jobs */}
          <hr className="my-5" />
          <h4 className="text-orange mb-3">Other Openings</h4>
          <div
            className="d-flex gap-4 overflow-auto"
            style={{ whiteSpace: "nowrap" }}
          >
            {jobs
              .filter((job) => job._id !== selectedJob._id)
              .map((job) => (
                <div
                  key={job._id}
                  className="card bg-light text-dark"
                  style={{ minWidth: "250px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="mb-1" style={{ fontSize: "0.9rem" }}>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p className="mb-2" style={{ fontSize: "0.85rem" }}>
                      {job.description.slice(0, 80)}...
                    </p>
                    <a
                      href={`/careers/${job._id}`}
                      className="btn btn-sm btn-outline-dark"
                    >
                      View Job
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
