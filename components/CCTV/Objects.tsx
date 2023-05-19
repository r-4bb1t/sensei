export default function Objects({ size }: { size: number }) {
  return (
    <div className="absolute top-0 left-0 w-full gap-0 grid md:grid-cols-8 grid-cols-6">
      {[...Array(size * 2 + 2)].map((_, i) => (
        <img src="/assets/blank.png" className="w-full" key={i} />
      ))}
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/items/speaker.png" className="w-full" />
      <img src="/assets/items/windows_l.png" className="w-full" />
      <img
        src="/assets/items/windows_m.png"
        className="w-full md:inline hidden"
      />
      <img src="/assets/items/windows_r.png" className="w-full" />
      <img src="/assets/items/clock.png" className="w-full md:inline hidden" />
      <img src="/assets/items/wall_something.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />

      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/items/desk1.png" className="w-full" />
      <img src="/assets/items/desk2.png" className="w-full" />
      <img src="/assets/items/desk3.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/items/lecturedesk_t.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />

      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/items/desk4.png" className="w-full" />
      <img src="/assets/items/desk1.png" className="w-full" />
      <img src="/assets/items/desk3.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/items/lecturedesk_b.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />

      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/items/desk2.png" className="w-full" />
      <img src="/assets/items/desk3.png" className="w-full" />
      <img src="/assets/items/desk4.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
    </div>
  );
}
