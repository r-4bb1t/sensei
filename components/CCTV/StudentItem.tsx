import { WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";

export default function StudentItem({ id }: { id: number }) {
  const { students, windows, setWindows } = useStudentsContext();
  const student = students[id - 1];
  return (
    <div className="tooltip w-full" data-tip={students[id - 1].name}>
      <button
        className="pointer-events-auto w-full"
        onClick={(e) => {
          setWindows((ww) => [
            ...ww,
            {
              type: WindowType.student,
              id: `${student.index}` + Math.random().toString(),
              index: student.index,
              top: e.clientY + Math.random() * 50,
              left: e.clientX + +Math.random() * 50,
              data: {
                id: student.index,
              },
            },
          ]);
        }}
      >
        <img
          src={`/assets/students/${id}.png`}
          className="w-full animate-study origin-bottom"
        />
      </button>
    </div>
  );
}
