import { Home, Building2, BarChart3, MapPin, Shield, Truck, TrendingUp, User, ChevronDown, ChevronRight, X, BriefcaseBusiness } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroImage from "@/components/Images/site-selection-hero.png";
import newmarkLogo from "@/components/Icons/newmark-workframe.svg";
import mailIcon from "@/components/Icons/mail.svg";
import mapPinnedIcon from "@/components/Icons/map-pinned.svg";
import textSearchIcon from "@/components/Icons/text-search.svg";
import shieldHalfIcon from "@/components/Icons/shield-half.svg";
import carFrontIcon from "@/components/Icons/car-front.svg";
import chartNoAxesIcon from "@/components/Icons/chart-no-axes-combined.svg";
import handshakeIcon from "@/components/Icons/handshake.svg";
import userSearchIcon from "@/components/Icons/user-search.svg";
import chartColumnIcon from "@/components/Icons/chart-column.svg";
import filePenLineIcon from "@/components/Icons/file-pen-line.svg";
import building2IconSvg from "@/components/Icons/building-2.svg";
import crucialLogoIcon from "@/components/Icons/Crucial AI Logo.svg";
import avatarsIcon from "@/components/Icons/Avatars.svg";
import avatars2Icon from "@/components/Icons/Avatars (2).svg";

