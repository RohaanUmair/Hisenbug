export default function Services() {
  const services = [
    {
      title: "AI Voice Agents",
      description: "Handle calls, qualification, booking, and communication through intelligent voice automation.",
    },
    {
      title: "AI Employees",
      description: "Deploy AI workers to automate repetitive internal processes and business operations.",
    },
    {
      title: "Workflow Automation",
      description: "Connect business tools and automate manual systems.",
    },
    {
      title: "AI Chatbots",
      description: "Provide instant responses, lead capture, and support automation.",
    },
    {
      title: "Business Automation",
      description: "Remove repetitive work through scalable operational systems.",
    },
    {
      title: "Custom AI Solutions",
      description: "Built specifically around company workflows and business goals.",
    },
  ];

  return (
    <section id="services" className="w-full bg-off-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-medium text-navy mb-4 tracking-tight">Our Services</h2>
          <p className="text-lg text-slate max-w-2xl leading-relaxed">
            We build sophisticated AI systems designed to integrate seamlessly into your business, 
            driving efficiency and removing operational friction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white border border-slate/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="w-12 h-12 bg-lavender rounded-sm flex items-center justify-center mb-6 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="font-semibold text-primary group-hover:text-white">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-medium text-navy mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-slate leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 pt-5 border-t border-slate/5 mt-auto flex items-center justify-between">
                <span className="text-sm font-medium text-navy">Explore</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
