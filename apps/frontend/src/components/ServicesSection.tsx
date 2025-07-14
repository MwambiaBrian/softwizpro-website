// src/components/ServicesSection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

type Service = {
  _id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/services").then((res) => {
      setServices(res.data);
    });
  }, []);

  return (
    <section className="container my-5" id="services">
      <h2 className="text-center mb-4">Our Services</h2>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="card h-100">
              <img
                src={service.imageUrl}
                className="card-img-top"
                alt={service.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.shortDescription}</p>
                <Link
                  to={`/services/${service._id}`}
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
