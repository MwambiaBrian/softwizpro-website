import { Cursor, useTypewriter } from "react-simple-typewriter";
import Layout from "../components/Layout";
import { Modal } from "bootstrap";
import "./css/LandingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    bootstrap: any;
  }
}
// types/testimonial.ts

export interface Testimonial {
  name: string;
  role?: string;
  message: string;
  company?: string;
  photoUrl?: string;
}

export interface JobPosting {
  _id?: string;
  title: string;
  location: string;
  employmentType: string; // e.g., "Full-Time", "Part-Time"
  description: string;
  responsibilities: string[];
  qualifications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Service {
  title: string;
  shortDescription: string;
  longDescription?: string;
  features?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  photos: string[];
  createdAt?: string; // added by timestamps
  updatedAt?: string; // added by timestamps
  _id?: string; // MongoDB document ID
}

export default function LandingPage() {
  const isLoggedIn = !!localStorage.getItem("token");
  const [services, setServices] = useState<Service[]>([]);
  const [careers, setCareers] = useState<JobPosting[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Testimonial>({
    name: "",
    role: "",
    message: "",
    company: "",
    photoUrl: "",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/services`).then((res) => setServices(res.data));
    axios.get(`${BASE_URL}/job-posting`).then((res) => setCareers(res.data));
    axios
      .get(`${BASE_URL}/testimonials`)
      .then((res) => setTestimonials(res.data));
  }, []);
  console.log(services);
  console.log(careers);
  const [text] = useTypewriter({
    words: [
      "Welcome to Softwizpro LTD",
      "Innovating Digital Solutions",
      "Empowering Businesses",
      "Building Smart Software",
    ],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/testimonials`, form);
      const modalEl = document.getElementById("testimonialModal");
      if (modalEl) {
        const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
        modal.hide();
      }
      alert("Testimonial submitted!");
      console.log(res.data);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit testimonial.");
    }
  };
  // const testimonials = [
  //   {
  //     name: "Jane Doe",
  //     role: "CEO of StartupX",
  //     text: "Softwizpro transformed our workflow and built a platform we love!",
  //   },
  //   {
  //     name: "John Smith",
  //     role: "CTO of FinTechNow",
  //     text: "Their team was incredibly professional and fast. Highly recommend.",
  //   },
  //   {
  //     name: "Grace A.",
  //     role: "COO, AgroLink",
  //     text: "Their POS and accounting integration saved us hours each week.",
  //   },
  // ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        id="home"
        className="hero-section text-white d-flex align-items-center px-3 px-md-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), #009688),
            url('https://info.wealthcounsel.com/hs-fs/hubfs/Blog_Header.png?width=8400&name=Blog_Header.png')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className="container text-center position-relative">
          <h1 className="display-5 mb-3 text-warning">
            {text}
            <Cursor cursorColor="orange" />
          </h1>
          <p className="lead text-light">
            We build world-class software for businesses.
          </p>
          <a
            href={isLoggedIn ? "#services" : "#signup-cta"}
            className="btn btn-orange mt-3"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-5 px-3 px-md-5 text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), #009688),
            url('https://info.wealthcounsel.com/hs-fs/hubfs/Blog_Header.png?width=8400&name=Blog_Header.png')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <h2 className="mb-5" style={{ color: "orange" }}>
            Our Services
          </h2>
          <div className="row gy-4">
            {services.map((service, index) => (
              <div className="col-md-4" key={index}>
                <div className="card-hover bg-dark text-white p-3 h-100 rounded shadow">
                  <img
                    src={`https://softwizpro-website-backend.onrender.com/uploads/services/${service.photos[0]}`}
                    alt={service.title}
                    className="img-fluid mb-3 rounded shadow"
                  />
                  <h5>{service.title}</h5>
                  <p>{service.shortDescription}</p>
                  <a
                    href={`/services/${service._id}`}
                    className="btn btn-outline-warning btn-sm mt-2"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section
        id="careers"
        className="py-5 text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), #009688),
            url('https://info.wealthcounsel.com/hs-fs/hubfs/Blog_Header.png?width=8400&name=Blog_Header.png')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "orange" }}>
            Careers
          </h2>
          <div className="row gy-4">
            {careers.map((job, index) => (
              <div className="col-md-4" key={index}>
                <div className="bg-dark border border-secondary rounded p-4 h-100 d-flex flex-column shadow-sm">
                  <h5 className="text-warning">{job.title}</h5>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="text-muted small">{job.description}</p>
                  <details className="text-white small mb-3">
                    <summary className="text-warning">See More</summary>
                    <p>{job.description}</p>
                  </details>
                  <a
                    href={`/careers/${job._id}`}
                    className="btn btn-outline-warning mt-auto"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup CTA */}
      {!isLoggedIn && (
        <section
          id="signup-cta"
          className="position-relative text-white py-4"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 150, 136, 0.8)),
              url('https://info.wealthcounsel.com/hs-fs/hubfs/Blog_Header.png?width=8400&name=Blog_Header.png')
            `,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container text-center">
            <div
              className="mx-auto p-4 p-md-5 rounded shadow-lg"
              style={{
                maxWidth: "680px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid #ffc107",
              }}
            >
              <h2 className="text-warning mb-3">Join the Softwizpro Network</h2>
              <p>
                Create an account to unlock tools and opportunities tailored for
                individuals and businesses.
              </p>
              <a href="/register" className="btn btn-warning btn-lg mt-2 px-4">
                Create an Account
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section
        id="about"
        className="py-5 text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), #009688),
            url('https://info.wealthcounsel.com/hs-fs/hubfs/Blog_Header.png?width=8400&name=Blog_Header.png')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container py-5">
          <h2 className="text-center mb-4" style={{ color: "orange" }}>
            About Us
          </h2>
          <p
            className="text-center lead"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            At Softwizpro LTD, we are a dynamic team of developers, designers...
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-5 text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5), #009688),
            url('https://info.wealthcounsel.com/hs-fs/hubfs/Blog_Header.png?width=8400&name=Blog_Header.png')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          id="testimonialCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <blockquote className="blockquote text-center text-white px-4">
                  <p className="mb-4 fst-italic">"{t.message}"</p>
                  <footer className="blockquote-footer text-light">
                    {t.name}, <cite>{t.role}</cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </div>

        {/* Testimonial Modal Trigger */}
        <div className="mt-5 text-center">
          <h4 className="text-warning mb-3">Submit Your Testimonial</h4>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => {
              if (isLoggedIn) {
                const modalEl = document.getElementById("testimonialModal");
                if (modalEl) new Modal(modalEl).show();
              } else {
                window.location.href = "/login";
              }
            }}
          >
            Open Form
          </button>
        </div>

        {/* Modal */}
        <div className="modal fade" id="testimonialModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-warning">
              <div className="modal-header border-bottom border-warning">
                <h5 className="modal-title text-warning">
                  Submit Your Testimonial
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="p-4 rounded shadow"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ccc",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <h4 className="mb-3 text-center" style={{ color: "cadetblue" }}>
                  Submit a Testimonial
                </h4>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    value={form.name}
                    onChange={handleChange}
                    style={{ borderColor: "cadetblue" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    className="form-control"
                    value={form.role}
                    onChange={handleChange}
                    style={{ borderColor: "cadetblue" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={form.company}
                    onChange={handleChange}
                    style={{ borderColor: "cadetblue" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    required
                    value={form.message}
                    onChange={handleChange}
                    style={{ borderColor: "cadetblue" }}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: "black" }}>
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoUrl"
                    className="form-control"
                    value={form.photoUrl}
                    onChange={handleChange}
                    style={{ borderColor: "cadetblue" }}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "orange",
                      color: "black",
                      border: "none",
                    }}
                  >
                    Submit Testimonial
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
