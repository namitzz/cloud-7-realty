"use client";

import { WHATSAPP_CONFIG } from "@/lib/config";
import { useState } from "react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertySlug: string;
}

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxG41Ylvokaf3DAhuBoE_QCG1URI0mbVXoMsWqLnU-AIDUQhGHfcSx8CVvG-R4U1iL2/exec";

export default function EnquiryModal({
  isOpen,
  onClose,
  propertyTitle,
  propertySlug,
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // REQUIRED for Apps Script
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          property: propertyTitle || propertySlug,
        }),
      });

      setSubmitted(true);
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = propertyTitle
    ? `Hi, I'm interested in ${propertyTitle}. Can you provide more details?`
    : "Hi, I'm interested in learning more about your properties";

  const whatsappLink = `https://wa.me/${WHATSAPP_CONFIG.getNumber()}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-gradient-to-br from-white to-luxury-50 rounded-2xl shadow-luxury-lg border-2 border-luxury-gold/30 p-6 backdrop-blur-sm w-full max-w-md pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {submitted ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400 rounded-full mb-4 shadow-lg">
                ✔
              </div>
              <h3 className="font-bold text-xl mb-2">Thank You!</h3>
              <p className="text-sm text-neutral-600 mb-4">
                We’ll get back to you shortly
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-luxury-gold font-semibold hover:text-luxury-darkGold"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-xl mb-2">
                {propertyTitle
                  ? `Enquire about ${propertyTitle}`
                  : "Get in Touch"}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                We'll respond within 24 hours
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>

              {/* WhatsApp CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl mt-4"
              >
                Chat on WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
