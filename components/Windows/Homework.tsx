import { useStudentsContext } from "@/contexts/studentsContext";
import Student from "./Student";
import { useEffect, useRef, useState } from "react";
import cc from "classcat";
import { BuffList, homework } from "@/constants/values";
import BuffBadge from "../BuffBadge";

export default function Homework() {
  const [selected, setSelected] = useState(1);
  const { students, setStudents, month, loading, setLoading } =
    useStudentsContext();
  const [selectedHw, setSelectedHw] = useState(students[0].lastHomework);
  const [homeworks, setHomeworks] = useState(
    students.map((student) => homework[student.lastHomework])
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  const getAll = (
    index: number,
    key: "gpa" | "sat" | "attitude" | "morale" | "hp"
  ) => {
    let val =
      (homeworks[index].stat[key] ?? 0) *
      (homeworks[index].month[month]
        ? homeworks[index].month[month][key] ?? 1
        : 1);
    return (
      val +
      students[index].buffs.reduce((r, buff) => {
        return (
          r + (buff.duration + buff.month >= month ? buff.effect[key] ?? 0 : 0)
        );
      }, 0)
    );
  };

  useEffect(() => {
    setSelectedHw(homeworks[selected - 1].index);
  }, [selected, homeworks]);

  useEffect(() => {
    if (!selectRef.current) return;
    selectRef.current!.value = `${selectedHw}`;
  }, [selectedHw]);

  return month < 13 ? (
    <>
      <div className="w-full py-2 px-4 overflow-y-auto h-full pointer-events-auto pb-32 md:pb-2">
        <div className="grid grid-cols-5 h-30 gap-2">
          {[...Array(9)].map((_, i) => (
            <button
              className={cc([
                "hover:bg-[rgba(0,0,0,0.2)] p-1 border-2 border-transparent",
                selected == i + 1 && "!border-black",
                students[i].hp == 0 && "opacity-25",
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
          {students[selected - 1].name} 학생의 {month}월 숙제
        </div>
        <div className="relative">
          {loading ? (
            <div className="w-full h-full absolute flex items-center justify-center text-lg font-bold">
              <div className="animate-bounce">숙제 중...</div>
            </div>
          ) : (
            students[selected - 1].hp == 0 && (
              <div className="w-full h-full absolute flex items-center justify-center text-lg font-bold">
                병결
              </div>
            )
          )}
          <div
            className={cc([
              (students[selected - 1].hp == 0 || loading) &&
                "opacity-25 pointer-events-none",
            ])}
          >
            <select
              className="w-full px-2 font-bold mt-2 border-2 border-black py-1"
              ref={selectRef}
              onChange={(e) =>
                setHomeworks((homeworks) =>
                  homeworks.map((hw, i) => {
                    if (i === selected - 1)
                      return homework[parseInt(e.target.value)];
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
                    getAll(selected - 1, "gpa") > 0 &&
                      "text-green-600 font-bold",
                    getAll(selected - 1, "gpa") < 0 && "text-red-600 font-bold",
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
                      getAll(selected - 1, "gpa") < 0 &&
                        "!bg-red-700 -translate-x-full absolute",
                    ])}
                    style={{
                      width: `${
                        Math.abs(getAll(selected - 1, "gpa") ?? 0) * 10
                      }%`,
                      left: `${students[selected - 1].gpa * 10}%`,
                    }}
                  ></div>
                </div>
                <div
                  className={cc([
                    "text-right",
                    getAll(selected - 1, "sat") > 0 &&
                      "text-green-600 font-bold",
                    getAll(selected - 1, "sat") < 0 && "text-red-600 font-bold",
                  ])}
                >
                  모평
                </div>
                <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${students[selected - 1].sat * 10}%` }}
                  ></div>
                  <div
                    className={cc([
                      "h-full bg-green-400 opacity-50",
                      getAll(selected - 1, "sat") < 0 &&
                        "!bg-red-700 -translate-x-full absolute",
                    ])}
                    style={{
                      width: `${Math.abs(getAll(selected - 1, "sat")) * 10}%`,
                      left: `${students[selected - 1].sat * 10}%`,
                    }}
                  ></div>
                </div>
                <div
                  className={cc([
                    "text-right",
                    getAll(selected - 1, "attitude") > 0 &&
                      "text-green-600 font-bold",
                    getAll(selected - 1, "attitude") < 0 &&
                      "text-red-600 font-bold",
                  ])}
                >
                  태도
                </div>
                <div className="w-full border-2 border-black h-4 flex relative overflow-hidden">
                  <div
                    className="h-full bg-blue-400"
                    style={{
                      width: `${students[selected - 1].attitude * 10}%`,
                    }}
                  ></div>
                  <div
                    className={cc([
                      "h-full bg-blue-400 opacity-50",
                      getAll(selected - 1, "attitude") < 0 &&
                        "!bg-red-700 -translate-x-full absolute",
                    ])}
                    style={{
                      width: `${Math.abs(
                        getAll(selected - 1, "attitude") * 10
                      )}%`,
                      left: `${students[selected - 1].attitude * 10}%`,
                    }}
                  ></div>
                </div>

                <div
                  className={cc([
                    "text-right",
                    getAll(selected - 1, "morale") > 0 &&
                      "text-green-600 font-bold",
                    getAll(selected - 1, "morale") < 0 &&
                      "text-red-600 font-bold",
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
                      getAll(selected - 1, "morale") < 0 &&
                        "!bg-red-700 -translate-x-full absolute",
                    ])}
                    style={{
                      width: `${
                        Math.abs(getAll(selected - 1, "morale")) * 10
                      }%`,
                      left: `${students[selected - 1].morale * 10}%`,
                    }}
                  ></div>
                </div>
                <div
                  className={cc([
                    "text-right",
                    getAll(selected - 1, "hp") > 0 &&
                      "text-green-600 font-bold",
                    getAll(selected - 1, "hp") < 0 && "text-red-600 font-bold",
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
                      getAll(selected - 1, "hp") < 0 &&
                        "!bg-red-700 absolute -translate-x-full",
                    ])}
                    style={{
                      width: `${Math.abs(getAll(selected - 1, "hp")) * 10}%`,
                      left: `${students[selected - 1].hp * 10}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-full flex flex-wrap mt-2 gap-2">
                {students[selected - 1].buffs
                  .filter((buff) => buff.month + buff.duration >= month)
                  .map((buff, i) => (
                    <BuffBadge buff={buff} key={i} hideDisabled />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-1 text-lg hover:bg-black hover:text-white border-black border-2 disabled:bg-black-500 disabled:border-black-500 disabled:text-white"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              setStudents((students) =>
                students.map((student, i) => {
                  if (student.hp > 0)
                    return {
                      ...student,
                      gpa: Math.max(
                        Math.min(student.gpa + getAll(i, "gpa"), 10),
                        0
                      ),
                      sat: Math.max(
                        Math.min(student.sat + getAll(i, "sat"), 10),
                        0
                      ),
                      attitude: Math.max(
                        Math.min(student.attitude + getAll(i, "attitude"), 10),
                        0
                      ),
                      morale: Math.max(
                        Math.min(
                          student.morale + (getAll(i, "morale") ?? 0),
                          10
                        ),
                        0
                      ),
                      hp: Math.max(
                        Math.min(student.hp + (getAll(i, "hp") ?? 0), 10),
                        0
                      ),
                    };
                  else
                    return {
                      ...student,
                      hp: 3,
                      buffs: [
                        ...student.buffs,
                        { ...BuffList.recovery, grade: 3, month },
                      ],
                    };
                })
              );
            }}
          >
            이번 달 숙제 확정
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full md:h-12 h-full flex items-center justify-center text-center pb-32">
      학생들의 졸업을 축하합니다!
      <br />
      이제 숙제는 없어요.
    </div>
  );
}
