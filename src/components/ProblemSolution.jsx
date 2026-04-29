import Image from "next/image";

export default function ProblemSolution() {
  const problems = [
    "Repetitive tasks",
    "Slow workflows",
    "Missed opportunities",
    "Manual follow-ups",
    "Operational inefficiency",
  ];

  const solutions = [
    "AI employees",
    "Workflow automation",
    "CRM integration",
    "Intelligent processes",
    "Voice systems",
  ];

  return (
    <section className="w-full bg-primary text-white py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-medium mb-12 tracking-tight max-w-3xl">
          Manual Work Is Costing Businesses Time And Revenue.
        </h2>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-lavender/70 border-b border-white/10 pb-4">
              The Cost of Inefficiency
            </h3>
            <ul className="space-y-4">
              {problems.map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-lg">
                  <span className="w-1.5 h-1.5 bg-white/30 rounded-full"></span>
                  <span className="opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="relative h-full min-h-[400px] rounded-sm overflow-hidden shadow-2xl transform lg:-translate-y-4 border border-white/10 group">
            <Image 
              src="/business_operations.png" 
              alt="Business Operations Automation" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/20"></div>
            <div className="absolute bottom-0 left-0 w-full p-8 text-white space-y-6">
              <h3 className="text-xl font-medium border-b border-white/20 pb-4">
                The Hisenbug Approach
              </h3>
              <ul className="space-y-4">
                {solutions.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-lg">
                    <span className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
