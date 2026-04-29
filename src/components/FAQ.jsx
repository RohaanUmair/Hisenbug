"use client";
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "How long does implementation take?",
      a: "Implementation timelines vary based on complexity, but most standard automation workflows and AI agents are deployed within 2 to 4 weeks, following our structured discovery and strategy process."
    },
    {
      q: "Which industries do you work with?",
      a: "We partner primarily with B2B businesses, agencies, SaaS companies, and high-ticket service providers looking to optimize internal processes and client operations."
    },
    {
      q: "Do you integrate with CRMs?",
      a: "Yes. We build custom integrations for major CRMs like HubSpot, Salesforce, GoHighLevel, and custom databases to ensure your new systems communicate seamlessly with your existing tech stack."
    },
    {
      q: "Can AI replace manual operations?",
      a: "Absolutely. Our solutions are designed to handle repetitive, rule-based tasks—such as data entry, lead qualification, and scheduling—freeing your team to focus on high-value, strategic work."
    },
    {
      q: "Do you provide support?",
      a: "Yes, we offer ongoing optimization and maintenance retainers to ensure your systems perform efficiently as your business scales and software environments evolve."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 border-t border-slate/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-medium text-navy text-center mb-12 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate/10 rounded-sm overflow-hidden"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-5 flex justify-between items-center hover:bg-off-white transition-colors"
              >
                <span className="font-medium text-navy">{faq.q}</span>
                <span className={`text-slate transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-5 pt-0 text-slate leading-relaxed bg-off-white/50">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
