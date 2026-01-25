"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "contact",
          timestamp: new Date().toISOString(),
        }),
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-14">
        <div className="container-custom">
          <div className="mb-3 text-sm text-neutral-500">
            Home <span className="mx-2">/</span> Contact
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Speak with our team for verified properties and on-ground support.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-14">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-serif font-bold mb-2">
                    Thank You
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    We’ve received your message and will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-serif font-bold mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                    />

                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border rounded-lg"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full py-3"
                    >
                      {isSubmitting ? "Sending..." : "Submit Message"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">

              {/* Contact Details */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">
                  Contact Information
                </h2>

                <div className="space-y-4 text-neutral-700">
                  <div>
                    <p className="font-medium text-luxury-navy">Phone</p>
                    <p>9906599038</p>
                    <p>7977125458</p>
                  </div>

                  <div>
                    <p className="font-medium text-luxury-navy">Email</p>
                    <p>aarshkhan@cloudsevenrealty.com</p>
                    <p>aarsh2301@gmail.com</p>
                  </div>

                  <div>
                    <p className="font-medium text-luxury-navy">Office Hours</p>
                    <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Office */}
              <div className="rounded-xl border border-neutral-200 p-6">
                <h3 className="font-serif font-bold text-lg mb-2">
                  Our Office
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Cloud Seven Realty<br />
                  Srinagar, Jammu & Kashmir<br />
                  India
                </p>

                <a
                  href="https://www.google.com/maps?ll=34.075628,74.810624&z=14&t=m&hl=en&gl=US&mapclient=apiv3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-luxury-gold hover:underline"
                >
                  View on Google Maps
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
