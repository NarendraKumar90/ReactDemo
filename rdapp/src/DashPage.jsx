import { Row, Col, Nav, Button } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { 
  Grid1x2Fill, 
  PeopleFill, 
  PersonPlusFill, 
  JournalText, 
  ClockHistory, 
  BoxArrowLeft,
  CircleFill,
  ShieldLockFill
} from "react-bootstrap-icons";

export default function DashPage() {
  const location = useLocation();

  // Ultra Pro Sidebar Styling
  const sidebarStyle = {
    background: "#ffffff",
    borderRight: "1px solid #eef2f6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1.5rem 1rem",
    zIndex: 1000
  };

  const navItemStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "8px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    fontWeight: isActive ? "700" : "500",
    color: isActive ? "#4361ee" : "#64748b",
    background: isActive ? "rgba(67, 97, 238, 0.08)" : "transparent",
  });

  return (
    <Row className="g-0 vh-100" style={{ backgroundColor: "#f8fafc" }}>
      
      {/* --- PRO SIDEBAR --- */}
      <Col md={2} className="vh-100 shadow-sm" style={sidebarStyle}>
        <div>
          {/* Logo Section */}
          <div className="d-flex align-items-center gap-2 mb-5 px-3">
            <div className="bg-primary rounded-3 p-2 d-flex align-items-center justify-content-center shadow-primary">
              <ShieldLockFill color="white" size={20} />
            </div>
            <h5 className="mb-0 fw-black text-dark" style={{ letterSpacing: "-0.5px" }}>
              RD<span className="text-primary">ADMIN</span>
            </h5>
          </div>

          {/* Navigation Links */}
          <Nav className="flex-column">
            <NavLink to="/admin" end style={({ isActive }) => navItemStyle(isActive)}>
              <Grid1x2Fill size={18} /> Dashboard
            </NavLink>

            <NavLink to="/admin/rdusers" style={({ isActive }) => navItemStyle(isActive)}>
              <PeopleFill size={18} /> RD Users
            </NavLink>

            <NavLink to="/admin/rduser" style={({ isActive }) => navItemStyle(isActive)}>
              <PersonPlusFill size={18} /> Register User
            </NavLink>

            <NavLink to="/admin/passbook" style={({ isActive }) => navItemStyle(isActive)}>
              <JournalText size={18} /> Passbook
            </NavLink>

            <NavLink to="/admin/history" style={({ isActive }) => navItemStyle(isActive)}>
              <ClockHistory size={18} /> History
            </NavLink>
          </Nav>
        </div>

        {/* --- BOTTOM SECTION (PROFILE & LOGOUT) --- */}
        <div>
          <div className="p-3 mb-3 rounded-4 bg-light border d-flex align-items-center gap-3">
            <div className="position-relative">
               <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "40px", height: "40px" }}>
                  N
               </div>
               <CircleFill className="position-absolute bottom-0 end-0 text-success border border-white border-2" size={10} />
            </div>
            <div className="overflow-hidden">
               <p className="mb-0 fw-bold text-dark text-truncate" style={{ fontSize: "0.9rem" }}>Narendra</p>
               <p className="mb-0 text-muted small text-truncate">Super Admin</p>
            </div>
          </div>

          <NavLink to="/" style={{ ...navItemStyle(false), color: "#ef4444", background: "rgba(239, 68, 68, 0.05)" }}>
            <BoxArrowLeft size={18} /> Logout
          </NavLink>
        </div>
      </Col>

      {/* --- MAIN CONTENT AREA --- */}
      <Col md={10} className="vh-100 overflow-auto p-0">
        {/* Top Header Bar for Mobile/Desktop context */}
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center sticky-top">
            <h6 className="mb-0 fw-bold text-muted">
                Section: <span className="text-dark">{location.pathname.split("/").pop().toUpperCase() || "OVERVIEW"}</span>
            </h6>
            <div className="d-flex gap-3">
                <Button variant="light" size="sm" className="rounded-circle border"><ClockHistory size={14}/></Button>
                <div className="vr"></div>
                <span className="small text-muted fw-medium d-flex align-items-center">Server: <span className="text-success ms-1">Active</span></span>
            </div>
        </header>

        <main className="p-4" style={{ minHeight: "calc(100vh - 65px)" }}>
           <div className="fade-in-content">
              <Outlet />
           </div>
        </main>
      </Col>

      {/* GLOBAL DASHBOARD CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .fw-black { font-weight: 800; }
        
        .shadow-primary {
          box-shadow: 0 8px 16px -4px rgba(67, 97, 238, 0.3) !important;
        }

        .nav-link:hover {
          background: rgba(67, 97, 238, 0.05) !important;
          color: #4361ee !important;
          transform: translateX(5px);
        }

        .fade-in-content {
          animation: fadeIn 0.4s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Customize Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </Row>
  );
}