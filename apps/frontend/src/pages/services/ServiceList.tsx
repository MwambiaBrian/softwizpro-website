import Layout from "../../components/Layout";

const allServices = [
  {
    title: "Point of Sale (POS) Systems",
    img: "https://www.bing.com/th/id/OIP.Feiaak4bnTAiwT3sAL2GfQHaEy?w=244&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    desc: "Seamlessly manage sales, inventory, and transactions in retail environments.",
    link: "/services/pos",
  },
  {
    title: "Property Management System",
    img: "https://bukitvista-wordpress-storage.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/01/PMS-illustration.jpg",
    desc: "Digitally control rent, maintenance, and tenant data with ease and flexibility.",
    link: "/services/property-management",
  },
  {
    title: "Accounting Software",
    img: "https://th.bing.com/th/id/R.1a78000e23f9299e41380c1c609a49c6?rik=K3snrEYKJuvAow&pid=ImgRaw&r=0",
    desc: "Track finances, automate invoicing, and generate insightful reports effortlessly.",
    link: "/services/accounting",
  },
  {
    title: "HR & Payroll System",
    img: "https://gctlinfosys.com/wp-content/uploads/2023/12/HR-and-Payroll-Software-fb.jpg",
    desc: "Manage employee data, payroll, leave, and benefits all in one secure system.",
    link: "/services/hr-payroll",
  },
  {
    title: "School Management System",
    img: "https://th.bing.com/th/id/R.c905a15b2149cd03ef8f000fcf4223b6?rik=PAaYu3zCOIinqg&pid=ImgRaw&r=0",
    desc: "Digitize admissions, grading, attendance, and communication between schools and parents.",
    link: "/services/school-management",
  },
  {
    title: "ERP Solutions",
    img: "https://th.bing.com/th/id/R.f3dfecaca53d5506520acb70768fc73e?rik=3G%2fL%2b3KBtKqUrw&pid=ImgRaw&r=0",
    desc: "Unify your business functions with an end-to-end enterprise resource planning system.",
    link: "/services/erp",
  },
  {
    title: "Hospital Management System",
    img: "https://tse4.mm.bing.net/th/id/OIP.mrJF2IgTxVI0h1aG74V8WAHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    desc: "Enhance patient care with digital appointment booking, EMR, and billing management.",
    link: "/services/hospital-management",
  },
];

export default function ServiceList() {
  return (
    <Layout>
      <section
        className="py-5 text-white"
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
          url('https://www.transparenttextures.com/patterns/cubes.png')
        `,
          backgroundColor: "cadetblue",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: "orange" }}>
            All Our Services
          </h2>
          <div className="row gy-4">
            {allServices.map((service, index) => (
              <div className="col-md-4" key={index}>
                <div className="card-hover bg-dark text-white p-3 h-100 rounded shadow">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="img-fluid mb-3 rounded shadow"
                  />
                  <h5>{service.title}</h5>
                  <p>{service.desc}</p>
                  <a
                    href={service.link}
                    className="btn btn-outline-warning btn-sm mt-2"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
