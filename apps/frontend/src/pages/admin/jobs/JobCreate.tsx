import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { FormEvent } from "react";

interface JobFormData {
  title: string;
  location: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

const JobCreate: React.FC = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    location: "",
    employmentType: "",
    description: "",
    responsibilities: [""],
    qualifications: [""],
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "responsibilities" | "qualifications"
  ) => {
    const newList = [...formData[field]];
    newList[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: newList,
    }));
  };

  const addListItem = (field: "responsibilities" | "qualifications") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeListItem = (
    index: number,
    field: "responsibilities" | "qualifications"
  ) => {
    const newList = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: newList,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/job-posting`, formData);
      navigate("/admin/careers");
    } catch (err) {
      console.error(err);
      setError("Failed to create job posting.");
    }
  };

  return (
    <div className="container py-4" style={{ marginLeft: "120px" }}>
      <h2 className="mb-4 fw-bold" style={{ color: "orange" }}>
        Create New Job Posting
      </h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Employment Type</label>
          <input
            type="text"
            name="employmentType"
            className="form-control"
            placeholder="e.g. Full-time, Part-time"
            value={formData.employmentType}
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
          <label className="form-label">Responsibilities</label>
          {formData.responsibilities.map((item, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control"
                value={item}
                onChange={(e) => handleListChange(e, index, "responsibilities")}
                required
              />
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeListItem(index, "responsibilities")}
                disabled={formData.responsibilities.length === 1}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addListItem("responsibilities")}
          >
            Add Responsibility
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Qualifications</label>
          {formData.qualifications.map((item, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control"
                value={item}
                onChange={(e) => handleListChange(e, index, "qualifications")}
                required
              />
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeListItem(index, "qualifications")}
                disabled={formData.qualifications.length === 1}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addListItem("qualifications")}
          >
            Add Qualification
          </button>
        </div>

        <button type="submit" className="btn btn-success">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobCreate;
