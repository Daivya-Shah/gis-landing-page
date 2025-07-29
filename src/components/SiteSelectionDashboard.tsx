import { Home, Building2, BarChart3, ChevronDown, ChevronRight, X, BriefcaseBusiness } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  // Form state
  const [clientName, setClientName] = useState("");
  const turnaroundOptions = ["3 days", "1 week", "2 weeks", "1 month"];
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
  const [dealStageOpen, setDealStageOpen] = useState(false);

  // Close modal automatically if sidebar becomes visible (≥1800px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1800 && showMobileForm) {
        setShowMobileForm(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showMobileForm]);

  // Lock body scroll when modal is open
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

  const services = [
    {
      title: "Labor Analytics",
      description: "Empower site selection with workforce data to optimize access to talent and reduce talent-related risk.",
      icon: BriefcaseBusiness,
      iconSize: 32
    },
    {
      title: "Market Trends", 
      description: "Deliver timely market intelligence for strategic portfolio decisions and competitive leasing advantages.",
      icon: mapPinnedIcon,
      iconSize: 32,
      isImage: true
    },
    {
      title: "GIS Data Analysis",
      description: "Visualize location intelligence to identify optimal sites and assess spatial impacts on portfolio growth.",
      icon: textSearchIcon,
      iconSize: 32,
      isImage: true
    },
    {
      title: "Risk Mitigation",
      description: "Uncover risks in occupancy, regulation, and market shifts to safeguard your property portfolio decisions.",
      icon: shieldHalfIcon,
      iconSize: 32,
      isImage: true
    },
    {
      title: "Transportation & Emergency Planning",
      description: "Analyze transit and emergency access to ensure business continuity and site accessibility.",
      icon: carFrontIcon,
      iconSize: 32,
      isImage: true
    },
    {
      title: "Competitive Analysis",
      description: "Benchmark nearby assets and leasing activity to inform strategies and differentiate your property's value.",
      icon: chartNoAxesIcon,
      iconSize: 32,
      isImage: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-white border-r border-border z-40 flex flex-col">
        {/* Logo */}
        <div className="p-3 border-b border-border">
          <img src={newmarkLogo} className="w-6 h-6" alt="Newmark Logo" />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-2 space-y-1">
          {/* First section */}
          <div className="space-y-1 mb-6">
            <div className="p-2 bg-sidebar-accent rounded-md">
              <BriefcaseBusiness size={20} className="text-sidebar-primary mx-auto" />
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={handshakeIcon} className="w-5 h-5 mx-auto" alt="Handshake" />
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={userSearchIcon} className="w-5 h-5 mx-auto" alt="User Search" />
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={chartColumnIcon} className="w-5 h-5 mx-auto" alt="Chart Column" />
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={filePenLineIcon} className="w-5 h-5 mx-auto" alt="File Pen" />
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={building2IconSvg} className="w-5 h-5 mx-auto" alt="Building" />
            </div>
          </div>

          {/* Second section - Company Icons */}
          <div className="space-y-1">
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <div className="w-5 h-5 mx-auto bg-purple-600 rounded flex items-center justify-center">
                <img src={crucialLogoIcon} className="w-3 h-3" alt="Crucial AI" />
              </div>
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={avatarsIcon} className="w-5 h-5 mx-auto rounded" alt="Avatars" />
            </div>
            <div className="p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
              <img src={avatars2Icon} className="w-5 h-5 mx-auto rounded" alt="Avatars2" />
            </div>
          </div>
        </div>

        {/* User Avatar at Bottom */}
        <div className="p-2 border-t border-border">
          <div className="w-7 h-7 bg-muted rounded-full mx-auto"></div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex ml-16">
        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Header */}
          <header className="bg-white border-b border-border p-6 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
              <Home size={14} className="text-muted-foreground" />
              <ChevronRight size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Site Selection</span>
            </div>
            <Button 
              onClick={() => setShowMobileForm(true)}
              className="xl:hidden"
            >
              Request report
            </Button>
          </header>

          {/* Content */}
          <main className="p-8">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Site selection & location strategy reports
              </h1>
              <p className="text-muted-foreground font-medium">
                Tailored insights to drive critical location decisions for your clients.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative mb-8">
              <img 
                src={heroImage} 
                alt="Site Selection Dashboard"
                className="w-full h-[553px] object-cover rounded-lg"
              />
              
              {/* Service Cards - Overlapping the image with proper spacing */}
              <div className="absolute -bottom-32 left-8 right-8">
                {/* Grid with proper responsive layout and alignment */}
                <div className="grid gap-6 
                  grid-cols-1 
                  sm:grid-cols-1 
                  md:grid-cols-2 
                  lg:grid-cols-2 
                  xl:grid-cols-3 
                  2xl:grid-cols-3">
                  {services.map((service, index) => (
                    <Card key={index} className="bg-white shadow-lg h-[280px] border border-gray-200">
                      <CardContent className="p-8 h-full flex flex-col">
                        <div className="flex items-start gap-6 mb-6">
                          <div className="p-3 bg-blue-600 shadow-[8px_8px_0px_#23C4FF] flex items-center justify-center flex-shrink-0">
                            {service.isImage ? (
                              <img src={service.icon as string} className="w-8 h-8" alt={service.title} />
                            ) : (
                              <service.icon size={service.iconSize} className="text-white" />
                            )}
                          </div>
                          <h3 className="text-xl lg:text-2xl font-normal text-foreground font-libre-baskerville leading-tight">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-sm lg:text-base text-muted-foreground font-medium leading-relaxed line-clamp-4 flex-1">
                          {service.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Spacer for overlapping cards */}
            <div className="h-40"></div>
          </main>
        </div>

        {/* Right Sidebar Form - Desktop Only */}
        <div className="hidden xl:flex w-[459px] bg-white border-l border-border sticky top-0 h-screen flex-col">
          {/* Form Content */}
          <div className="flex-1 p-6 pb-24 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-6">Get a custom report for your client</h2>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-bold text-destructive">*</span> Fields with an asterisk are{" "}
              <span className="font-bold">required</span>
            </p>

            <div className="space-y-6">
              {/* Client Name Input */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Client Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter company"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Deal Stage Select */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Deal Stage <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <BarChart3 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" />
                  <div className="deal-stage-container">
                    <div
                      onClick={toggleDealStageOpen}
                      className="flex items-center justify-between w-full px-10 py-2 text-sm bg-background border border-input rounded-md cursor-pointer"
                    >
                      <span className={dealStage ? "text-foreground" : "text-muted-foreground"}>
                        {dealStage || "Select deal stage"}
                      </span>
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>

                    {dealStageOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50">
                        {dealStageOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => handleSelectDealStage(opt)}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Turnaround Time Toggle Group */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Turnaround Time <span className="text-destructive">*</span>
                </label>
                <div className="flex bg-muted rounded-md p-0.5">
                  {turnaroundOptions.map((opt, idx) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTurnaround(opt)}
                      className={`flex-1 px-3 py-1.5 text-sm font-semibold rounded transition-all ${
                        opt === turnaround
                          ? "bg-background text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required Data Checkboxes */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Required Data</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {requiredDataOptions.map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={requiredData.includes(opt)}
                        onChange={() => toggleRequired(opt)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Textarea */}
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block">Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes..."
                  className="min-h-[100px] resize-y"
                />
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-border">
            <Button 
              onClick={handleRequestReport}
              className="w-full"
            >
              <img src={mailIcon} className="w-4 h-4 mr-2" alt="Mail" />
              Request client report
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Modal Form */}
      {showMobileForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Get a custom report for your client</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileForm(false)}
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-destructive">*</span> Fields with an asterisk are{" "}
                <span className="font-bold">required</span>
              </p>

              {/* Client Name Input */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Client Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter company"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Deal Stage Select */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Deal Stage <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <BarChart3 size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" />
                  <div className="deal-stage-container">
                    <div
                      onClick={toggleDealStageOpen}
                      className="flex items-center justify-between w-full px-10 py-2 text-sm bg-background border border-input rounded-md cursor-pointer"
                    >
                      <span className={dealStage ? "text-foreground" : "text-muted-foreground"}>
                        {dealStage || "Select deal stage"}
                      </span>
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </div>

                    {dealStageOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50">
                        {dealStageOptions.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => handleSelectDealStage(opt)}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Turnaround Time Toggle Group */}
              <div>
                <label className="text-sm font-semibold mb-1 block">
                  Turnaround Time <span className="text-destructive">*</span>
                </label>
                <div className="flex bg-muted rounded-md p-0.5">
                  {turnaroundOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTurnaround(opt)}
                      className={`flex-1 px-2 py-1.5 text-xs font-semibold rounded transition-all ${
                        opt === turnaround
                          ? "bg-background text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Required Data Checkboxes */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Required Data</label>
                <div className="space-y-3 mt-2">
                  {requiredDataOptions.map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={requiredData.includes(opt)}
                        onChange={() => toggleRequired(opt)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Textarea */}
              <div>
                <label className="text-sm font-semibold mb-1 block">Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes..."
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                onClick={handleRequestReport}
                className="w-full"
              >
                <img src={mailIcon} className="w-4 h-4 mr-2" alt="Mail" />
                Request client report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteSelectionDashboard;