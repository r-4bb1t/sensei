import { useStudentsContext } from "@/contexts/studentsContext";
import Grade from "./Grade";
import { useEffect, useState } from "react";
import cc from "classcat";

export default function Student({ id = 1 }: { id?: number }) {
  const [rId, setRId] = useState(id);
  const { students, month } = useStudentsContext();
  const [student, setStudent] = useState(students[id - 1]);

  useEffect(() => {
    setStudent(students[rId - 1]);
  }, [rId, students]);

  return (
    <div className="w-full flex flex-col items-center pb-4">
      <div className="grid grid-cols-[32px_200px_32px] font-bold">
        <button onClick={() => setRId((rId) => ((rId + 7) % 9) + 1)}>
          {"<"}
        </button>
        <div className="text-lg font-bold text-center w-full my-1">
          {rId}번 {student.name}
        </div>
        <button onClick={() => setRId((rId) => (rId % 9) + 1)}>{">"}</button>
      </div>
      <div className="w-full flex justify-center h-24 mb-2">
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
      <div className="px-4 mt-2 flex flex-wrap w-full gap-2">
        {student.buffs.map((buff, i) => (
          <div
            className={cc([
              "tooltip text-sm border-2 border-black px-1 py-0.5 text-white bg-black rounded",
              buff.month + buff.duration < month && "!opacity-50",
            ])}
            key={i}
            data-tip={buff.description
              .replace("%grade", `${buff.grade}`)
              .replace("%month", `${buff.month}`)}
          >
            {buff.name}
          </div>
        ))}
      </div>

      <div className="mt-2 font-bold">역대 성적</div>
      <table className="table grade-table collapse table-fixed text-center mx-2 mt-2">
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
      </table>
    </div>
  );
}
