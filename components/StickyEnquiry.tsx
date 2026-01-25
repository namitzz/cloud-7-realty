"use client";

import { useState, useEffect } from "react";
import { WHATSAPP_CONFIG } from '@/lib/config';

interface StickyEnquiryProps {
  projectName?: string;
  projectSlug?: string;
}

export default function StickyEnquiry({ projectName = "", projectSlug = "" }: StickyEnquiryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 40% scroll
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to API
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          projectName,
          projectSlug,
          timestamp: new Date().toISOString()
        })
      });

      setSubmitted(true);
      setFormData({ name: "", phone: "" });

      // Track analytics
      if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
        ((window as unknown as { gtag: Function }).gtag)("event", "enquire_click", {
          project: projectName || projectSlug
        });
      }
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = projectName 
    ? `Hi, I'm interested in ${projectName}. Can you provide more details?`
    : "Hi, I'm interested in learning more about your properties";

  // Use centralized config for WhatsApp number
  const whatsappLink = `https://wa.me/${WHATSAPP_CONFIG.getNumber()}?text=${encodeURIComponent(whatsappMessage)}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm px-4 sm:px-0 animate-slide-up">
      <div className="bg-gradient-to-br from-white to-luxury-50 rounded-2xl shadow-luxury-lg border-2 border-luxury-gold/30 p-6 backdrop-blur-sm">
        {submitted ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-luxury-navy">Thank You!</h3>
            <p className="text-sm text-neutral-600 mb-4">
              We&apos;ll get back to you shortly
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-luxury-gold font-semibold hover:text-luxury-darkGold transition-colors"
            >
              Send Another Enquiry →
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-xl text-luxury-navy">
                  {projectName ? `Enquire about ${projectName}` : "Get in Touch"}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">We&apos;ll respond within 24 hours</p>
              </div>
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-luxury-gold to-luxury-darkGold rounded-full flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-luxury-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-all"
              />
              
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-luxury-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-all"
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : "Submit Enquiry"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-luxury-gold/20">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
                    ((window as unknown as { gtag: Function }).gtag)("event", "whatsapp_click", {
                      project: projectName || projectSlug
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
