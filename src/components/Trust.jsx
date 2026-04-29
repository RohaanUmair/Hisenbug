export default function Trust() {
  const metrics = [
    { label: "Faster Operations", value: "85%" },
    { label: "Reduced Manual Work", value: "10x" },
    { label: "Process Optimization", value: "24/7" },
    { label: "Increased Efficiency", value: "300%" },
  ];

  return (
    <section className="w-full bg-lavender py-16 border-y border-slate/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-navy max-w-md leading-snug">
            Designed to help modern businesses automate operations intelligently.
          </h2>
          <div className="flex flex-wrap gap-3 max-w-sm">
            <span className="px-4 py-2 bg-primary/5 text-primary text-sm font-medium border border-primary/20 rounded-sm">Enterprise Grade</span>
            <span className="px-4 py-2 bg-primary/5 text-primary text-sm font-medium border border-primary/20 rounded-sm">Strategic Focus</span>
            <span className="px-4 py-2 bg-primary/5 text-primary text-sm font-medium border border-primary/20 rounded-sm">Industry Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate/10">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col gap-2">
              <span className="text-4xl lg:text-5xl font-medium text-primary tracking-tight">
                {metric.value}
              </span>
              <span className="text-sm font-medium text-slate">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
