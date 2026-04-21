import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Navbar, Nav, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PremiumDocPortal() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const documents = [
    { id: "map", label: "Village Map", file: "/maps.pdf", icon: "bi-map", color: "#10b981" },
    { id: "new", label: "Latest Record", file: "/new.pdf", icon: "bi-file-earmark-plus", color: "#3b82f6" },
    { id: "old", label: "Legacy Archive", file: "/old.pdf", icon: "bi-archive", color: "#f59e0b" },
    { id: "csdm", label: "CSDM Verify", file: "/Csdm.pdf", icon: "bi-shield-check", color: "#8b5cf6" },
    { id: "sdm", label: "SDM Approval", file: "/SDM.pdf", icon: "bi-person-check", color: "#ec4899" },
    { id: "all", label: "Master Bundle", file: "/Adocs.pdf", icon: "bi-collection", color: "#64748b" },
  ];

  const handleAction = (doc, action) => {
    if (action === "download") {
      const link = document.createElement("a");
      link.href = doc.file;
      link.download = doc.label;
      link.click();
    } else {
      setLoading(true);
      setActiveDoc(doc);
      if (isMobile) {
        window.open(doc.file, "_blank");
        setLoading(false);
      }
      // Simulate small loading delay for UI feel
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div className="pro-portal-wrapper">
      {/* 🔷 PREMIUM NAVBAR */}
      <Navbar expand="lg" className="main-nav sticky-top">
        <Container fluid className="px-4">
          <Navbar.Brand className="fw-bold fs-4 text-white d-flex align-items-center">
            <div className="logo-icon me-2">J</div>
            <span>Jamin<span className="text-success">Portal</span></span>
          </Navbar.Brand>
          <div className="d-flex align-items-center gap-3">
             <div className="d-none d-md-block text-white-50 small pe-3 border-end border-secondary">
                Storage: 1.2 GB / 5 GB
             </div>
             <Button variant="outline-light" className="rounded-circle border-0">
                <i className="bi bi-person-circle fs-5"></i>
             </Button>
          </div>
        </Container>
      </Navbar>

      <Container fluid className="py-4 px-md-4">
        <Row className="g-4">
          {/* 📂 SIDEBAR NAVIGATION (Drive Style) */}
          <Col lg={3} xl={2} className="d-none d-lg-block">
            <div className="sidebar-card">
               <Button 
                variant="success" 
                className="w-100 mb-4 py-2 rounded-3 shadow-sm fw-bold border-0 d-flex align-items-center justify-content-center gap-2"
                onClick={() => handleAction(documents.find(d => d.id === 'all'), 'view')}
               >
                <i className="bi bi-plus-lg"></i> View All Docs
               </Button>
               
               <p className="text-uppercase small fw-bold text-muted mb-3 tracking-wider">My Records</p>
               <Nav className="flex-column gap-1">
                  {documents.map((doc) => (
                    <Nav.Link 
                        key={doc.id}
                        className={`sidebar-link ${activeDoc?.id === doc.id ? 'active' : ''}`}
                        onClick={() => handleAction(doc, 'view')}
                    >
                        <i className={`bi ${doc.icon} me-3`}></i> {doc.label}
                    </Nav.Link>
                  ))}
               </Nav>
            </div>
          </Col>

          {/* 📄 MAIN CONTENT AREA */}
          <Col lg={9} xl={10}>
            {!activeDoc ? (
              <div className="welcome-screen">
                <div className="text-center">
                   <div className="pulse-icon mb-4">
                      <i className="bi bi-cloud-check-fill text-success"></i>
                   </div>
                   <h2 className="fw-bold">Welcome to Document Vault</h2>
                   <p className="text-muted">Select a record from the grid or sidebar to view details</p>
                   
                   <Row className="mt-5 g-3">
                      {documents.slice(0, 4).map((doc) => (
                        <Col md={3} key={doc.id}>
                           <Card className="doc-grid-card h-100" onClick={() => handleAction(doc, 'view')}>
                              <Card.Body className="text-center p-4">
                                 <div className="icon-box mb-3" style={{ color: doc.color }}>
                                    <i className={`bi ${doc.icon}`}></i>
                                 </div>
                                 <h6 className="text-white mb-0">{doc.label}</h6>
                                 <small className="text-muted">PDF Document</small>
                              </Card.Body>
                           </Card>
                        </Col>
                      ))}
                   </Row>
                </div>
              </div>
            ) : (
              <Card className="viewer-card animate-in">
                <Card.Header className="bg-transparent border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center py-3">
                  <div className="d-flex align-items-center gap-3">
                    <Button variant="link" className="text-white p-0 d-lg-none" onClick={() => setActiveDoc(null)}>
                        <i className="bi bi-arrow-left"></i>
                    </Button>
                    <div className="d-flex align-items-center">
                        <i className={`bi ${activeDoc.icon} fs-4 me-2`} style={{ color: activeDoc.color }}></i>
                        <div>
                            <h6 className="mb-0 text-white">{activeDoc.label}</h6>
                            <small className="text-success">Available Online</small>
                        </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button 
                        variant="light" 
                        size="sm" 
                        className="rounded-pill px-3 fw-bold"
                        onClick={() => handleAction(activeDoc, 'download')}
                    >
                      <i className="bi bi-download me-1"></i> Download
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="rounded-circle"
                        onClick={() => setActiveDoc(null)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body className="p-0 position-relative">
                  {loading && (
                    <div className="viewer-loader">
                        <Spinner animation="border" variant="success" />
                        <span className="ms-2 text-white">Loading Document...</span>
                    </div>
                  )}
                  {!isMobile && (
                    <iframe
                      src={`${activeDoc.file}#toolbar=0`}
                      title="Viewer"
                      width="100%"
                      height="750px"
                      className="border-0 viewer-iframe"
                      onLoad={() => setLoading(false)}
                    />
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

        :root {
            --bg-deep: #0f172a;
            --bg-card: rgba(30, 41, 59, 0.7);
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        body {
            background-color: var(--bg-deep);
            font-family: 'Plus Jakarta Sans', sans-serif;
            color: #f8fafc;
        }

        .pro-portal-wrapper {
            background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent),
                        radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.1), transparent);
            min-height: 100vh;
        }

        .main-nav {
            background: rgba(15, 23, 42, 0.8) !important;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
        }

        .logo-icon {
            background: linear-gradient(45deg, #10b981, #3b82f6);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-weight: 800;
        }

        .sidebar-card {
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 24px 16px;
            backdrop-filter: blur(10px);
            position: sticky;
            top: 100px;
        }

        .sidebar-link {
            color: #94a3b8 !important;
            padding: 12px 16px !important;
            border-radius: 12px;
            transition: 0.2s ease;
            font-size: 0.95rem;
        }

        .sidebar-link:hover {
            background: rgba(255, 255, 255, 0.05);
            color: #fff !important;
        }

        .sidebar-link.active {
            background: rgba(16, 185, 129, 0.15);
            color: #10b981 !important;
            font-weight: 600;
        }

        .welcome-screen {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pulse-icon {
            font-size: 5rem;
            animation: pulse 2s infinite;
        }

        .doc-grid-card {
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            border-radius: 18px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .doc-grid-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.1);
            border-color: #10b981;
        }

        .icon-box {
            font-size: 2.5rem;
        }

        .viewer-card {
            background: var(--bg-card);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            overflow: hidden;
            backdrop-filter: blur(16px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .viewer-loader {
            position: absolute;
            inset: 0;
            background: var(--bg-deep);
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .viewer-iframe {
            background: #fff; /* Google Drive feel usually has a light bg for docs */
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
        }

        .animate-in {
            animation: slideUp 0.5s ease-out forwards;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}