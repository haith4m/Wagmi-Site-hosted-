export function CommunityEvents() {
  const events = [
    {
      date: "Every Monday",
      time: "7:00 PM",
      location: "North Greenwich",
      type: "Weekly Run",
      description: "Our flagship weekly run. 5K social run, all paces welcome. Meet at the North Greenwich pier.",
    },
    {
      date: "Every Wednesday",
      time: "7:30 PM",
      location: "Victoria Park",
      type: "Track Session",
      description: "Interval training for those who want to push themselves. All levels welcome — we scale the session to you.",
    },
    {
      date: "Monthly",
      time: "Sunday mornings",
      location: "Various",
      type: "Long Run",
      description: "A longer, slower run to explore different parts of London. Distances vary from 10K to half-marathon.",
    },
    {
      date: "Seasonal",
      time: "TBC",
      location: "TBC",
      type: "Social Runs & Events",
      description: "Parkrun support, race days, summer socials, and winter runs. Check the runs page for the latest.",
    },
  ];

  return (
    <section className="mt-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="kicker kicker--beige">EVENTS</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Regular sessions.
          </h2>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <div
            key={event.type}
            className="group relative overflow-hidden rounded-sm border border-line bg-surface p-6 transition-hover hover:border-foreground/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-sm font-black uppercase tracking-wider text-accent">
                  {event.date}
                </p>
                <p className="mt-1 font-display text-xl font-black tracking-tight text-foreground">
                  {event.type}
                </p>
              </div>
              <div className="shrink-0">
                <p className="text-sm font-medium text-muted">{event.time}</p>
                <p className="mt-0.5 text-sm text-muted">{event.location}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{event.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
              View details
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
