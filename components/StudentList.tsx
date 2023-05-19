import { WindowProps, WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import { Dispatch, SetStateAction } from "react";

export default function StudentList({
  w,
  setWindows,
}: {
  w: WindowProps;
  setWindows: Dispatch<SetStateAction<WindowProps[]>>;
}) {
  const { students } = useStudentsContext();
  return (
    <>
      <div className="window-pane pointer-events-none h-full break-all">
        <table className="w-full">
          <thead className="border-b-2 border-b-black">
            <tr>
              <td className="w-16 text-center">번호</td>
              <td className="whitespace-nowrap">이름</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr
                className="pointer-events-auto hover:bg-black hover:text-white"
                onClick={() => {
                  setWindows((ww) => [
                    ...ww,
                    {
                      type: WindowType.student,
                      id: `${student.index}` + Math.random().toString(),
                      index: student.index,
                      top: (w.top + 50) % window.innerHeight,
                      left: (w.left + 50) % window.innerWidth,
                      data: {
                        id: student.index,
                      },
                    },
                  ]);
                }}
                key={i}
              >
                <td className="text-center">{student.index}</td>
                <td className="">{student.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
