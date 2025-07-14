import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";

interface JobFormData {
  title: string;
  description: string;
  location: string;
  type: string; // e.g., Full-time, Part-time
  salary: string;
  deadline: string;
}

const JobCreate: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    location: "",
    type: "",
    salary: "",
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("New job created:", formData);
    // Send data to API here
    navigate("/admin/jobs"); // Navigate back to job list
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold" style={{ color: "orange" }}>
        Create New Job Posting
      </h2>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Type</label>
          <input
            type="text"
            name="type"
            className="form-control"
            placeholder="e.g. Full-time, Part-time"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="text"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            className="form-control"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobCreate;
