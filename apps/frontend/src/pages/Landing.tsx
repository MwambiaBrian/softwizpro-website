import { Cursor, useTypewriter } from "react-simple-typewriter";
import Layout from "../components/Layout";
import "./css/LandingPage.css";

export default function LandingPage() {
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
  const testimonials = [
    {
      name: "Jane Doe",
      role: "CEO of StartupX",
      text: "Softwizpro transformed our workflow and built a platform we love!",
    },
    {
      name: "John Smith",
      role: "CTO of FinTechNow",
      text: "Their team was incredibly professional and fast. Highly recommend.",
    },
    {
      name: "Grace A.",
      role: "COO, AgroLink",
      text: "Their POS and accounting integration saved us hours each week.",
    },
  ];
  return (
    <Layout>
      {/* Hero Section */}
      <section
        id="home"
        className="hero-section text-white d-flex align-items-center px-3 px-md-5"
        style={{ backgroundColor: "#1c1c1c", minHeight: "100vh" }}
      >
        <div className="overlay"></div>
        <div className="container position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-5 mb-3 text-warning">
                {text}
                <Cursor cursorColor="orange" />
              </h1>
              <p className="lead text-light">
                We build world-class software for businesses.
              </p>
              <a href="#contact" className="btn btn-orange mt-3">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-5 px-3 px-md-5 text-white"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
      url('https://www.transparenttextures.com/patterns/cubes.png')
    `,
          backgroundColor: "cadetblue",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="container text-center">
          <h2 className="mb-5" style={{ color: "orange" }}>
            Our Services
          </h2>
          <div className="row gy-4">
            {[
              {
                title: "Point of Sale (POS) Systems",
                img: "https://www.bing.com/th/id/OIP.Feiaak4bnTAiwT3sAL2GfQHaEy?w=244&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
                desc: "Seamlessly manage sales, inventory, and transactions in retail environments.",
                link: "/services/pos",
              },
              {
                title: "Property Management System",
                img: "https://bukitvista-wordpress-storage.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/01/PMS-illustration.jpg",
                desc: "Digitally control rent, maintenance, and tenant data with ease and flexibility.",
                link: "/services/property-management",
              },
              {
                title: "Accounting Software",
                img: "https://th.bing.com/th/id/R.1a78000e23f9299e41380c1c609a49c6?rik=K3snrEYKJuvAow&pid=ImgRaw&r=0",
                desc: "Track finances, automate invoicing, and generate insightful reports effortlessly.",
                link: "/services/accounting",
              },
            ].map((service, index) => (
              <div className="col-md-4" key={index}>
                <div className="card-hover bg-dark text-white p-3 h-100 rounded shadow">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="img-fluid mb-3 rounded shadow"
                  />
                  <h5>{service.title}</h5>
                  <p>{service.desc}</p>
                  <a
                    href={service.link}
                    className="btn btn-outline-warning btn-sm mt-2"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="/services" className="btn btn-warning">
              Show More Services
            </a>
          </div>
        </div>
      </section>

      {/* Careers / Job Postings Section */}
      <section
        id="careers"
        className="py-5 text-white"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
      url('https://www.transparenttextures.com/patterns/cubes.png')
    `,
          backgroundColor: "cadetblue",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "orange" }}>
            Careers
          </h2>
          <div className="row gy-4">
            {[
              {
                title: "Frontend Developer",
                location: "Remote / Nairobi HQ",
                summary: "React | TypeScript | TailwindCSS",
                description:
                  "We’re looking for a Frontend Developer to build stunning UIs. You should have experience with React, component-based architecture, and responsive design best practices.",
                applyLink:
                  "mailto:careers@softwizpro.com?subject=Frontend Developer Application",
              },
              {
                title: "Backend Engineer",
                location: "Nairobi / Hybrid",
                summary: "Node.js | Express | PostgreSQL",
                description:
                  "Join our backend team to create robust APIs and scalable systems. Bonus if you’re familiar with Docker, GraphQL, or microservices architecture.",
                applyLink:
                  "mailto:careers@softwizpro.com?subject=Backend Engineer Application",
              },
              {
                title: "UI/UX Designer",
                location: "Remote",
                summary: "Figma | Prototyping | User Research",
                description:
                  "As a UI/UX designer, you’ll collaborate closely with developers and product managers to design intuitive interfaces that drive user engagement.",
                applyLink:
                  "mailto:careers@softwizpro.com?subject=UIUX Designer Application",
              },
            ].map((job, index) => (
              <div className="col-md-4" key={index}>
                <div className="bg-dark border border-secondary rounded p-4 h-100 d-flex flex-column shadow-sm">
                  <h5 className="text-warning">{job.title}</h5>
                  <p className="mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="mb-2 text-muted small">{job.summary}</p>
                  <details className="mb-3 text-white small">
                    <summary className="text-warning cursor-pointer">
                      See More
                    </summary>
                    <p className="mt-2">{job.description}</p>
                  </details>
                  <a
                    href={job.applyLink}
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

      {/* About Section */}
      <section
        id="about"
        className="py-5 text-white"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
      url('https://www.transparenttextures.com/patterns/cubes.png')
    `,
          backgroundColor: "cadetblue",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: "orange" }}>
            About Us
          </h2>
          <p
            className="text-center lead"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            At Softwizpro LTD, we are a dynamic team of developers, designers,
            and problem solvers. Our mission is to craft innovative digital
            solutions that empower businesses to thrive in the digital era. With
            a strong foundation in software engineering and user experience, we
            transform complex challenges into scalable, elegant systems.
          </p>
        </div>
      </section>
      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-5 text-white"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
      url('https://www.transparenttextures.com/patterns/connected.png')
    `,
          backgroundColor: "#0d0d0d",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
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
                  <p className="mb-4 fst-italic">"{t.text}"</p>
                  <footer className="blockquote-footer text-light">
                    {t.name}, <cite title="Source Title">{t.role}</cite>
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
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="mt-5 text-center">
          <h4 className="text-warning mb-3">Submit Your Testimonial</h4>
          <button
            type="button"
            className="btn btn-outline-warning"
            data-bs-toggle="modal"
            data-bs-target="#testimonialModal"
          >
            Open Form
          </button>
        </div>
        <div
          className="modal fade"
          id="testimonialModal"
          aria-labelledby="testimonialModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-warning">
              <div className="modal-header border-bottom border-warning">
                <h5
                  className="modal-title text-warning"
                  id="testimonialModalLabel"
                >
                  Submit Your Testimonial
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form
                className="modal-body"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your feedback!");
                }}
              >
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Role or Company"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Your Testimonial..."
                    required
                  ></textarea>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                  >
                    Submit
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
