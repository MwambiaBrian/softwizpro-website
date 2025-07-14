import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

// Sample job data
const jobs = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-Time",
    summary: "We’re looking for a frontend developer with React experience.",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    summary: "Join us to build scalable backend systems using Node.js.",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    summary: "Design intuitive user interfaces and smooth user journeys.",
  },
];

export default function JobList() {
  return (
    <Layout>
      <section
        className="py-5 text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="container">
          <h2 className="text-warning text-center mb-5">Current Openings</h2>

          <div className="row g-4">
            {jobs.map((job) => (
              <div className="col-md-6" key={job.id}>
                <div className="bg-dark p-4 rounded shadow h-100">
                  <h4 className="text-warning">{job.title}</h4>
                  <p className="mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="mb-2">
                    <strong>Type:</strong> {job.type}
                  </p>
                  <p>{job.summary}</p>

                  <Link
                    to={`/careers/${job.id}`}
                    className="btn btn-outline-warning btn-sm"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
