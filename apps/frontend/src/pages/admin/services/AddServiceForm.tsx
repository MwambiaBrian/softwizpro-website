import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFormData {
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  imageUrl: string;
  faqs: FAQ[];
  photos: File[]; // New field for uploaded photos
}

const AddServiceForm: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    shortDescription: "",
    longDescription: "",
    features: [""],
    imageUrl: "",
    faqs: [{ question: "", answer: "" }],
    photos: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, photos: filesArray }));
    }
  };
  const addFeature = () =>
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));

  const handleFaqChange = (index: number, field: keyof FAQ, value: string) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData((prev) => ({ ...prev, faqs: updatedFaqs }));
  };

  const addFaq = () =>
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("shortDescription", formData.shortDescription);
    form.append("longDescription", formData.longDescription);

    formData.features.forEach((feature) => form.append("features", feature));

    formData.faqs.forEach((faq) => form.append("faqs", JSON.stringify(faq)));

    formData.photos.forEach((file) => {
      form.append("photos", file);
    });

    try {
      const res = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to submit");

      const result = await res.json();
      console.log("Service created:", result);
      navigate("/admin/services");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div
      style={{
        maxHeight: "100vh",
        overflow: "hidden",
        padding: "2rem",
        marginLeft: "100px",
        backgroundColor: "#fff",
        color: "black",
      }}
    >
      <h2 style={{ color: "black", marginBottom: "1.5rem" }}>
        Add New Service
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f5f5f5",
          padding: "1.5rem",
          borderRadius: "8px",
          maxHeight: "75vh",
          overflowY: "auto",
          border: "1px solid cadetblue",
        }}
      >
        <div className="mb-3">
          <label className="form-label">Service Title</label>
          <input
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Web Development"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <input
            name="shortDescription"
            className="form-control"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="A short summary..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <textarea
            name="longDescription"
            className="form-control"
            value={formData.longDescription}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="imageUrl"
            className="form-control"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Photos</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          {formData.photos.length > 0 && (
            <ul style={{ marginTop: "0.5rem" }}>
              {formData.photos.map((file, idx) => (
                <li key={idx} style={{ fontSize: "0.9rem" }}>
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Features</label>
          {formData.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={addFeature}
            style={{
              backgroundColor: "cadetblue",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              marginTop: "0.5rem",
            }}
          >
            + Add Feature
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">FAQs</label>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Question"
                value={faq.question}
                onChange={(e) =>
                  handleFaqChange(index, "question", e.target.value)
                }
              />
              <input
                type="text"
                className="form-control"
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) =>
                  handleFaqChange(index, "answer", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            style={{
              backgroundColor: "cadetblue",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              marginTop: "0.5rem",
            }}
          >
            + Add FAQ
          </button>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "orange",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "1rem",
          }}
        >
          Save Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
