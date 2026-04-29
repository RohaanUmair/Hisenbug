import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-off-white border-t border-slate/10 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Hisenbug Logo"
                fill
                className="object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                sizes="40px"
              />
            </div>
            <span className="font-medium text-xl tracking-tight text-slate group-hover:text-navy transition-colors">Hisenbug</span>
          </Link>
          <p className="text-sm text-slate">
            Premium AI Automation & Systems
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 text-sm font-medium text-slate">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <Link href="#services" className="hover:text-navy transition-colors">Services</Link>
          <Link href="#case-studies" className="hover:text-navy transition-colors">Case Studies</Link>
          <Link href="#about" className="hover:text-navy transition-colors">About</Link>
          <Link href="#contact" className="hover:text-navy transition-colors">Contact</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate">
        <p>&copy; {new Date().getFullYear()} Hisenbug. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-navy transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-navy transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
