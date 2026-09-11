import Image from "next/image";

export function CommunityValues() {
  const values = [
    {
      title: "All paces",
      body: "Fast, slow, somewhere in between — there is a place for you here. We run together, not against each other.",
      image: "/wagmi/SnapInsta.to_540579557_17903177901250444_3982950226620894724_n.jpg",
    },
    {
      title: "All backgrounds",
      body: "WAGMI is for everyone. Different careers, different lives, different stories — united by the road and the people on it.",
      image: "/wagmi/SnapInsta.to_541530850_17903177910250444_1661990632498568655_n.jpg",
    },
    {
      title: "Connection",
      body: "We show up for each other. On the run, after the run, and long after the run is over.",
      image: "/wagmi/SnapInsta.to_683148602_17903362830408573_8137015842164849167_n.jpg",
    },
    {
      title: "Progress",
      body: "Small steps add up. Personal bests, new habits, stronger minds — progress looks different for everyone.",
      image: "/wagmi/SnapInsta.to_683552316_17903362827408573_2520629407912285782_n.jpg",
    },
  ];

  return (
    <section className="mt-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="kicker kicker--beige">WHAT WE DO</p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Four things we believe in.
          </h2>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {values.map((value) => (
          <div key={value.title} className="grid gap-6 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-2">
              <Image
                src={value.image}
                alt={value.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="font-display text-xl font-black tracking-tight text-foreground">
                {value.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{value.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
