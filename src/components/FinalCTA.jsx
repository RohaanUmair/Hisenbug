import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full bg-primary text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight">
          Ready To Build Smarter Operations?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
          Book a strategy call and discover how automation can transform your business.
        </p>
        <Link
          href="#contact"
          className="inline-flex items-center justify-center h-14 px-10 text-base font-medium bg-white text-primary hover:bg-off-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm"
        >
          Book Discovery Call
        </Link>
      </div>
    </section>
  );
}
