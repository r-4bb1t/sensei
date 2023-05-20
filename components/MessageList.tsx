import { WindowProps, WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import { Dispatch, SetStateAction } from "react";

export default function MessageList({ w }: { w?: WindowProps }) {
  const { setWindows } = useStudentsContext();
  return (
    <div className="flex flex-col md:h-96 h-screen">
      {[1, 2, 3].map((_, i) => (
        <div
          className="cursor-pointer group hover:bg-black hover:text-white flex border-b-2 border-b-black items-center"
          key={i}
          onClick={() => {
            /* if (w)
              setWindows((ww) => [
                ...ww,
                {
                  type: WindowType.message,
                  id: `${student.index}` + Math.random().toString(),
                  index: student.index,
                  top: (w.top + 50) % window.innerHeight,
                  left: (w.left + 50) % window.innerWidth,
                  data: {
                    id: student.index,
                  },
                },
              ]); */
          }}
        >
          <div className="h-14 w-14 flex items-center justify-center px-2 pt-3 pb-1">
            <img
              src={`/assets/students/front_1.png`}
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="text-sm">김현채</div>
            <div>선생님!@</div>
          </div>
        </div>
      ))}
    </div>
  );
}
