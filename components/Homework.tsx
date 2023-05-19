import { useStudentsContext } from "@/contexts/studentsContext";
import Student from "./Student";
import { useEffect, useRef, useState } from "react";
import cc from "classcat";
import { homework } from "@/constants/types";

export default function Homework() {
  const [selected, setSelected] = useState(1);
  const { students, setStudents, month, setMonth } = useStudentsContext();
  const [selectedHw, setSelectedHw] = useState(students[0].lastHomework);
  const [homeworks, setHomeworks] = useState(
    students.map((student) => homework[student.lastHomework])
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  const getAll = (key: "gpa" | "sat" | "attitude" | "morale" | "hp") => {
    return (
      (homework[selectedHw].stat[key] ?? 0) *
        (homework[selectedHw].month[month]
          ? homework[selectedHw].month[month][key] ?? 1
          : 1) +
      students[selected - 1].buffs.reduce((r, buff) => {
        return (
          r + (buff.duration + buff.month > month ? buff.effect[key] ?? 0 : 0)
        );
      }, 0)
    );
  };

  useEffect(() => {
    setSelectedHw(homeworks[selected - 1].index);
  }, [selected, homeworks]);

  useEffect(() => {
    selectRef.current!.value = `${selectedHw}`;
  }, [selectedHw]);

  return (
    <div className="w-full py-2 px-4">
      <div className="grid grid-cols-5 h-30 gap-2">
        {[...Array(9)].map((_, i) => (
          <button
            className={cc([
              "hover:bg-[rgba(0,0,0,0.2)] p-1 border-2 border-transparent",
              selected == i + 1 && "!border-black",
            ])}
            key={i}
            onClick={() => setSelected(i + 1)}
          >
            <img
              src={`/assets/students/front_${i + 1}.png`}
              className="w-full inset-0"
            />
          </button>
        ))}
      </div>
      <div className="font-bold text-lg text-center">
        {students[selected - 1].name} 학생의 이번 달 숙제
      </div>
      <select
        className="w-full px-2 font-bold mt-2"
        ref={selectRef}
        onChange={(e) =>
          setHomeworks((homeworks) =>
            homeworks.map((hw, i) => {
              if (i === selected - 1) return homework[parseInt(e.target.value)];
              return hw;
            })
          )
        }
      >
        {homework.map((hw, i) => (
          <option key={i} value={i}>
            {hw.name}
          </option>
        ))}
      </select>
      <div className="border-black border-2 mt-2 px-2 py-1 flex flex-col items-center">
        <div className="w-full text-sm mb-2 h-16">
          {homework[selectedHw].description}
        </div>
        <div className="w-full text-sm mb-2 font-bold">
          {students[selected - 1].name}의 예상 스탯 변화
        </div>

        <div className="grid grid-cols-[48px_1fr_48px_1fr] gap-2 w-full pr-4 items-center">
          <div
            className={cc([
              "text-right",
              getAll("gpa") > 0 && "text-green-600 font-bold",
              getAll("gpa") < 0 && "text-red-600 font-bold",
            ])}
          >
            내신
          </div>
          <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
            <div
              className="h-full bg-yellow-400"
              style={{ width: `${students[selected - 1].gpa * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-yellow-400 opacity-50",
                getAll("gpa") < 0 && "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${Math.abs(getAll("gpa") ?? 0) * 10}%`,
                left: `${students[selected - 1].gpa * 10}%`,
              }}
            ></div>
          </div>
          <div
            className={cc([
              "text-right",
              getAll("sat") > 0 && "text-green-600 font-bold",
              getAll("sat") < 0 && "text-red-600 font-bold",
            ])}
          >
            모고
          </div>
          <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
            <div
              className="h-full bg-green-400"
              style={{ width: `${students[selected - 1].sat * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-green-400 opacity-50",
                getAll("sat") && "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${Math.abs(getAll("sat")) * 10}%`,
                left: `${students[selected - 1].sat * 10}%`,
              }}
            ></div>
          </div>
          <div
            className={cc([
              "text-right",
              getAll("attitude") > 0 && "text-green-600 font-bold",
              getAll("attitude") < 0 && "text-red-600 font-bold",
            ])}
          >
            태도
          </div>
          <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
            <div
              className="h-full bg-blue-400"
              style={{ width: `${students[selected - 1].attitude * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-blue-400 opacity-50",
                getAll("attitude") < 0 &&
                  "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${Math.abs(getAll("attitude") * 10)}%`,
                left: `${students[selected - 1].attitude * 10}%`,
              }}
            ></div>
          </div>

          <div
            className={cc([
              "text-right",
              getAll("morale") > 0 && "text-green-600 font-bold",
              getAll("morale") < 0 && "text-red-600 font-bold",
            ])}
          >
            의욕
          </div>
          <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
            <div
              className="h-full bg-zinc-400"
              style={{ width: `${students[selected - 1].morale * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-zinc-400 opacity-50",
                getAll("morale") < 0 &&
                  "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${Math.abs(getAll("morale")) * 10}%`,
                left: `${students[selected - 1].morale * 10}%`,
              }}
            ></div>
          </div>
          <div
            className={cc([
              "text-right",
              homework[selectedHw].stat.hp &&
                homework[selectedHw].stat.hp! > 0 &&
                "text-green-600 font-bold",
              homework[selectedHw].stat.hp &&
                homework[selectedHw].stat.hp! < 0 &&
                "text-red-600 font-bold",
            ])}
          >
            체력
          </div>
          <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
            <div
              className="h-full bg-red-400"
              style={{ width: `${students[selected - 1].hp * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-red-400 opacity-50",
                homework[selectedHw].stat.hp &&
                  homework[selectedHw].stat.hp! < 0 &&
                  "!bg-red-700 absolute -translate-x-full",
              ])}
              style={{
                width: `${Math.abs(getAll("hp")) * 10}%`,
                left: `${students[selected - 1].hp * 10}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="w-full flex flex-wrap mt-2 gap-2">
          {students[selected - 1].buffs
            .filter((buff) => buff.month + buff.duration >= month)
            .map((buff, i) => (
              <div
                className="tooltip text-sm border-2 border-black px-1 py-0.5 text-white bg-black rounded"
                key={i}
                data-tip={buff.description
                  .replace("%grade", `${buff.grade}`)
                  .replace("%month", `${buff.month}`)}
              >
                {buff.name}
              </div>
            ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          className="px-4 py-1 hover:bg-black hover:text-white border-black border-2"
          onClick={() => {
            setMonth((month) => month + 1);
            setStudents((students) =>
              students.map((student, i) => {
                return {
                  ...student,
                  gpa: Math.max(Math.min(student.gpa + getAll("gpa"), 10), 0),
                  sat: Math.max(Math.min(student.sat + getAll("sat"), 10), 0),
                  attitude: Math.max(
                    Math.min(student.attitude + getAll("attitude"), 10),
                    0
                  ),
                  morale: Math.max(
                    Math.min(student.morale + (getAll("morale") ?? 0), 10),
                    0
                  ),
                  hp: Math.min(student.hp + (getAll("hp") ?? 0), 10),
                };
              })
            );
          }}
        >
          확정
        </button>
      </div>
    </div>
  );
}
