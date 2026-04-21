

import { Row, Col, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Row className="vh-100">

      {/* Sidebar */}
      <Col md={2} className="bg-white shadow-sm p-4">
        <h4 className="mb-4 fw-bold">Admin Dashboard</h4>

        <Nav className="flex-column">

          <NavLink to="/admin" end className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/admin/rduser" className="nav-link">
            RD Users
          </NavLink>

          <NavLink to="/admin/user" className="nav-link">
            User
          </NavLink>

          <NavLink to="/admin/passbook" className="nav-link">
            Passbook
          </NavLink>

          <NavLink to="/admin/history" className="nav-link">
            History
          </NavLink>

          <NavLink to="/" className="nav-link">
            Logout
          </NavLink>

        </Nav>
      </Col>

      {/* Right Content */}
      <Col md={10} className="p-4">
        <Outlet />
      </Col>

    </Row>
  );
}