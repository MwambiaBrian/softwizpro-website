import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useState } from "react";

// Sample job data (normally this would come from an API or database)
const jobData = {
  "frontend-developer": {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-Time",
    description: `We are looking for a skilled Frontend Developer to join our team and help us build modern, responsive web applications.`,
    responsibilities: [
      "Build responsive UI with React or Vue.",
      "Work with backend APIs.",
      "Collaborate with designers and product managers.",
    ],
    qualifications: [
      "2+ years experience in frontend development.",
      "Strong HTML, CSS, JavaScript skills.",
      "Experience with modern frameworks like React.",
    ],
  },
  // Add more job entries as needed...
};

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = jobData[jobId as keyof typeof jobData];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Application submitted successfully!");
    // You'd typically send this to a backend or API
  };

  if (!job) {
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
          <h2 className="text-warning mb-2">{job.title}</h2>
          <p className="text-light">
            <strong>Location:</strong> {job.location} | <strong>Type:</strong>{" "}
            {job.type}
          </p>
          <p className="mb-4">{job.description}</p>

          <h5 className="text-warning">Responsibilities</h5>
          <ul>
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h5 className="mt-4 text-warning">Qualifications</h5>
          <ul>
            {job.qualifications.map((item, index) => (
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
        </div>
      </section>
    </Layout>
  );
}
