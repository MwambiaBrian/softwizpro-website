import { NavLink, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTools,
  FaBriefcase,
  FaComments,
  FaArrowLeft,
  FaUserCircle,
} from "react-icons/fa";
import "./css/Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-dashboard d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: "#5F9EA0" }}
      >
        <div className="container d-flex justify-content-between">
          <a className="navbar-brand fw-bold text-white" href="#">
            Softwizpro
          </a>

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
        className="d-flex flex-grow-1 overflow-hidden pt-5"
        style={{ marginTop: "0px" }}
      >
        {/* Sidebar */}
        <aside
          className="admin-sidebar p-3 text-white"
          style={{ marginTop: "0" }}
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

        {/* Main content */}
        <main className="flex-grow-1 bg-light p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