const SiteSelectionDashboard = () => {
  // form state
  const [clientName, setClientName] = useState("");
  const turnaroundOptions = ["3 days", "1 week", "2 weeks", "1 month"];
  // Deal stage options and state
  const dealStageOptions = ["Lead", "Qualified", "Proposal Sent", "Negotiation", "Closed Won", "Closed Lost"];
  const [dealStage, setDealStage] = useState<string>("");
  const [turnaround, setTurnaround] = useState<string>(turnaroundOptions[0]);
  const requiredDataOptions = [
    "Labor",
    "Energy",
    "Transit",
    "Occupancy",
    "Zoning & Regulatory",
    "Cost",
    "Environmental",
    "Other (leave a note)",
  ];
  const [requiredData, setRequiredData] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [showMobileForm, setShowMobileForm] = useState(false);

  // Refs to sidebar and main content for matching heights
  const sidebarRef = useRef<HTMLDivElement>(null);
  // Ref for right sidebar to adjust its height to match main content
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  // Ref to main content to track height changes responsively
  const mainContentRef = useRef<HTMLDivElement>(null);
   
  // Use ResizeObserver plus resize & scroll to sync sidebar height to content height
  useEffect(() => {
    const updateSidebarHeight = () => {
      // Adjust left collapsed sidebar height
      if (sidebarRef.current && mainContentRef.current) {
        const sidebarTop = sidebarRef.current.getBoundingClientRect().top + window.scrollY;
        const contentBottom = mainContentRef.current.getBoundingClientRect().bottom + window.scrollY;
        const newHeight = contentBottom - sidebarTop;
        sidebarRef.current.style.height = `${newHeight}px`;
      }

      // Adjust right sidebar height so it always reaches the bottom of the page
      if (rightSidebarRef.current && mainContentRef.current) {
        const sidebarTop = rightSidebarRef.current.getBoundingClientRect().top + window.scrollY;
        const contentBottom = mainContentRef.current.getBoundingClientRect().bottom + window.scrollY;
        const newHeight = contentBottom - sidebarTop;
        // Only grow if content is taller than viewport; otherwise, fallback to min height
        if (newHeight > 0) {
          rightSidebarRef.current.style.minHeight = `${newHeight}px`;
        }
      }
    };

    updateSidebarHeight();

    // Observe main content size changes
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && mainContentRef.current) {
      resizeObserver = new ResizeObserver(() => updateSidebarHeight());
      resizeObserver.observe(mainContentRef.current);
    }

    // Listen to window events that may affect height
    window.addEventListener("resize", updateSidebarHeight);
    window.addEventListener("scroll", updateSidebarHeight);

    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
      window.removeEventListener("scroll", updateSidebarHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  // Close modal automatically if sidebar becomes visible (≥768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && showMobileForm) {
        setShowMobileForm(false);
      }
    };

    // Run once on mount to ensure consistency
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMobileForm]);

  // lock body scroll when modal is open
  useEffect(() => {
    if (showMobileForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileForm]);

  // Custom dropdown for Deal Stage
  const [dealStageOpen, setDealStageOpen] = useState(false);

  const toggleDealStageOpen = () => setDealStageOpen((prev) => !prev);

  const handleSelectDealStage = (value: string) => {
    setDealStage(value);
    setDealStageOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".deal-stage-container")) {
        setDealStageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compose mailto link and open default mail client
  const handleRequestReport = () => {
    const body = encodeURIComponent(
      `Client Name: ${clientName}\nDeal Stage: ${dealStage}\nTurnaround Time: ${turnaround}\nRequired Data: ${requiredData.join(", ")}\nNotes: ${notes}`
    );
    const mailto = `mailto:?subject=Site%20Selection%20Report&body=${body}`;
    window.location.href = mailto;
  };

  const toggleRequired = (option: string) => {
    setRequiredData((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  // Turnaround Time Toggle Group layout
  // icon color is constant now; no dynamic color needed
  return (
    <div>
      <style>{`
        /* Prevent any accidental horizontal overflow */
        html, body {
          overflow-x: hidden;
        }
        .service-card {
          padding: 48px;
          background: hsl(var(--brand-white));
          outline: 1px hsl(var(--brand-light-gray)) solid;
          outline-offset: -1px;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 24px;
          display: inline-flex;
          height: 280px; /* Fixed height for consistency */
          overflow: hidden; /* Prevent text spillover */
          min-width: 0; /* Prevent flex shrink issues */
        }
        
        .service-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: 0;
          width: 100%;
        }
        
        .service-card-title {
          flex-shrink: 0;
          font-size: 20px;
          min-font-size: 18px; /* Ensure minimum readable size */
          font-weight: 600;
          line-height: 1.2;
          word-wrap: break-word;
          hyphens: auto;
        }
        
        .service-card-description {
          flex: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          line-height: 1.6;
          font-size: 14px;
          min-font-size: 12px; /* Ensure minimum readable size */
          word-wrap: break-word;
          hyphens: auto;
        }
        
        /* Card icons - ensure they never shrink below readable size */
        .service-card img {
          flex-shrink: 0;
          min-width: 48px;
          min-height: 48px;
          width: 48px;
          height: 48px;
        }
        
        .cards-container {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: -250px; /* default desktop overlap */
        }
        
        .main-content {
          position: relative;
        }
        
        .right-sidebar {
          position: sticky;
          top: 56px; /* sticks below header */
          right: 0;
          min-height: calc(100vh - 56px);
          width: 459px;
          background: white;
          border-left: 1px hsl(var(--color-surface-100)) solid;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .mobile-request-btn {
          display: none;
        }
        
        .desktop-request-btn {
          display: none;
        }
        
        /* Desktop: 3x2 layout (3 cards per row, 2 rows) */
        @media (min-width: 1400px) {
          .service-card {
            flex: 0 0 calc((100% - 48px) / 3); /* Exact width: (container - 2*24px gaps) / 3 cards */
            max-width: calc((100% - 48px) / 3);
            min-width: 0;
          }
          .main-content {
            padding: 32px;
            margin-right: 0;
          }
          .cards-container {
            padding: 0 32px; /* 32px from sidebars */
            margin-left: -32px; /* Offset to align with image start */
            margin-right: -32px; /* Offset to align with image end */
            gap: 24px; /* Fixed gap between cards */
            justify-content: space-between; /* Distribute cards evenly */
          }
          .mobile-request-btn {
            display: none !important;
          }
          .desktop-request-btn {
            display: none !important;
          }
          .right-sidebar {
            display: flex !important;
          }
        }
        
        /* Large Tablet: 2x3 layout (2 cards per row, 3 rows) */
        @media (min-width: 900px) and (max-width: 1399px) {
          .service-card {
            flex: 0 0 calc((100% - 24px) / 2); /* Exact width: (container - 1*24px gap) / 2 cards */
            max-width: calc((100% - 24px) / 2);
            min-width: 0;
          }
          .main-content {
            padding: 32px;
            margin-right: 0;
          }
          .cards-container {
            padding: 0 32px; /* 32px from sidebars */
            margin-left: -32px; /* Offset to align with image start */
            margin-right: -32px; /* Offset to align with image end */
            margin-top: -200px;
            gap: 24px; /* Fixed gap between cards */
            justify-content: space-between; /* Distribute cards evenly */
          }
          .right-sidebar {
            display: flex !important;
          }
          .mobile-request-btn {
            display: none !important;
          }
          .desktop-request-btn {
            display: none !important;
          }
          .service-card-title {
            font-size: 18px !important;
            min-font-size: 16px !important;
          }
          .service-card-description {
            font-size: 13px !important;
            min-font-size: 12px !important;
          }
          .service-card img {
            min-width: 44px !important;
            min-height: 44px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
        
        /* Tablet: 2x3 layout but sidebar hidden */
        @media (min-width: 768px) and (max-width: 899px) {
          .service-card {
            flex: 0 0 calc((100% - 24px) / 2); /* Exact width: (container - 1*24px gap) / 2 cards */
            max-width: calc((100% - 24px) / 2);
            min-width: 0;
          }
          .main-content {
            padding: 32px;
            margin-right: 0;
          }
          .cards-container {
            padding: 0 32px; /* 32px from edges */
            margin-left: -32px; /* Offset to align with image start */
            margin-right: -32px; /* Offset to align with image end */
            margin-top: -200px;
            gap: 24px; /* Fixed gap between cards */
            justify-content: space-between; /* Distribute cards evenly */
          }
          .right-sidebar {
            display: none !important;
          }
          .mobile-request-btn {
            display: block !important;
          }
          .desktop-request-btn {
            display: none !important;
          }
          .service-card-title {
            font-size: 18px !important;
            min-font-size: 16px !important;
          }
          .service-card-description {
            font-size: 13px !important;
            min-font-size: 12px !important;
          }
          .service-card img {
            min-width: 44px !important;
            min-height: 44px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
        
        /* Mobile: 1x6 layout (1 card per column, 6 rows) */
        @media (max-width: 767px) {
          .service-card {
            flex: 1 1 100%;
            max-width: 100%;
            padding: 32px; /* Reduce padding on mobile but keep generous */
            height: auto; /* Allow height to adjust on mobile */
            min-height: 240px; /* Ensure minimum height */
          }
          .service-card-title {
            font-size: 18px !important;
            min-font-size: 16px !important;
          }
          .service-card-description {
            font-size: 14px !important;
            min-font-size: 12px !important;
            -webkit-line-clamp: 3; /* Slightly fewer lines on mobile */
          }
          .service-card img {
            min-width: 40px !important;
            min-height: 40px !important;
            width: 40px !important;
            height: 40px !important;
          }
          .right-sidebar {
            display: none !important;
          }
          .mobile-request-btn {
            display: block !important;
          }
          .desktop-request-btn {
            display: none !important;
          }
          .main-content {
            padding: 32px 16px;
            margin-right: 0 !important;
          }
          .cards-container {
            width: 100% !important;
            margin-top: -120px !important;
            padding: 0 32px; /* 32px from edges */
            margin-left: -16px; /* Adjust for mobile padding */
            margin-right: -16px;
          }
          .hero-image {
            width: 100% !important;
            height: auto !important;
            margin-right: 0 !important;
          }
          .title-section {
            width: 100% !important;
          }
          .main-layout {
            padding: 16px 0 16px 16px !important;
          }
        }
        
        .mobile-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        
        .mobile-modal-content {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          z-index: 10;
        }
        
        .modal-close:hover {
          background: hsl(var(--color-surface-100));
        }

        /* Hover effect for sidebar items */
        [data-collapsed="True"] div[data-type="Item"]:hover {
          background: hsl(var(--menu-item-focus-background));
        }
        [data-collapsed="True"] div[data-type="Item"]:hover svg {
          color: hsl(var(--menu-item-focus-color));
        }
        /* Hover effects for form elements */
        .desktop-request-btn:hover,
        .right-sidebar button[type="button"]:hover,
        .modal-submit-btn:hover {
          filter: brightness(1.05);
        }

        /* Removed hover styles for turnaround buttons and required-data rows */
      `}</style>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "hsl(var(--color-surface-50))",
          overflow: "visible", /* allow content to define height */
          justifyContent: "flex-start",
          alignItems: "stretch", /* let flex items fill full height */
          display: "flex",
        }}
      >
      {/* Collapsed Sidebar */}
        <div
          ref={sidebarRef}
          data-collapsed="True"
          style={{
            height: "auto", /* will be set dynamically */
            minHeight: "100vh", /* at least full viewport */
            padding: "8px",
            background: "hsl(var(--color-primary-contrast))",
            borderRight: "1px hsl(var(--content-border-color)) solid",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
        <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
          {/* Logo */}
          <div data-collapsed="True" style={{ padding: "8px", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "inline-flex" }}>
              <img src={newmarkLogo} style={{ width: "24px", height: "24px" }} alt="Newmark Logo" />
          </div>

          {/* First Menu Section */}
          <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", gap: "4px", display: "flex" }}>
            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Section Heading" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "inline-flex" }}></div>
            
            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Hover" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", background: "hsl(var(--menu-item-focus-background))", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <BriefcaseBusiness size={20} style={{ color: "hsl(var(--menu-item-focus-color))" }} />
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={handshakeIcon} style={{ width: "20px", height: "20px" }} alt="Handshake" />
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={userSearchIcon} style={{ width: "20px", height: "20px" }} alt="User Search" />
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={chartColumnIcon} style={{ width: "20px", height: "20px" }} alt="Chart Column" />
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={filePenLineIcon} style={{ width: "20px", height: "20px" }} alt="File Pen" />
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={building2IconSvg} style={{ width: "20px", height: "20px" }} alt="Building" />
              </div>
            </div>
          </div>

          {/* Second Menu Section - Company Icons */}
          <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", gap: "4px", display: "flex" }}>
            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Section Heading" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "inline-flex" }}></div>
            
            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <div style={{ width: "20px", height: "20px", background: "hsl(var(--purple-600))", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                  <img src={crucialLogoIcon} style={{ width: "14px", height: "14px", objectFit: "contain" }} alt="Crucial AI" />
                </div>
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={avatarsIcon} style={{ width: "20px", height: "20px", borderRadius: "6px" }} alt="Avatars" />
              </div>
            </div>

            <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
              <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                <img src={avatars2Icon} style={{ width: "20px", height: "20px", borderRadius: "6px" }} alt="Avatars2" />
              </div>
            </div>
          </div>
        </div>

        {/* User Avatar at Bottom */}
        <div data-show-label="false" data-show-right-icon="false" data-state="Idle" style={{ width: "40px", height: "44px", padding: "8px", borderRadius: "6px", justifyContent: "space-between", alignItems: "center", display: "inline-flex" }}>
          <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "hsl(var(--color-surface-200))" }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: "1 1 0", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
        <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "20px", display: "flex" }}>
          {/* Header with Breadcrumb */}
            <div style={{ alignSelf: "stretch", paddingLeft: "24px", paddingRight: "32px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--color-surface-0))", borderBottom: "1px hsl(var(--content-border-color)) solid", justifyContent: "space-between", alignItems: "center", gap: "10px", display: "inline-flex" }}>
            <div data-segment-1="true" data-segment-2="false" data-segment-3="false" data-segment-4="false" data-segment-5="false" style={{ flex: "1 1 0", padding: "12px", background: "hsl(var(--breadcrumb-background))", borderRadius: "6px", justifyContent: "flex-start", alignItems: "center", gap: "7px", display: "flex" }}>
              <div data-focus="False" data-hover="False" data-type="Icon" style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "10px", display: "flex" }}>
                <Home size={14} style={{ color: "hsl(var(--breadcrumb-item-icon-color))" }} />
              </div>
                <ChevronRight size={14} style={{ color: "hsl(var(--breadcrumb-separator-color))" }} />
              <div data-focus="False" data-hover="False" data-type="Label" style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "10px", display: "flex" }}>
                <div style={{ color: "hsl(var(--breadcrumb-item-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "14px", wordWrap: "break-word" }}>Site Selection</div>
              </div>
            </div>
            <button
              className="mobile-request-btn"
              onClick={() => setShowMobileForm(true)}
              style={{
                padding: "8px 16px",
                background: "hsl(var(--color-primary-color))",
                borderRadius: "6px",
                outline: "1px hsl(var(--button-primary-border-color)) solid",
                outlineOffset: "-1px",
                border: "none",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ color: "hsl(var(--button-primary-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px" }}>Request report</div>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
          {/* Left Content Area */}
            <div className="main-content" ref={mainContentRef} style={{ flex: "1 1 0", alignSelf: "stretch", padding: "32px", position: "relative", justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "flex", flexDirection: "column" }}>
            {/* Title and Description */}
              <div className="title-section" style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "24px", display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ color: "hsl(var(--color-surface-900))", fontSize: "30px", fontFamily: "Inter", fontWeight: "600", lineHeight: "36px" }}>Site selection & location strategy reports</div>
                  <div style={{ color: "hsl(var(--color-surface-500))", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px" }}>Tailored insights to drive critical location decisions for your clients.</div>
                </div>
            </div>

            {/* Hero Image */}
            <img 
                className="hero-image"
              style={{ 
                  width: "100%", 
                height: "553px", 
                  objectFit: "cover",
              }} 
              src={heroImage} 
              alt="Site Selection Dashboard"
            />

            {/* Service Cards Container */}
              <div className="cards-container" style={{ width: "100%", marginTop: "-250px" }}>
              {/* Labor Analytics Card */}
                <div className="service-card">
                  <div className="service-card-content">
                    <div className="service-card-title" style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                  <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                        <BriefcaseBusiness size={32} style={{ color: "hsl(var(--brand-white))" }} />
                  </div>
                  <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Labor Analytics</div>
                </div>
                    <div className="service-card-description" style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Empower site selection with workforce data to optimize access to talent and reduce talent-related risk.</div>
                  </div>
              </div>

              {/* Market Trends Card */}
                <div className="service-card">
                  <div className="service-card-content">
                    <div className="service-card-title" style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                  <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                        <img src={mapPinnedIcon} style={{ width: "32px", height: "32px" }} alt="Map Pinned" />
                  </div>
                  <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Market Trends</div>
                </div>
                    <div className="service-card-description" style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Deliver timely market intelligence for strategic portfolio decisions and competitive leasing advantages.</div>
                  </div>
              </div>

              {/* GIS Data Analysis Card */}
                <div className="service-card">
                  <div className="service-card-content">
                    <div className="service-card-title" style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                  <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                        <img src={textSearchIcon} style={{ width: "32px", height: "32px" }} alt="Text Search" />
                  </div>
                  <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>GIS Data Analysis</div>
                </div>
                    <div className="service-card-description" style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Visualize location intelligence to identify optimal sites and assess spatial impacts on portfolio growth.</div>
                  </div>
              </div>

              {/* Risk Mitigation Card */}
                <div className="service-card">
                  <div className="service-card-content">
                    <div className="service-card-title" style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                  <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                        <img src={shieldHalfIcon} style={{ width: "32px", height: "32px" }} alt="Shield Half" />
                  </div>
                  <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Risk Mitigation</div>
                </div>
                    <div className="service-card-description" style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Uncover risks in occupancy, regulation, and market shifts to safeguard your property portfolio decisions.</div>
                  </div>
              </div>

              {/* Transportation & Emergency Planning Card */}
                <div className="service-card">
                  <div className="service-card-content">
                    <div className="service-card-title" style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                  <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                        <img src={carFrontIcon} style={{ width: "32px", height: "32px" }} alt="Car Front" />
                  </div>
                  <div style={{ flex: "1 1 0", color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Transportation & Emergency Planning</div>
                </div>
                    <div className="service-card-description" style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Analyze transit and emergency access to ensure business continuity and site accessibility.</div>
                  </div>
              </div>

              {/* Competitive Analysis Card */}
                <div className="service-card">
                  <div className="service-card-content">
                    <div className="service-card-title" style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                  <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                        <img src={chartNoAxesIcon} style={{ width: "32px", height: "32px" }} alt="Chart No Axes" />
                  </div>
                  <div style={{ flex: "1 1 0", color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Competitive Analysis</div>
                </div>
                    <div className="service-card-description" style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Benchmark nearby assets and leasing activity to inform strategies and differentiate your property's value.</div>
                  </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Form */}
            <div className="right-sidebar" ref={rightSidebarRef}>
            {/* Bottom Button */}
              <div style={{ width: "100%", paddingLeft: "24px", paddingRight: "24px", paddingTop: "16px", paddingBottom: "16px", left: "0", bottom: "0", position: "absolute", background: "white", borderTop: "1px #DFE1E6 solid", justifyContent: "flex-end", alignItems: "center", gap: "16px", display: "inline-flex" }}>
                <button type="button" onClick={handleRequestReport} style={{ flex: "1 1 0", paddingLeft: "16px", paddingRight: "16px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--color-primary-color))", borderRadius: "6px", outline: "1px hsl(var(--button-primary-border-color)) solid", outlineOffset: "-1px", justifyContent: "center", alignItems: "center", gap: "8px", display: "flex", border: "none", cursor: "pointer" }}>
                  <img src={mailIcon} style={{ width: "14px", height: "14px" }} alt="Mail" />
                <div style={{ color: "hsl(var(--button-primary-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Request client report</div>
                </button>
            </div>

            {/* Form Content */}
            <div style={{ alignSelf: "stretch", flex: 1, padding: "24px", paddingBottom: "96px", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: "24px", display: "flex" }}>
              <div style={{ alignSelf: "stretch", flex: "1 1 0", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "flex" }}>
                <div style={{ color: "hsl(var(--color-surface-900))", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Get a custom report for your client</div>
                <div style={{ alignSelf: "stretch" }}>
                  <span style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "700", lineHeight: "22px", wordWrap: "break-word" }}>*</span>
                  <span style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "22px", wordWrap: "break-word" }}> Fields with an asterisk are </span>
                  <span style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "700", lineHeight: "22px", wordWrap: "break-word" }}>required</span>
                </div>

                {/* Client Name Input */}
                <div style={{ alignSelf: "stretch", height: "64px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Client Name *</div>
                    <div style={{ alignSelf: "stretch", paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--inputtext-background))", boxShadow: "0px 1px 2px rgba(18, 18, 23, 0.05)", borderRadius: "6px", outline: "1px hsl(var(--inputtext-border-color)) solid", outlineOffset: "-1px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Building2 size={16} style={{ color: "hsl(var(--iconfield-icon-color))" }} />
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter company"
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: "hsl(var(--color-surface-900))",
                          fontFamily: "Inter",
                          fontSize: "14px",
                        }}
                      />
                  </div>
                </div>

                {/* Deal Stage Input */}
                <div style={{ alignSelf: "stretch", height: "64px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Deal Stage *</div>
                    <div style={{ alignSelf: "stretch", paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--inputtext-background))", boxShadow: "0px 1px 2px rgba(18, 18, 23, 0.05)", borderRadius: "6px", outline: "1px hsl(var(--inputtext-border-color)) solid", outlineOffset: "-1px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <BarChart3 size={16} style={{ color: "hsl(var(--iconfield-icon-color))" }} />
                    <div className="deal-stage-container" style={{ position: "relative", flex: 1 }}>
                      <div
                        onClick={toggleDealStageOpen}
                        style={{
                          cursor: "pointer",
                          userSelect: "none",
                          color: dealStage ? "hsl(var(--color-surface-900))" : "hsl(var(--inputtext-placeholder-color))",
                          fontFamily: "Inter",
                          fontSize: "14px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          height: "22px",
                        }}
                      >
                        {dealStage || "Select deal stage"}
                      </div>

                      {dealStageOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: 0,
                            right: "-24px",
                            background: "hsl(var(--brand-white))",
                            outline: "1px hsl(var(--brand-light-gray)) solid",
                            borderRadius: "6px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                            zIndex: 100,
                          }}
                        >
                          {dealStageOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => handleSelectDealStage(opt)}
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                fontFamily: "Inter",
                                fontSize: "14px",
                                color: "hsl(var(--color-surface-900))",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--menu-item-focus-background))")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronDown size={16} style={{ color: "hsl(var(--iconfield-icon-color))" }} />
                  </div>
                </div>

                {/* Turnaround Time Toggle Group */}
                <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Turnaround Time *</div>
                    <div style={{ alignSelf: "stretch", background: "hsl(var(--color-surface-100))", borderRadius: "6px", display: "flex" }}>
                      {turnaroundOptions.map((opt, idx) => {
                          const isSelected = opt === turnaround;
                          const outerRadius: any = {};
                          if (idx === 0) {
                           outerRadius.borderTopLeftRadius = "6px";
                           outerRadius.borderBottomLeftRadius = "6px";
                          }
                          if (idx === turnaroundOptions.length - 1) {
                           outerRadius.borderTopRightRadius = "6px";
                           outerRadius.borderBottomRightRadius = "6px";
                          }
                          return (
                            <div key={opt} style={{ flex: 1, padding: "2px", background: isSelected ? "hsl(var(--togglebutton-checked-background))" : "transparent", transition: "background 0.3s ease", ...outerRadius, borderLeft: "1px hsl(var(--color-surface-300)) solid", borderTop: "1px hsl(var(--color-surface-300)) solid", borderBottom: "1px hsl(var(--color-surface-300)) solid", borderRight: idx === turnaroundOptions.length - 1 ? "1px hsl(var(--color-surface-300)) solid" : "none" }}>
                              <button
                                type="button"
                                className="turnaround-toggle-btn"
                                onClick={() => setTurnaround(opt)}
                                style={{
                                  width: "100%",
                                  padding: "6px 10px",
                                  background: isSelected ? "hsl(var(--togglebutton-content-checked-background))" : "transparent",
                                  boxShadow: isSelected ? "0px 1px 2px rgba(18,18,23,0.05)" : "none",
                                  borderRadius: "4px",
                                  border: "none",
                                  cursor: "pointer",
                                  color: isSelected ? "hsl(var(--color-primary-color))" : "hsl(var(--togglebutton-color))",
                                  fontFamily: "Inter",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  transition: "background 0.3s ease, color 0.3s ease",
                                }}
                              >
                                {opt}
                              </button>
                      </div>
                          );
                        })}
                  </div>
                </div>

                {/* Required Data Checkboxes */}
                <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Required Data</div>
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
                    <div style={{ flex: "1 1 0", paddingTop: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "inline-flex" }}>
                        {requiredDataOptions.slice(0,4).map((opt)=>(
                          <div key={opt} className="checkbox-row" style={{ display:"flex", alignItems:"center", gap:"7px", transition:"background 0.2s ease" }}>
                            <input type="checkbox" checked={requiredData.includes(opt)} onChange={()=>toggleRequired(opt)} style={{ width:"17.5px", height:"17.5px" }} />
                            <div style={{ color:"hsl(var(--text-color))", fontSize:"14px", fontFamily:"Inter", lineHeight:"22px" }}>{opt}</div>
                      </div>
                        ))}
                    </div>
                    <div style={{ flex: "1 1 0", paddingTop: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "inline-flex" }}>
                        {requiredDataOptions.slice(4).map((opt)=>(
                          <div key={opt} className="checkbox-row" style={{ display:"flex", alignItems:"center", gap:"7px", transition:"background 0.2s ease" }}>
                            <input type="checkbox" checked={requiredData.includes(opt)} onChange={()=>toggleRequired(opt)} style={{ width:"17.5px", height:"17.5px" }} />
                            <div style={{ color:"hsl(var(--text-color))", fontSize:"14px", fontFamily:"Inter", lineHeight:"22px" }}>{opt}</div>
                      </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Notes Textarea */}
                <div style={{ alignSelf: "stretch", flex: "1 1 0", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Notes</div>
                    <div style={{ alignSelf: "stretch", paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--inputtext-background))", boxShadow: "0px 1px 2px rgba(18, 18, 23, 0.05)", borderRadius: "6px", outline: "1px hsl(var(--inputtext-border-color)) solid", outlineOffset: "-1px", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter notes..."
                        style={{
                          flex: 1,
                          width: "100%",
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          fontFamily: "Inter",
                          fontSize: "14px",
                          color: "hsl(var(--color-surface-900))",
                          resize: "vertical",
                          minHeight: "100px",
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Modal Form */}
      {showMobileForm && (
        <div className="mobile-modal" onClick={() => setShowMobileForm(false)}>
          <div className="mobile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowMobileForm(false)}
            >
              <X size={20} style={{ color: "hsl(var(--color-surface-600))" }} />
            </button>
            
            <div style={{ padding: "24px", paddingTop: "48px" }}>
              <div style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "flex" }}>
                <div style={{ color: "hsl(var(--color-surface-900))", fontSize: "20px", fontFamily: "Inter", fontWeight: "600", lineHeight: "28px", wordWrap: "break-word" }}>Get a custom report for your client</div>
                <div>
                  <span style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "700", lineHeight: "22px", wordWrap: "break-word" }}>*</span>
                  <span style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "22px", wordWrap: "break-word" }}> Fields with an asterisk are </span>
                  <span style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "700", lineHeight: "22px", wordWrap: "break-word" }}>required</span>
                </div>

                {/* Client Name Input */}
                <div style={{ width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Client Name *</div>
                  <div style={{ width: "100%", paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--inputtext-background))", boxShadow: "0px 1px 2px rgba(18, 18, 23, 0.05)", borderRadius: "6px", outline: "1px hsl(var(--inputtext-border-color)) solid", outlineOffset: "-1px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Building2 size={16} style={{ color: "hsl(var(--iconfield-icon-color))" }} />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter company"
                      style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: "hsl(var(--color-surface-900))",
                        fontFamily: "Inter",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                </div>

                {/* Deal Stage Input */}
                <div style={{ width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Deal Stage *</div>
                  <div style={{ width: "100%", paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--inputtext-background))", boxShadow: "0px 1px 2px rgba(18, 18, 23, 0.05)", borderRadius: "6px", outline: "1px hsl(var(--inputtext-border-color)) solid", outlineOffset: "-1px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <BarChart3 size={16} style={{ color: "hsl(var(--iconfield-icon-color))" }} />
                    <div className="deal-stage-container" style={{ position: "relative", flex: 1 }}>
                      <div
                        onClick={toggleDealStageOpen}
                        style={{
                          cursor: "pointer",
                          userSelect: "none",
                          color: dealStage ? "hsl(var(--color-surface-900))" : "hsl(var(--inputtext-placeholder-color))",
                          fontFamily: "Inter",
                          fontSize: "14px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          height: "22px",
                        }}
                      >
                        {dealStage || "Select deal stage"}
                      </div>

                      {dealStageOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "calc(100% + 4px)",
                            left: 0,
                            right: "-24px",
                            background: "hsl(var(--brand-white))",
                            outline: "1px hsl(var(--brand-light-gray)) solid",
                            borderRadius: "6px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                            zIndex: 100,
                          }}
                        >
                          {dealStageOptions.map((opt) => (
                            <div
                              key={opt}
                              onClick={() => handleSelectDealStage(opt)}
                              style={{
                                padding: "8px 12px",
                                cursor: "pointer",
                                fontFamily: "Inter",
                                fontSize: "14px",
                                color: "hsl(var(--color-surface-900))",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--menu-item-focus-background))")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <ChevronDown size={16} style={{ color: "hsl(var(--iconfield-icon-color))" }} />
                  </div>
                </div>

                {/* Turnaround Time Toggle Group */}
                <div style={{ width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Turnaround Time *</div>
                  <div style={{ width: "100%", background: "hsl(var(--color-surface-100))", borderRadius: "6px", display: "flex" }}>
                    {turnaroundOptions.map((opt, idx) => {
                        const isSelected = opt === turnaround;
                        const outerRadius: any = {};
                        if (idx === 0) {
                         outerRadius.borderTopLeftRadius = "6px";
                         outerRadius.borderBottomLeftRadius = "6px";
                        }
                        if (idx === turnaroundOptions.length - 1) {
                         outerRadius.borderTopRightRadius = "6px";
                         outerRadius.borderBottomRightRadius = "6px";
                        }
                        return (
                          <div key={opt} style={{ flex: 1, padding: "2px", background: isSelected ? "hsl(var(--togglebutton-checked-background))" : "transparent", transition: "background 0.3s ease", ...outerRadius, borderLeft: "1px hsl(var(--color-surface-300)) solid", borderTop: "1px hsl(var(--color-surface-300)) solid", borderBottom: "1px hsl(var(--color-surface-300)) solid", borderRight: idx === turnaroundOptions.length - 1 ? "1px hsl(var(--color-surface-300)) solid" : "none" }}>
                            <button
                              type="button"
                              className="turnaround-toggle-btn"
                              onClick={() => setTurnaround(opt)}
                              style={{
                                width: "100%",
                                padding: "6px 10px",
                                background: isSelected ? "hsl(var(--togglebutton-content-checked-background))" : "transparent",
                                boxShadow: isSelected ? "0px 1px 2px rgba(18,18,23,0.05)" : "none",
                                borderRadius: "4px",
                                border: "none",
                                cursor: "pointer",
                                color: isSelected ? "hsl(var(--color-primary-color))" : "hsl(var(--togglebutton-color))",
                                fontFamily: "Inter",
                                fontWeight: 600,
                                fontSize: "14px",
                                transition: "background 0.3s ease, color 0.3s ease",
                              }}
                            >
                              {opt}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                {/* Required Data Checkboxes */}
                <div style={{ width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Required Data</div>
                  <div style={{ width: "100%", justifyContent: "flex-start", alignItems: "flex-start", display: "flex", gap: "16px" }}>
                    <div style={{ flex: "1 1 0", paddingTop: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                      {requiredDataOptions.slice(0,4).map((opt)=>(
                        <div key={opt} className="checkbox-row" style={{ display:"flex", alignItems:"center", gap:"7px", transition:"background 0.2s ease" }}>
                          <input type="checkbox" checked={requiredData.includes(opt)} onChange={()=>toggleRequired(opt)} style={{ width:"17.5px", height:"17.5px" }} />
                          <div style={{ color:"hsl(var(--text-color))", fontSize:"14px", fontFamily:"Inter", lineHeight:"22px" }}>{opt}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: "1 1 0", paddingTop: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "flex" }}>
                      {requiredDataOptions.slice(4).map((opt)=>(
                        <div key={opt} className="checkbox-row" style={{ display:"flex", alignItems:"center", gap:"7px", transition:"background 0.2s ease" }}>
                          <input type="checkbox" checked={requiredData.includes(opt)} onChange={()=>toggleRequired(opt)} style={{ width:"17.5px", height:"17.5px" }} />
                          <div style={{ color:"hsl(var(--text-color))", fontSize:"14px", fontFamily:"Inter", lineHeight:"22px" }}>{opt}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes Textarea */}
                <div style={{ width: "100%", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "4px", display: "flex" }}>
                  <div style={{ color: "hsl(var(--text-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Notes</div>
                  <div style={{ width: "100%", paddingLeft: "12px", paddingRight: "12px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--inputtext-background))", boxShadow: "0px 1px 2px rgba(18, 18, 23, 0.05)", borderRadius: "6px", outline: "1px hsl(var(--inputtext-border-color)) solid", outlineOffset: "-1px", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Enter notes..."
                      style={{
                        flex: 1,
                        width: "100%",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        color: "hsl(var(--color-surface-900))",
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="button" 
                  className="modal-submit-btn"
                  onClick={() => {
                    handleRequestReport();
                    setShowMobileForm(false);
                  }}
                  style={{ 
                    width: "100%", 
                    paddingLeft: "16px", 
                    paddingRight: "16px", 
                    paddingTop: "12px", 
                    paddingBottom: "12px", 
                    background: "hsl(var(--color-primary-color))", 
                    borderRadius: "6px", 
                    border: "none", 
                    cursor: "pointer", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    gap: "8px", 
                    display: "flex", 
                    marginTop: "16px" 
                  }}
                >
                  <img src={mailIcon} style={{ width: "14px", height: "14px" }} alt="Mail" />
                  <div style={{ color: "hsl(var(--button-primary-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px" }}>Request client report</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteSelectionDashboard;