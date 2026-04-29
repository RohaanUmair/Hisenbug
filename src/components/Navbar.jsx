import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-off-white/95 backdrop-blur-md border-b border-slate/10 border-t-4 border-t-primary">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="Hisenbug Logo"
              fill
              className="object-contain"
              priority
              sizes="40px"
            />
          </div>
          <span className="font-medium text-xl tracking-tight text-navy">Hisenbug</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-medium text-slate hover:text-navy transition-colors">Home</Link>
          <Link href="#services" className="text-sm font-medium text-slate hover:text-navy transition-colors">Services</Link>
          <Link href="#case-studies" className="text-sm font-medium text-slate hover:text-navy transition-colors">Case Studies</Link>
          <Link href="#about" className="text-sm font-medium text-slate hover:text-navy transition-colors">About</Link>
          <Link href="#contact" className="text-sm font-medium text-slate hover:text-navy transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="#contact" 
            className="hidden sm:inline-flex items-center justify-center h-10 px-6 text-sm font-medium bg-primary text-white hover:bg-navy transition-colors rounded-sm shadow-sm hover:shadow-md"
          >
            Book Discovery Call
          </Link>
        </div>
      </div>
    </nav>
  );
}
