import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useState } from "react";
//import "../../pages/css/ServiceDetails.css"; // Create this CSS file optionally

const services = {
  pos: {
    title: "Retail POS",
    description: "A powerful POS system for retail shops.",
    longDescription:
      "This is a detailed description of the Retail POS system...",
    features: [
      "Inventory Management",
      "Sales Reporting",
      "User Access Control",
    ],
    audience: "Retail shops, restaurants, supermarkets, and service providers.",
    imageUrl:
      "https://www.bing.com/th/id/OIP.Feiaak4bnTAiwT3sAL2GfQHaEy?w=244&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    faqs: [
      { question: "Is it cloud-based?", answer: "Yes, 100% cloud hosted." },
      {
        question: "Can I use it offline?",
        answer: "Yes, with limited features.",
      },
    ],
  },
  accounting: {
    title: "Accounting Software",
    description: "Easily manage your business finances and reports.",
    longDescription:
      "Full-featured accounting software for small to mid-size businesses.",
    features: ["Automated bookkeeping", "Custom invoices", "Tax calculations"],
    audience: "Startups, SMEs, and financial consultants.",
    imageUrl:
      "https://th.bing.com/th/id/R.1a78000e23f9299e41380c1c609a49c6?rik=K3snrEYKJuvAow&pid=ImgRaw&r=0",
    faqs: [
      { question: "Does it support multi-currency?", answer: "Yes, it does." },
      { question: "Is it suitable for freelancers?", answer: "Absolutely." },
    ],
  },
};

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services[serviceId as keyof typeof services];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!service) {
    return (
      <Layout>
        <div className="text-center text-white py-5">
          <h2 className="text-warning">Service Not Found</h2>
          <p>We couldn't find the service you're looking for.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className="py-5 text-white"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-warning">{service.title}</h2>
            <p className="lead">{service.description}</p>
            <img
              src={service.imageUrl}
              alt={service.title}
              className="img-fluid rounded shadow mt-3"
              style={{ maxHeight: "300px" }}
            />
          </div>

          <div className="mb-5">
            <h4 className="text-warning">About This Service</h4>
            <p>{service.longDescription}</p>
          </div>

          <div className="mb-5">
            <h4 className="text-warning">Key Features</h4>
            <ul className="ps-3">
              {service.features.map((feature, index) => (
                <li key={index} className="mb-1">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="text-warning">Target Users</h4>
            <p>{service.audience}</p>
          </div>

          {service.faqs && service.faqs.length > 0 && (
            <div className="mb-5">
              <h4 className="text-warning mb-3">Frequently Asked Questions</h4>
              <div className="accordion bg-dark rounded">
                {service.faqs.map((faq, index) => (
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
                      <span> {openFaqIndex === index ? "▲" : "▼"}</span>
                    </div>
                    {openFaqIndex === index && (
                      <div className="px-3 pb-3 text-light">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <a href="#contact" className="btn btn-warning px-4 py-2">
              Request a Demo
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
