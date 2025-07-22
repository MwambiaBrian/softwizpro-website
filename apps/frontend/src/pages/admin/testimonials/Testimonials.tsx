import { useEffect, useState } from "react";
import axios from "axios";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  message: string;
  company?: string;
  photoUrl?: string;
  createdAt: string;
  status?: "pending" | "approved" | "rejected";
}

export default function TestimonialsTable() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        "https://softwizpro-website-backend.onrender.com/testimonials"
      );
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      await axios.patch(
        `https://softwizpro-website-backend.onrender.com/testimonials/${id}`,
        { status: newStatus }
      );
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error(`Failed to ${newStatus} testimonial:`, err);
    }
  };

  return (
    <div className="container my-5" style={{ marginLeft: "100px" }}>
      <h3 className="text-center text-primary mb-4">Manage Testimonials</h3>
      {loading ? (
        <div className="text-center text-muted">Loading testimonials...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle bg-white shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>Photo</th>
                <th>Name & Role</th>
                <th>Message</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id}>
                  <td className="text-center">
                    {t.photoUrl ? (
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        style={{ width: 60, height: 60, borderRadius: "50%" }}
                      />
                    ) : (
                      <div className="text-muted">No Photo</div>
                    )}
                  </td>
                  <td>
                    <strong>{t.name}</strong>
                    <br />
                    <small className="text-muted">{t.role || "—"}</small>
                  </td>
                  <td>{t.message}</td>
                  <td>{t.company || "—"}</td>
                  <td className="text-center">
                    <span
                      className={`badge text-capitalize ${
                        t.status === "approved"
                          ? "bg-success"
                          : t.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {t.status || "pending"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        disabled={t.status === "approved"}
                        onClick={() => handleStatusUpdate(t._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        disabled={t.status === "rejected"}
                        onClick={() => handleStatusUpdate(t._id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
