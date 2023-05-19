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
  const { students, month } = useStudentsContext();
  return (
    <>
      <div className="window-pane pointer-events-none h-full break-all">
        <table className="w-full">
          <thead className="border-b-2 border-b-black font-bold">
            <tr>
              <td className="w-16 text-center">번호</td>
              <td className="w-20 whitespace-nowrap">이름</td>
              <td className="w-48">상태</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr
                className="pointer-events-auto cursor-pointer group hover:bg-black hover:text-white"
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
                <td className="text-center h-10">{student.index}</td>
                <td className="">{student.name}</td>
                <td>
                  <div className="w-full flex flex-wrap gap-2">
                    {student.buffs
                      .filter((buff) => buff.month + buff.duration >= month)
                      .map((buff, i) => (
                        <div
                          className="tooltip text-sm border-2 group-hover:bg-white group-hover:text-black border-black px-1 py-0.5 text-white bg-black rounded"
                          key={i}
                          data-tip={buff.description
                            .replace("%grade", `${buff.grade}`)
                            .replace("%month", `${buff.month}`)}
                        >
                          {buff.name}
                        </div>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
