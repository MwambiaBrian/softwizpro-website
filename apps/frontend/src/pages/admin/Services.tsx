import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceList = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services");
        setServices(response.data);
      } catch (err) {
        setError("Failed to load services.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:3000/services/${id}`);
        setServices((prev) => prev.filter((service) => service._id !== id));
      } catch (err) {
        alert("Failed to delete service.");
        console.error(err);
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold" style={{ color: "orange" }}>
        Services Offered Management
      </h2>

      <button
        onClick={() => navigate("/admin/services/create")}
        className="btn btn-success mb-3"
        style={{ backgroundColor: "cadetblue" }}
      >
        <i className="bi bi-plus-circle me-1"></i> Add New Service
      </button>

      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <i className="bi bi-list-task me-2"></i> Current Services Offered
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-3">
                    No services available.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.title}</td>
                    <td>{service.description}</td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/services/edit/${service._id}`)
                        }
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
