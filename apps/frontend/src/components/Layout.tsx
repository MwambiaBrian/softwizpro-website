import { Link } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Layout.css"; // Custom styles here

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#5F9EA0" }}
      >
        <div className="container">
          <a className="navbar-brand fw-bold text-white" href="#">
            Softwizpro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[
                "home",
                "services",
                "about",
                "testimonials",
                "careers",
                "contact",
              ].map((id) => (
                <li className="nav-item" key={id}>
                  <Link
                    to={id}
                    className="nav-link text-white"
                    activeClass="active"
                    smooth={true}
                    duration={500}
                    offset={-70}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ paddingTop: "30px" }}>{children}</div>

      {/* Footer */}
      <footer
        className="text-white mt-0 pt-5"
        style={{
          backgroundColor: "#0d0d0d",
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
            url('https://www.transparenttextures.com/patterns/connected.png')
          `,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="container text-center text-md-start pb-4">
          <div className="row">
            {/* Quick Links */}
            <div className="col-md-3 mb-4">
              <h5 className="text-warning">Quick Links</h5>
              <ul className="list-unstyled">
                {[
                  "home",
                  "services",
                  "about",
                  "testimonials",
                  "careers",
                  "contact",
                ].map((id) => (
                  <li key={id}>
                    <Link
                      to={id}
                      className="text-white text-decoration-none d-block mb-1"
                      smooth={true}
                      duration={500}
                      offset={-70}
                    >
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-4 mb-4">
              <h5 className="text-warning">Contact Us</h5>
              <p>
                Email:{" "}
                <a href="mailto:info@softwizpro.com" className="text-white">
                  info@softwizpro.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+1234567890" className="text-white">
                  +1 (234) 567-890
                </a>
              </p>
              <p>Address: 123 Digital Avenue, Nairobi, Kenya</p>
            </div>

            {/* Social Media */}
            <div className="col-md-3 mb-4">
              <h5 className="text-warning">Follow Us</h5>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-md-2 mb-4">
              <h5 className="text-warning">Newsletter</h5>
              <form>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control form-control-sm bg-dark text-white border-secondary"
                    placeholder="Your email"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-warning btn-sm w-100"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="text-center py-3"
          style={{ borderTop: "1px solid #444", fontSize: "0.9rem" }}
        >
          &copy; {new Date().getFullYear()} Softwizpro LTD. All rights reserved.
        </div>
      </footer>
    </>
  );
}
