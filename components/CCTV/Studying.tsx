import { useStudentsContext } from "@/contexts/studentsContext";
import StudentItem from "./StudentItem";

export default function Studying({ size }: { size: number }) {
  const { students } = useStudentsContext();
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
      <StudentItem id={7} />
      <StudentItem id={4} />
      <StudentItem id={1} />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <StudentItem id={8} />
      <StudentItem id={5} />
      <StudentItem id={2} />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <StudentItem id={9} />
      <StudentItem id={6} />
      <StudentItem id={3} />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
      <img src="/assets/blank.png" className="w-full" />
    </div>
  );
}
