// Google Analytics 4 integration

export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || "";

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
    ((window as unknown as { gtag: Function }).gtag)("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, params?: Record<string, string | number | boolean>) => {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
    ((window as unknown as { gtag: Function }).gtag)("event", action, params);
  }
};

// Specific event trackers
export const trackEnquiryClick = (project?: string) => {
  event("enquire_click", project ? { project } : {});
};

export const trackWhatsAppClick = (source?: string, project?: string) => {
  const params: Record<string, string> = {};
  if (source) params.source = source;
  if (project) params.project = project;
  event("whatsapp_click", params);
};

export const trackLeadSubmit = (type: string) => {
  event("lead_submit", { type });
};
