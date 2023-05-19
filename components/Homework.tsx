import { useStudentsContext } from "@/contexts/studentsContext";
import Student from "./Student";
import { useEffect, useRef, useState } from "react";
import cc from "classcat";
import { homework } from "@/constants/types";

export default function Homework() {
  const [selected, setSelected] = useState(1);
  const { students, setStudents, setMonth } = useStudentsContext();
  const [selectedHw, setSelectedHw] = useState(students[0].lastHomework);
  const [homeworks, setHomeworks] = useState(
    students.map((student) => homework[student.lastHomework])
  );
  const selectRef = useRef<HTMLSelectElement>(null);

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
              homework[selectedHw].stat.gpa &&
                homework[selectedHw].stat.gpa! > 0 &&
                "text-green-600 font-bold",
              homework[selectedHw].stat.gpa &&
                homework[selectedHw].stat.gpa! < 0 &&
                "text-red-600 font-bold",
            ])}
          >
            내신
          </div>
          <div className="w-full border-2 border-black h-4 flex relative">
            <div
              className="h-full bg-yellow-400"
              style={{ width: `${students[selected - 1].gpa * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-yellow-400 opacity-50",
                homework[selectedHw].stat.gpa &&
                  homework[selectedHw].stat.gpa! < 0 &&
                  "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${Math.abs(homework[selectedHw].stat.gpa ?? 0) * 10}%`,
                left: `${students[selected - 1].gpa * 10}%`,
              }}
            ></div>
          </div>
          <div
            className={cc([
              "text-right",
              homework[selectedHw].stat.sat &&
                homework[selectedHw].stat.sat! > 0 &&
                "text-green-600 font-bold",
              homework[selectedHw].stat.sat &&
                homework[selectedHw].stat.sat! < 0 &&
                "text-red-600 font-bold",
            ])}
          >
            모고
          </div>
          <div className="w-full border-2 border-black h-4 flex relative">
            <div
              className="h-full bg-green-400"
              style={{ width: `${students[selected - 1].sat * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-green-400 opacity-50",
                homework[selectedHw].stat.sat &&
                  homework[selectedHw].stat.sat! < 0 &&
                  "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${Math.abs(homework[selectedHw].stat.sat ?? 0) * 10}%`,
                left: `${students[selected - 1].sat * 10}%`,
              }}
            ></div>
          </div>
          <div
            className={cc([
              "text-right",
              homework[selectedHw].stat.attitude &&
                homework[selectedHw].stat.attitude! > 0 &&
                "text-green-600 font-bold",
              homework[selectedHw].stat.attitude &&
                homework[selectedHw].stat.attitude! < 0 &&
                "text-red-600 font-bold",
            ])}
          >
            태도
          </div>
          <div className="w-full border-2 border-black h-4 flex relative">
            <div
              className="h-full bg-blue-400"
              style={{ width: `${students[selected - 1].attitude * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-blue-400 opacity-50",
                homework[selectedHw].stat.attitude &&
                  homework[selectedHw].stat.attitude! < 0 &&
                  "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${
                  Math.abs(homework[selectedHw].stat.attitude ?? 0) * 10
                }%`,
                left: `${students[selected - 1].attitude * 10}%`,
              }}
            ></div>
          </div>

          <div
            className={cc([
              "text-right",
              homework[selectedHw].stat.morale &&
                homework[selectedHw].stat.morale! > 0 &&
                "text-green-600 font-bold",
              homework[selectedHw].stat.morale &&
                homework[selectedHw].stat.morale! < 0 &&
                "text-red-600 font-bold",
            ])}
          >
            의욕
          </div>
          <div className="w-full border-2 border-black h-4 flex relative">
            <div
              className="h-full bg-zinc-400"
              style={{ width: `${students[selected - 1].morale * 10}%` }}
            ></div>
            <div
              className={cc([
                "h-full bg-zinc-400 opacity-50",
                homework[selectedHw].stat.morale &&
                  homework[selectedHw].stat.morale! < 0 &&
                  "!bg-red-700 -translate-x-full absolute",
              ])}
              style={{
                width: `${
                  Math.abs(homework[selectedHw].stat.morale ?? 0) * 10
                }%`,
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
          <div className="w-full border-2 border-black h-4 flex relative">
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
                width: `${Math.abs(homework[selectedHw].stat.hp ?? 0) * 10}%`,
                left: `${students[selected - 1].hp * 10}%`,
              }}
            ></div>
          </div>
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
                  gpa: Math.max(
                    Math.min(student.gpa + (homeworks[i].stat.gpa ?? 0), 10),
                    0
                  ),
                  sat: Math.max(
                    Math.min(student.sat + (homeworks[i].stat.sat ?? 0), 10),
                    0
                  ),
                  attitude: Math.max(
                    Math.min(
                      student.attitude + (homeworks[i].stat.attitude ?? 0),
                      10
                    ),
                    0
                  ),
                  morale: Math.max(
                    Math.min(
                      student.morale + (homeworks[i].stat.morale ?? 0),
                      10
                    ),
                    0
                  ),
                  hp: Math.min(student.hp + (homeworks[i].stat.hp ?? 0), 10),
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
