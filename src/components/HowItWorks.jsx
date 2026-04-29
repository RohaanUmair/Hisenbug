export default function HowItWorks() {
  const steps = [
    { number: "01", title: "Discovery", description: "Understand operational bottlenecks." },
    { number: "02", title: "Strategy", description: "Design automation roadmap." },
    { number: "03", title: "Build", description: "Develop systems." },
    { number: "04", title: "Deploy", description: "Integrate workflows." },
    { number: "05", title: "Optimize", description: "Improve over time." },
  ];

  return (
    <section className="w-full bg-off-white py-20 border-b border-slate/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-navy tracking-tight">Our Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line for desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-12 right-0 h-[2px] bg-primary/10"></div>
              )}
              
              <div className="flex flex-col gap-4 relative z-10">
                <span className="w-12 h-12 bg-primary text-white font-medium flex items-center justify-center rounded-sm shadow-[0_4px_14px_0_rgba(109,40,217,0.39)] text-sm transition-transform hover:scale-110 duration-300">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-navy mb-2">{step.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
