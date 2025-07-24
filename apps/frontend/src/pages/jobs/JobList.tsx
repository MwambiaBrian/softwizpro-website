import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
}

export default function JobList() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/job-posting`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

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
              <div className="col-md-6" key={job._id}>
                <div className="bg-dark p-4 rounded shadow h-100">
                  <h4 className="text-warning">{job.title}</h4>
                  <p className="mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="mb-2">
                    <strong>Type:</strong> {job.employmentType}
                  </p>
                  <p>{job.description.slice(0, 100)}...</p>

                  <Link
                    to={`/careers/${job._id}`}
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
