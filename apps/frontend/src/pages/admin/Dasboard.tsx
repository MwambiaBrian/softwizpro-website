import { Link } from "react-router-dom";
import {
  FaTools,
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

export default function AdminHome() {
  return (
    <div className="mt-4">
      <h3 className="text-orange mb-3">Welcome, Admin</h3>
      <p className="text-muted mb-4">
        Manage content, services, and careers from this panel.
      </p>

      <div className="row">
        {/* Services */}
        <div className="col-md-6 col-lg-3 mb-4">
          <Link to="/admin/services" className="text-decoration-none">
            <div className="card text-white bg-primary h-100 shadow">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <FaTools size={40} className="mb-3" />
                <h5 className="card-title">Services</h5>
                <p className="card-text">
                  Add, update, or remove service offerings.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Careers */}
        <div className="col-md-6 col-lg-3 mb-4">
          <Link to="/admin/careers" className="text-decoration-none">
            <div className="card text-white bg-success h-100 shadow">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <FaBriefcase size={40} className="mb-3" />
                <h5 className="card-title">Careers</h5>
                <p className="card-text">
                  Manage job postings and applications.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Users */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-info h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <FaUsers size={40} className="mb-3" />
              <h5 className="card-title">Users</h5>
              <p className="card-text">View and manage user accounts.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="col-md-6 col-lg-3 mb-4">
          <Link to="/admin/testimonials" className="text-decoration-none">
            <div className="card text-white bg-secondary h-100 shadow">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <FaComments size={40} className="mb-3" />
                <h5 className="card-title">Testimonials</h5>
                <p className="card-text">Approve or delete testimonials.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Analytics */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-warning h-100 shadow">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <FaChartLine size={40} className="mb-3" />
              <h5 className="card-title">Analytics</h5>
              <p className="card-text">View reports and activity summaries.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
