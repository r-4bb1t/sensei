import { WindowProps, WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import { Dispatch, SetStateAction } from "react";
import BuffBadge from "./BuffBadge";

export default function StudentList({ w }: { w?: WindowProps }) {
  const { students, month, setWindows } = useStudentsContext();
  return (
    <>
      <div className="md:window-pane pointer-events-none h-full break-all bg-white">
        <table className="w-full">
          <thead className="border-b-2 border-b-black font-bold">
            <tr>
              <td className="md:w-12 w-8 text-center">번호</td>
              <td className="w-16 text-center">사진</td>
              <td className="w-20 whitespace-nowrap">이름</td>
              <td className="md:table-cell hidden w-48">상태</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr
                className="pointer-events-auto cursor-pointer group hover:bg-black hover:text-white"
                onClick={() => {
                  if (w)
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
                <td className="">
                  <div className="md:h-10 h-16 flex items-center justify-center pt-2">
                    <img
                      src={`/assets/students/front_${student.index}.png`}
                      className="md:w-8 md:h-8 h-12 w-12"
                    />
                  </div>
                </td>
                <td className="">{student.name}</td>
                <td className="md:table-cell hidden">
                  <div className="w-full flex flex-wrap gap-2">
                    {student.buffs.length === 0 && "-"}
                    {student.buffs
                      .filter((buff) => buff.month + buff.duration >= month)
                      .map((buff, i) => (
                        <BuffBadge buff={buff} hideDisabled key={i} />
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
