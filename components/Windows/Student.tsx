import { useStudentsContext } from "@/contexts/studentsContext";
import Grade from "../Grade";
import { useEffect, useState } from "react";
import cc from "classcat";
import BuffBadge from "../BuffBadge";

export default function Student({ id = 1 }: { id?: number }) {
  const [rId, setRId] = useState(id);
  const { students, ending, month } = useStudentsContext();
  const [student, setStudent] = useState(students[id - 1]);

  useEffect(() => {
    setStudent(students[rId - 1]);
  }, [rId, students]);

  return (
    <div className="w-full flex flex-col items-center md:pb-8 pb-48 overflow-y-auto">
      <div className="grid grid-cols-[32px_200px_32px] font-bold">
        <button onClick={() => setRId((rId) => ((rId + 7) % 9) + 1)}>
          {"<"}
        </button>
        <div className="text-lg font-bold text-center w-full my-1">
          {rId}번 {student.name}
        </div>
        <button onClick={() => setRId((rId) => (rId % 9) + 1)}>{">"}</button>
      </div>
      <div className="w-full relative flex justify-center h-24 mb-2 shrink-0">
        <img src="/assets/items/desk1.png" className="w-24 absolute" />
        <img
          src={`/assets/students/${rId}.png`}
          className="w-24 absolute animate-study-big origin-bottom"
        />
      </div>

      <div className="grid grid-cols-[64px_1fr] gap-x-2 gap-y-1 w-52 pr-4 items-center">
        <div className="text-right">내신</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${student.gpa * 10}%` }}
          ></div>
        </div>
        <div className="text-right">모의고사</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-green-400"
            style={{ width: `${student.sat * 10}%` }}
          ></div>
        </div>
        <div className="text-right">태도</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-blue-400"
            style={{ width: `${student.attitude * 10}%` }}
          ></div>
        </div>

        <div className="text-right mt-4">의욕</div>
        <div className="w-full border-2 border-black h-4 mt-4">
          <div
            className="h-full bg-zinc-400"
            style={{ width: `${student.morale * 10}%` }}
          ></div>
        </div>
        <div className="text-right">체력</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-red-400"
            style={{ width: `${student.hp * 10}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-2 font-bold">역대 버프 목록</div>
      <div className="px-4 mt-2 flex flex-wrap w-full gap-2 justify-center">
        {student.buffs
          .filter((buff) => buff.display)
          .map((buff, i) => (
            <BuffBadge buff={buff} key={i} />
          ))}
      </div>

      <div className="mt-4 font-bold">성적표</div>
      <table className="table grade-table collapse table-fixed text-center mx-2 mt-2">
        <tbody>
          <tr>
            <th>3월 모의고사</th>
            <th>1학기 중간</th>
            <th>1학기 기말</th>
          </tr>
          <tr>
            <td className="h-6">
              <Grade grade={student.grade[0]} />
            </td>
            <td>
              <Grade grade={student.grade[1]} />
            </td>
            <td>
              <Grade grade={student.grade[2]} />
            </td>
          </tr>
          <tr>
            <th>9월 모의고사</th>
            <th>2학기 중간</th>
            <th>수능</th>
          </tr>
          <tr>
            <td className="h-6">
              <Grade grade={student.grade[3]} />
            </td>
            <td>
              <Grade grade={student.grade[4]} />
            </td>
            <td>
              <Grade grade={student.grade[5]} />
            </td>
          </tr>
        </tbody>
      </table>

      {month == 13 && (
        <>
          <div className="mt-4 font-bold mb-2">엔딩</div>
          <div className="flex items-center gap-2">
            {ending.gpa.includes(rId) && (
              <div className="px-2 py-1 rounded bg-black text-white">
                수시 합격
              </div>
            )}
            {ending.sat.includes(rId) && (
              <div className="px-2 py-1 rounded bg-black text-white">
                정시 합격
              </div>
            )}
            {ending.specialist.includes(rId) && (
              <div className="px-2 py-1 rounded bg-black text-white">
                특기자 합격
              </div>
            )}
          </div>
          <div className="mt-2 px-4 text-center">
            {student.name} 학생은 {student.ending}
          </div>
        </>
      )}
    </div>
  );
}
