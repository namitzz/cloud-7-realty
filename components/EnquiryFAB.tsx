"use client";

import { useState } from "react";
import EnquiryModal from "./EnquiryModal";

interface EnquiryFABProps {
  propertyTitle: string;
  propertySlug: string;
}

export default function EnquiryFAB({
  propertyTitle,
  propertySlug,
}: EnquiryFABProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tooltipId = "enquiry-fab-tooltip";

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-gradient-to-br from-luxury-gold to-luxury-darkGold hover:from-luxury-darkGold hover:to-luxury-gold rounded-full shadow-luxury-lg hover:shadow-luxury-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open enquiry form"
        aria-describedby={tooltipId}
      >
        {/* Icon */}
        <svg
          className="w-6 h-6 stroke-white transition-transform group-hover:rotate-12"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>

        {/* Tooltip */}
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute right-full mr-3 px-3 py-1.5 bg-neutral-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          {propertyTitle
            ? `Enquire about ${propertyTitle}`
            : "Get in Touch"}
        </span>
      </button>

      {/* Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyTitle={propertyTitle}
        propertySlug={propertySlug}
      />
    </>
  );
}
