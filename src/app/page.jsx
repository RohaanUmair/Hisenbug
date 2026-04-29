import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import CaseStudies from "@/components/CaseStudies";
import WhyHisenbug from "@/components/WhyHisenbug";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1 w-full font-sans bg-background">
        <Hero />
        <Trust />
        <Services />
        <ProblemSolution />
        <HowItWorks />
        <CaseStudies />
        <WhyHisenbug />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
