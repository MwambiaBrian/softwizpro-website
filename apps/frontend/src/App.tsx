// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import ServiceDetail from "./pages/services/ServiceDetails";

import AdminServices from "./pages/admin/Services";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/Dasboard";
import JobDetail from "./pages/jobs/JobDetail";
import JobList from "./pages/jobs/JobList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // includes Popper
import ServiceList from "./pages/services/ServiceList";
import AddServiceForm from "./pages/admin/services/AddServiceForm";
import AdminJobList from "./pages/admin/jobs/JobList";
import ApplicationsList from "./pages/admin/applications/ApplicationList";
import JobCreate from "./pages/admin/jobs/JobCreate";
import { UserProvider } from "./contexts/UserContext";
import TestimonialsTable from "./pages/admin/testimonials/Testimonials";
import EditServiceForm from "./pages/admin/services/EditServiceForm";

export default function App() {
  return (
    <main className="">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/create" element={<AddServiceForm />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/careers" element={<JobList />} />
            <Route path="/careers/:jobId" element={<JobDetail />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="services/edit/:id" element={<EditServiceForm />} />
              <Route path="services/create" element={<AddServiceForm />} />
              <Route path="careers" element={<AdminJobList />} />
              <Route path="testimonials" element={<TestimonialsTable />} />
              <Route path="jobs/create" element={<JobCreate />} />
              <Route
                path="jobs/:jobId/applications"
                element={<ApplicationsList />}
              />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </main>
  );
}
