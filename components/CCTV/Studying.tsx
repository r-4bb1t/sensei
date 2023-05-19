export default function Studying({ size }: { size: number }) {
  return (
    <div className="absolute top-0 left-0 w-full animate-study origin-bottom gap-0 grid grid-cols-8">
      {[...Array(size * 2 + 2)].map((_, i) => (
        <img src="/assets/blank.png" className="w-full" key={i} />
      ))}
      {[...Array(size * 2 + 2)].map((_, i) => (
        <img
          src="/assets/blank.png"
          className="w-full animate-study origin-bottom"
          key={i}
        />
      ))}
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img
        src="/assets/students/7.png"
        className="w-full animate-study origin-bottom"
      />
      <img
        src="/assets/students/4.png"
        className="w-full animate-study origin-bottom"
      />
      <img
        src="/assets/students/1.png"
        className="w-full animate-study origin-bottom"
      />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />

      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img
        src="/assets/students/8.png"
        className="w-full animate-study origin-bottom"
      />
      <img
        src="/assets/students/5.png"
        className="w-full animate-study origin-bottom"
      />
      <img
        src="/assets/students/2.png"
        className="w-full animate-study origin-bottom"
      />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />

      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img
        src="/assets/students/9.png"
        className="w-full animate-study origin-bottom"
      />
      <img
        src="/assets/students/6.png"
        className="w-full animate-study origin-bottom"
      />
      <img
        src="/assets/students/3.png"
        className="w-full animate-study origin-bottom"
      />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
    </div>
  );
}
