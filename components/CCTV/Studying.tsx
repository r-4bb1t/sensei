import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const StudentItem = dynamic(() => import("./StudentItem"), {
  ssr: false,
});

export default function Studying({ size }: { size: number }) {
  return (
    <div className="absolute top-0 left-0 w-full origin-bottom gap-0 grid grid-cols-6 md:grid-cols-8">
      {[...Array(size * 2 + 2)].map((_, i) => (
        <img src="/assets/blank.png" className="w-full" key={i} />
      ))}
      {[...Array(size * 2 + 2)].map((_, i) => (
        <img src="/assets/blank.png" className="w-full origin-bottom" key={i} />
      ))}
      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <AnimatePresence>
        <StudentItem id={7} />
      </AnimatePresence>
      <AnimatePresence>
        <StudentItem id={4} />
      </AnimatePresence>
      <AnimatePresence>
        <StudentItem id={1} />
      </AnimatePresence>
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full md:inline hidden" />

      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <AnimatePresence>
        <StudentItem id={8} />
      </AnimatePresence>
      <AnimatePresence>
        <StudentItem id={5} />
      </AnimatePresence>
      <AnimatePresence>
        <StudentItem id={2} />
      </AnimatePresence>
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full md:inline hidden" />

      <img src="/assets/blank.png" className="w-full md:inline hidden" />
      <img src="/assets/blank.png" className="w-full" />
      <AnimatePresence>
        <StudentItem id={9} />
      </AnimatePresence>
      <AnimatePresence>
        <StudentItem id={6} />
      </AnimatePresence>
      <AnimatePresence>
        <StudentItem id={3} />
      </AnimatePresence>
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full md:inline hidden" />
    </div>
  );
}
