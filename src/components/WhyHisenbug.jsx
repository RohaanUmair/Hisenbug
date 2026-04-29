import Image from "next/image";

export default function WhyHisenbug() {
  const reasons = [
    { title: "Business-first thinking", desc: "We prioritize your operational goals over flashy technology." },
    { title: "Premium implementation", desc: "Enterprise-grade architecture tailored for stability." },
    { title: "Long-term systems", desc: "Built to scale as your company grows." },
    { title: "ROI focused", desc: "Every solution is designed to generate measurable returns." },
    { title: "Strategic execution", desc: "We map out the entire process before writing a single line of code." },
    { title: "Human-centered automation", desc: "Enhancing your team's capabilities, not just replacing them." },
  ];

  return (
    <section id="about" className="w-full bg-off-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-4 flex flex-col">
            <h2 className="text-3xl font-medium text-navy tracking-tight leading-snug">
              Why Partner With Hisenbug?
            </h2>
            <p className="text-slate leading-relaxed">
              We are not just a technology provider. We act as your strategic operations partner, bridging the gap between business processes and intelligent automation.
            </p>
            <div className="relative w-full flex-1 min-h-[250px] rounded-sm overflow-hidden mt-6 shadow-lg border border-slate/10">
              <Image 
                src="/professional_office.png" 
                alt="Professional Consulting Office" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105" 
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col gap-2 group cursor-default">
                <h3 className="text-lg font-medium text-navy flex items-center gap-3 transition-colors group-hover:text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full block shadow-[0_0_8px_rgba(109,40,217,0.4)] group-hover:scale-150 transition-transform"></span>
                  {reason.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed pl-5">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
