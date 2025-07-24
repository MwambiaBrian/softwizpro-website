import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

interface FAQ {
  question: string;
  answer: string;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  audience: string;
  faqs: FAQ[];
  photos: string[]; // filenames stored on backend
}

export default function ServiceDetail() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { serviceId } = useParams<{ serviceId: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/services`)
      .then((res) => {
        setServices(res.data.reverse()); // newest first
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
      });
  }, []);

  const selectedService = services.find((s) => s._id === serviceId);

  return (
    <Layout>
      <section
        className="py-5 text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="container">
          {selectedService ? (
            <>
              <div className="text-center mb-5">
                <h2 className="text-warning">{selectedService.title}</h2>
                <p className="lead">{selectedService.description}</p>
                {selectedService.photos?.[0] && (
                  <img
                    src={`${BASE_URL}/uploads/services/${selectedService.photos[0]}`}
                    alt={selectedService.title}
                    className="img-fluid rounded shadow mt-3"
                    style={{ maxHeight: "300px" }}
                  />
                )}
              </div>

              <div className="mb-5">
                <h4 className="text-warning">About This Service</h4>
                <p>{selectedService.longDescription}</p>
              </div>

              <div className="mb-5">
                <h4 className="text-warning">Key Features</h4>
                <ul className="ps-3">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="mb-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <h4 className="text-warning">Target Users</h4>
                <p>{selectedService.audience}</p>
              </div>

              {selectedService.faqs && selectedService.faqs.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-warning mb-3">
                    Frequently Asked Questions
                  </h4>
                  <div className="accordion bg-dark rounded">
                    {selectedService.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border-bottom"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === index ? null : index)
                        }
                      >
                        <div className="p-3 d-flex justify-content-between align-items-center">
                          <strong>{faq.question}</strong>
                          <span>{openFaqIndex === index ? "▲" : "▼"}</span>
                        </div>
                        {openFaqIndex === index && (
                          <div className="px-3 pb-3 text-light">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center mb-5">
                <a href="#contact" className="btn btn-warning px-4 py-2">
                  Request a Demo
                </a>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-warning">Loading service details...</h3>
            </div>
          )}

          {/* Scroll Feed of All Services */}
          <div className="mt-5 border-top pt-4">
            <h4 className="text-orange mb-4">Explore Other Services</h4>
            <div
              className="d-flex flex-row gap-4 overflow-auto"
              style={{ whiteSpace: "nowrap" }}
            >
              {services.map((service) => (
                <div
                  key={service._id}
                  className="card text-dark bg-light"
                  style={{ minWidth: "250px" }}
                >
                  {service.photos?.[0] && (
                    <img
                      src={`https://softwizpro-website-backend.onrender.com/uploads/services/${service.photos[0]}`}
                      className="card-img-top"
                      alt={service.title}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text" style={{ fontSize: "0.9rem" }}>
                      {service.description}
                    </p>
                    <a
                      href={`/services/${service._id}`}
                      className="btn btn-sm btn-outline-dark"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
