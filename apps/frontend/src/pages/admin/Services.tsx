import { useNavigate } from "react-router-dom";

const dummyServices = [
  {
    id: 1,
    title: "POS",
    description: "Custom websites for businesses.",
  },
  {
    id: 2,
    title: "Web Design",
    description: "Improve search engine ranking.",
  },
  {
    id: 3,
    title: "Accounting Software",
    description: "Reliable and scalable hosting.",
  },
];

const ServiceList = () => {
  const navigate = useNavigate();

  const handleDelete = (id: any) => {
    // Simulate delete action
    if (window.confirm("Are you sure you want to delete this service?")) {
      console.log(`Deleting service with ID: ${id}`);
      // You would call your API here
    }
  };

  return (
    <div className="container py-5">
      <h2
        className="mb-4 text-orange fw-bold"
        style={{
          color: "orange",
        }}
      >
        Services Offered Management
      </h2>

      <button
        onClick={() => navigate("/admin/services/create")}
        className="btn btn-success mb-3"
        style={{
          backgroundColor: "cadetblue",
        }}
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
              {dummyServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/services/edit/${service.id}`)
                      }
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {dummyServices.length === 0 && (
                <tr>
                  <td className="text-center py-3">No services available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
