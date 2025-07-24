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
    <div className="container-fluid mt-4 px-4" style={{ marginLeft: "85px" }}>
      <h3 className="text-orange mb-3">Welcome, Admin</h3>
      <p className="text-muted mb-4">
        Manage content, services, and careers from this panel.
      </p>

      <div className="row">
        {/* Services */}
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/admin/services" className="text-decoration-none">
            <div className="card text-white bg-primary h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
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
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/admin/careers" className="text-decoration-none">
            <div className="card text-white bg-success h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
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
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/admin/users" className="text-decoration-none">
            <div className="card text-white bg-info h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                <FaUsers size={40} className="mb-3" />
                <h5 className="card-title">Users</h5>
                <p className="card-text">View and manage user accounts.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <Link to="/admin/testimonials" className="text-decoration-none">
            <div className="card text-white bg-secondary h-100 shadow-sm">
              <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
                <FaComments size={40} className="mb-3" />
                <h5 className="card-title">Testimonials</h5>
                <p className="card-text">Approve or delete testimonials.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Analytics */}
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className="card text-white bg-warning h-100 shadow-sm">
            <div className="card-body text-center d-flex flex-column align-items-center justify-content-center">
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
