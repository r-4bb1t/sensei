import { WindowProps, WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import BuffBadge from "../BuffBadge";
import { AnimatePresence, motion } from "framer-motion";
import Student from "./Student";
import { useEffect, useState } from "react";
import cc from "classcat";
import Ending from "./Ending";

export default function StudentList({ w }: { w?: WindowProps }) {
  const { students, month, setWindows, isMobile } = useStudentsContext();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEndingOpen, setIsEndingOpen] = useState(false);

  useEffect(() => {
    if (month === 13) setIsEndingOpen(true);
  }, [month]);

  return (
    <>
      <div className="pointer-events-auto overflow-y-auto h-full break-all bg-white md:w-[600px] pb-32 md:pb-2">
        {month == 13 && (
          <div className="md:hidden w-full px-4 py-2 flex items-center justify-center">
            <button
              className="border-2 border-black bg-white px-4 py-2 pointer-events-auto hover:bg-black hover:text-white"
              onClick={() => setIsEndingOpen(true)}
            >
              엔딩 보기
            </button>
          </div>
        )}
        <table className="w-full relative">
          <thead className="border-b-2 border-b-black font-bold sticky top-0 bg-white">
            <tr>
              <td className="md:w-12 w-8 text-center">번호</td>
              <td className="md:w-16 w-8 text-center">사진</td>
              <td className="w-20 whitespace-nowrap">이름</td>
              <td className="md:table-cell hidden w-48">상태</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr
                className={cc([
                  "pointer-events-auto cursor-pointer group hover:bg-black hover:text-white",
                  student.hp === 0 && "opacity-50",
                ])}
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
                  if (isMobile) setSelectedId(i + 1);
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
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.2 } }}
            className="w-full h-full fixed inset-0"
          >
            <div className="w-full h-full pt-32 bg-white overflow-y-auto flex flex-col items-center">
              <Student id={selectedId} />
              <button
                onClick={() => setSelectedId(null)}
                className="fixed bottom-32 text-lg bg-white px-4 py-1 hover:bg-black hover:text-white border-black border-2"
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEndingOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.2 } }}
            className="w-full h-full fixed inset-0 pointer-events-none md:hidden"
          >
            <div className="w-full h-full overflow-y-auto flex flex-col items-center pointer-events-auto">
              <Ending />
              <button
                onClick={() => setIsEndingOpen(false)}
                className="fixed bottom-32 text-lg bg-white px-4 py-1 hover:bg-black hover:text-white border-black border-2"
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
