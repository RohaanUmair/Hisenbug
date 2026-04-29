import Link from "next/link";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "Lead Qualification Automation",
      problem: "Company losing inbound leads due to slow response times and manual follow-ups.",
      solution: "Implemented an AI chatbot integrated with custom CRM workflows to instantly qualify and route leads.",
      results: [
        "Faster response times",
        "Reduced administrative work",
        "30% better conversion rates"
      ]
    },
    {
      title: "Internal Operations Voice Agent",
      problem: "Service business overwhelmed with manual appointment bookings and basic customer inquiries.",
      solution: "Deployed a conversational AI voice agent to handle level-1 support and scheduling autonomously.",
      results: [
        "24/7 availability",
        "40 hours saved weekly",
        "Improved customer satisfaction"
      ]
    }
  ];

  return (
    <section id="case-studies" className="w-full bg-white py-20 border-b border-slate/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 flex justify-between items-end">
          <h2 className="text-4xl font-medium text-navy tracking-tight max-w-xl">Proven Business Outcomes</h2>
          <Link href="#contact" className="hidden md:inline-flex text-sm font-medium text-primary hover:text-navy transition-colors items-center gap-2 group">
            Discuss Your Use Case <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="group flex flex-col lg:flex-row border border-slate/10 rounded-sm overflow-hidden hover:border-slate/20 transition-colors">
              <div className="lg:w-1/3 bg-off-white p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate/10">
                <span className="text-xs font-semibold tracking-wider text-slate uppercase mb-4">Case Study {index + 1}</span>
                <h3 className="text-2xl font-medium text-navy leading-snug">{study.title}</h3>
              </div>
              
              <div className="lg:w-2/3 p-8 grid md:grid-cols-2 gap-8 bg-white">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-navy mb-2">The Problem</h4>
                    <p className="text-slate leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-navy mb-2">The Solution</h4>
                    <p className="text-slate leading-relaxed">{study.solution}</p>
                  </div>
                </div>
                
                <div className="bg-lavender/30 p-6 rounded-sm border border-primary/10">
                  <h4 className="text-sm font-medium text-navy mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span> Key Results
                  </h4>
                  <ul className="space-y-3">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] mt-0.5">✓</span>
                        <span className="text-navy font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
