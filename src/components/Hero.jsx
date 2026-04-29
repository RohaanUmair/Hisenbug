import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-off-white flex items-center min-h-[calc(100vh-64px)] py-12 lg:py-0 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-navy leading-[1.1]">
            AI Systems Built To <span className="text-primary relative inline-block">Remove Operational Bottlenecks.<span className="absolute bottom-1 left-0 w-full h-2 bg-primary/10 -z-10"></span></span>
          </h1>
          <p className="text-lg lg:text-xl text-slate leading-relaxed">
            Hisenbug builds AI employees, voice agents, chatbots, and automation workflows that help businesses reduce workload, save time, and scale efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center h-14 px-8 text-base font-medium bg-primary text-white hover:bg-navy transition-colors rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-300"
            >
              Book Strategy Call
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center h-14 px-8 text-base font-medium border border-slate/20 text-navy hover:bg-slate/5 transition-colors rounded-sm"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Sophisticated Abstract Process Visual */}
        <div className="relative w-full aspect-[4/3] lg:aspect-[1.1/1] max-w-lg mx-auto lg:max-w-none flex items-center justify-center mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-primary/10 rounded-sm opacity-60 -z-10 transform rotate-3 transition-transform duration-700 hover:rotate-6"></div>
          <div className="absolute inset-0 border border-slate/10 bg-white shadow-xl rounded-sm z-0 transform -rotate-2 hover:-rotate-1 transition-transform duration-700 overflow-hidden p-2">
            <div className="relative w-full h-full rounded-sm overflow-hidden">
              <Image 
                src="/hero_abstract.png" 
                alt="AI Automation Workflow Representation" 
                fill 
                className="object-cover transition-transform duration-1000 hover:scale-105" 
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
