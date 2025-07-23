import { Home, Building2, BarChart3, MapPin, Shield, Truck, TrendingUp, User, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import heroImage from "@/components/Images/site-selection-hero.png";
import newmarkLogo from "@/components/Icons/newmark-workframe.svg";
import mailIcon from "@/components/Icons/mail.svg";
import briefcaseIcon from "@/components/Icons/briefcase-business.svg";
import mapPinnedIcon from "@/components/Icons/map-pinned.svg";
import textSearchIcon from "@/components/Icons/text-search.svg";
import shieldHalfIcon from "@/components/Icons/shield-half.svg";
import carFrontIcon from "@/components/Icons/car-front.svg";
import chartNoAxesIcon from "@/components/Icons/chart-no-axes-combined.svg";

const SiteSelectionDashboard = () => {
  // form state
  const [clientName, setClientName] = useState("");
  const turnaroundOptions = ["3 days", "1 week", "2 weeks", "1 month"];
  const dealStageOptions = ["Prospecting", "Negotiation", "Contract", "Closed Won", "Closed Lost"];
  const [dealStage, setDealStage] = useState<string>(dealStageOptions[0]);
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
  return (
    <div>
      <style>{`
        .service-card {
          align-self: stretch;
          min-width: 280px;
          padding: 48px;
          background: hsl(var(--brand-white));
          outline: 1px hsl(var(--brand-light-gray)) solid;
          outline-offset: -1px;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 24px;
          display: inline-flex;
        }
        
        /* Desktop: 3 cards per row */
        @media (min-width: 1024px) {
          .service-card {
            flex: 1 1 calc(33.333% - 16px);
            max-width: calc(33.333% - 16px);
          }
        }
        
        /* Tablet: 2 cards per row */
        @media (min-width: 768px) and (max-width: 1023px) {
          .service-card {
            width: calc(50% - 12px);
            flex: 1 1 auto;
          }
        }
        
        /* Mobile: 1 card per row */
        @media (max-width: 767px) {
          .service-card {
            width: 100%;
          }
        }
      `}</style>
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          background: "hsl(var(--color-surface-50))",
          overflow: "hidden",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
        }}
      >
        {/* Collapsed Sidebar */}
        <div
          data-collapsed="True"
          style={{
            height: "100vh",
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
                  <Home size={20} style={{ color: "hsl(var(--menu-item-focus-color))" }} />
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <Building2 size={20} style={{ color: "hsl(var(--menu-item-color))" }} />
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <BarChart3 size={20} style={{ color: "hsl(var(--menu-item-color))" }} />
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <MapPin size={20} style={{ color: "hsl(var(--menu-item-color))" }} />
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <Shield size={20} style={{ color: "hsl(var(--menu-item-color))" }} />
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <TrendingUp size={20} style={{ color: "hsl(var(--menu-item-color))" }} />
                </div>
              </div>
            </div>

            {/* Second Menu Section - Company Icons */}
            <div style={{ alignSelf: "stretch", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end", gap: "4px", display: "flex" }}>
              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Section Heading" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "inline-flex" }}></div>
              
              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <div data-company="Crucial" style={{ width: "20px", height: "20px", position: "relative", background: "hsl(var(--purple-600))", overflow: "hidden", borderRadius: "6px" }}>
                    <div style={{ width: "14px", height: "14px", left: "3px", top: "3px", position: "absolute", overflow: "hidden" }}>
                      <div style={{ width: "66.73px", height: "14px", left: "0px", top: "0px", position: "absolute", background: "white" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <div data-company="Arrow" style={{ width: "20px", height: "20px", position: "relative", background: "hsl(var(--teal-600))", overflow: "hidden", borderRadius: "6px" }}>
                    <div style={{ width: "12.12px", height: "10.50px", left: "3.94px", top: "4px", position: "absolute", background: "hsl(var(--color-surface-0))" }}></div>
                  </div>
                </div>
              </div>

              <div data-collaped="False" data-show-label="false" data-show-left-icon="true" data-show-right-icon="false" data-state="Default" data-type="Item" style={{ alignSelf: "stretch", padding: "8px", borderRadius: "6px", justifyContent: "center", alignItems: "center", gap: "8px", display: "inline-flex" }}>
                <div style={{ flex: "1 1 0", justifyContent: "flex-start", alignItems: "center", gap: "8px", display: "flex" }}>
                  <div data-company="Northstar" style={{ width: "20px", height: "20px", position: "relative", background: "hsl(var(--indigo-500))", overflow: "hidden", borderRadius: "6px" }}>
                    <div style={{ width: "12px", height: "12px", left: "3.93px", top: "3.93px", position: "absolute", background: "white" }}></div>
                  </div>
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
            <div style={{ alignSelf: "stretch", paddingLeft: "24px", paddingRight: "24px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--color-surface-0))", borderBottom: "1px hsl(var(--content-border-color)) solid", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "inline-flex" }}>
              <div data-segment-1="true" data-segment-2="false" data-segment-3="false" data-segment-4="false" data-segment-5="false" style={{ flex: "1 1 0", padding: "12px", background: "hsl(var(--breadcrumb-background))", borderRadius: "6px", justifyContent: "flex-start", alignItems: "center", gap: "7px", display: "flex" }}>
                <div data-focus="False" data-hover="False" data-type="Icon" style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "10px", display: "flex" }}>
                  <Home size={14} style={{ color: "hsl(var(--breadcrumb-item-icon-color))" }} />
                </div>
                <ChevronRight size={14} style={{ color: "hsl(var(--breadcrumb-separator-color))" }} />
                <div data-focus="False" data-hover="False" data-type="Label" style={{ justifyContent: "flex-start", alignItems: "flex-start", gap: "10px", display: "flex" }}>
                  <div style={{ color: "hsl(var(--breadcrumb-item-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "400", lineHeight: "14px", wordWrap: "break-word" }}>Site Selection</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
            {/* Left Content Area */}
            <div style={{ flex: "1 1 0", alignSelf: "stretch", padding: "32px 0 32px 32px", position: "relative", justifyContent: "flex-start", alignItems: "flex-start", gap: "24px", display: "flex", flexWrap: "wrap", alignContent: "flex-start" }}>
              {/* Title and Description */}
              <div style={{ width: "877px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "8px", display: "inline-flex" }}>
                <div style={{ color: "hsl(var(--color-surface-900))", fontSize: "30px", fontFamily: "Inter", fontWeight: "600", lineHeight: "36px", wordWrap: "break-word" }}>Site selection & location strategy reports</div>
                <div style={{ alignSelf: "stretch", color: "hsl(var(--color-surface-500))", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Tailored insights to drive critical location decisions for your clients.</div>
              </div>

              {/* Hero Image */}
              <img
                style={{
                  width: "calc(100% - 32px)", // 32px gap to right form
                  height: "553px",
                  objectFit: "cover",
                  marginRight: "32px",
                }}
                src={heroImage}
                alt="Site Selection Dashboard"
              />

              {/* Service Cards Container */}
              <div style={{ width: "calc(100% - 32px)", marginTop: "-250px", display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "24px", justifyContent: "flex-start", alignItems: "flex-start" }}>
                {/* Labor Analytics Card */}
                <div className="service-card">
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                    <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                      <img src={briefcaseIcon} style={{ width: "32px", height: "32px" }} alt="Briefcase" />
                    </div>
                    <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Labor Analytics</div>
                  </div>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Empower site selection with workforce data to optimize access to talent and reduce talent-related risk.</div>
                </div>

                {/* Market Trends Card */}
                <div className="service-card">
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                    <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                      <img src={mapPinnedIcon} style={{ width: "32px", height: "32px" }} alt="Map Pinned" />
                    </div>
                    <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Market Trends</div>
                  </div>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Deliver timely market intelligence for strategic portfolio decisions and competitive leasing advantages.</div>
                </div>

                {/* GIS Data Analysis Card */}
                <div className="service-card">
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                    <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                      <img src={textSearchIcon} style={{ width: "32px", height: "32px" }} alt="Text Search" />
                    </div>
                    <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>GIS Data Analysis</div>
                  </div>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Visualize location intelligence to identify optimal sites and assess spatial impacts on portfolio growth.</div>
                </div>

                {/* Risk Mitigation Card */}
                <div className="service-card">
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                    <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                      <img src={shieldHalfIcon} style={{ width: "32px", height: "32px" }} alt="Shield Half" />
                    </div>
                    <div style={{ color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Risk Mitigation</div>
                  </div>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Uncover risks in occupancy, regulation, and market shifts to safeguard your property portfolio decisions.</div>
                </div>

                {/* Transportation & Emergency Planning Card */}
                <div className="service-card">
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                    <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                      <img src={carFrontIcon} style={{ width: "32px", height: "32px" }} alt="Car Front" />
                    </div>
                    <div style={{ flex: "1 1 0", color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Transportation & Emergency Planning</div>
                  </div>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Analyze transit and emergency access to ensure business continuity and site accessibility.</div>
                </div>

                {/* Competitive Analysis Card */}
                <div className="service-card">
                  <div style={{ alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", gap: "32px", display: "inline-flex" }}>
                    <div style={{ padding: "12px", background: "hsl(var(--brand-newmark-blue))", boxShadow: "8px 8px 0px #23C4FF", justifyContent: "flex-start", alignItems: "center", gap: "10px", display: "flex" }}>
                      <img src={chartNoAxesIcon} style={{ width: "32px", height: "32px" }} alt="Chart No Axes" />
                    </div>
                    <div style={{ flex: "1 1 0", color: "hsl(var(--brand-black))", fontSize: "24px", fontFamily: "Libre Baskerville", fontWeight: "400", lineHeight: "30px", wordWrap: "break-word" }}>Competitive Analysis</div>
                  </div>
                  <div style={{ alignSelf: "stretch", color: "hsl(var(--brand-dark-gray))", fontSize: "16px", fontFamily: "Inter", fontWeight: "500", lineHeight: "25.60px", wordWrap: "break-word" }}>Benchmark nearby assets and leasing activity to inform strategies and differentiate your property's value.</div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Form */}
            <div style={{ width: "459px", height: "100%", position: "relative", background: "white", overflow: "hidden", borderLeft: "1px hsl(var(--color-surface-100)) solid", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", display: "inline-flex" }}>
              {/* Bottom Button */}
              <div style={{ width: "459px", paddingLeft: "24px", paddingRight: "24px", paddingTop: "16px", paddingBottom: "16px", left: "0px", bottom: "0px", position: "absolute", background: "white", borderTop: "1px #DFE1E6 solid", justifyContent: "flex-end", alignItems: "center", gap: "16px", display: "inline-flex" }}>
                <button type="button" onClick={handleRequestReport} style={{ flex: "1 1 0", paddingLeft: "16px", paddingRight: "16px", paddingTop: "8px", paddingBottom: "8px", background: "hsl(var(--color-primary-color))", borderRadius: "6px", outline: "1px hsl(var(--button-primary-border-color)) solid", outlineOffset: "-1px", justifyContent: "center", alignItems: "center", gap: "8px", display: "flex", border: "none", cursor: "pointer" }}>
                  <img src={mailIcon} style={{ width: "14px", height: "14px" }} alt="Mail" />
                  <div style={{ color: "hsl(var(--button-primary-color))", fontSize: "14px", fontFamily: "Inter", fontWeight: "600", lineHeight: "22px", wordWrap: "break-word" }}>Request client report</div>
                </button>
              </div>

              {/* Form Content */}
              <div style={{ alignSelf: "stretch", height: "1101px", padding: "24px", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: "24px", display: "flex" }}>
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
                      <select
                        value={dealStage}
                        onChange={(e) => setDealStage(e.target.value)}
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          color: "hsl(var(--color-surface-900))",
                          fontFamily: "Inter",
                          fontSize: "14px",
                        }}
                      >
                        {dealStageOptions.map((opt) => (
                          <option value={opt} key={opt} style={{ color: "black" }}>
                            {opt}
                          </option>
                        ))}
                      </select>
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
                          <div key={opt} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                            <input type="checkbox" checked={requiredData.includes(opt)} onChange={()=>toggleRequired(opt)} style={{ width:"17.5px", height:"17.5px" }} />
                            <div style={{ color:"hsl(var(--text-color))", fontSize:"14px", fontFamily:"Inter", lineHeight:"22px" }}>{opt}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ flex: "1 1 0", paddingTop: "8px", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: "16px", display: "inline-flex" }}>
                        {requiredDataOptions.slice(4).map((opt)=>(
                          <div key={opt} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
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
    </div>
  );
};

export default SiteSelectionDashboard;