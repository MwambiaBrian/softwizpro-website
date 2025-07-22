import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTools,
  FaBriefcase,
  FaComments,
  FaArrowLeft,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import "./css/Admin.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-dashboard d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#5F9EA0" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Toggle Sidebar Button */}
            <button
              className="btn btn-outline-light me-3 d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
            <a className="navbar-brand fw-bold text-white" href="#">
              Softwizpro
            </a>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <button
              className="btn text-white dropdown-toggle d-flex align-items-center"
              type="button"
              id="adminDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle size={24} className="me-2" />
              Admin
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="adminDropdown"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Layout Body */}
      <div
        className="d-flex flex-grow-1 pt-5"
        style={{}} // height of fixed navbar
      >
        {/* Sidebar */}
        <aside
          className={`admin-sidebar p-3 text-white bg-dark position-fixed h-100 d-lg-block ${
            sidebarOpen ? "d-block" : "d-none"
          }`}
          style={{
            width: "150px",
            marginRight: "200px",
            zIndex: 1030,
            top: "",
            left: 0,
            overflowY: "auto",
          }}
        >
          <h4 className="mb-4 text-orange">Admin Panel</h4>
          <nav className="nav flex-column">
            <NavLink
              to="/admin/dashboard"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/services"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaTools className="me-2" />
              Services
            </NavLink>
            <NavLink
              to="/admin/careers"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaBriefcase className="me-2" />
              Careers
            </NavLink>
            <NavLink
              to="/admin/testimonials"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaComments className="me-2" />
              Testimonials
            </NavLink>
            <NavLink
              to="/"
              className="nav-link mt-4 text-orange d-flex align-items-center"
            >
              <FaArrowLeft className="me-2" />
              Back to Site
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className="flex-grow-1 bg-light p-4"
          style={{
            marginLeft: "20px",
            marginTop: "56px",

            width: "100%",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
