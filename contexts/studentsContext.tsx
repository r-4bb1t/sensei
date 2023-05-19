import { BuffList, Student } from "@/constants/types";
import { WindowProps, WindowType } from "@/constants/window";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface StudentsContextProps {
  students: Student[];
  setStudents: Dispatch<SetStateAction<Student[]>>;
  windows: WindowProps[];
  setWindows: Dispatch<SetStateAction<WindowProps[]>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  ending: { gpa: number[]; sat: number[]; specialist: number[] };
  setEnding: Dispatch<
    SetStateAction<{ gpa: number[]; sat: number[]; specialist: number[] }>
  >;
}

const StudentsContext = createContext<StudentsContextProps>({
  students: [],
  setStudents: () => {},
  windows: [],
  setWindows: () => {},
  month: 3,
  setMonth: () => {},
  ending: { gpa: [], sat: [], specialist: [] },
  setEnding: () => {},
});

const getGrade = (num: number) => {
  /* - [gpa 10] => [중간고사, 기말고사 A+] -1~0gpa
- [gpa 8~9] => [중간고사, 기말고사 A0] -2~+1gpa
- [gpa 5~7] => [중간고사, 기말고사 B+] -2~+1gpa
- [gpa ~4] => [중간고사, 기말고사 C+] -2~+1gpa

- [sat 10] => [3모의, 9모의 A+] -1~0sat
- [sat 8~9] => [3모의, 9모의 A0] -2~+1gpa
- [sat 5~7] => [3모의, 9모의 B+] -2~+1gpa
- [sat ~4] => [3모의, 9모의 C+] -2~+1gpa */
  num += Math.random() * 3 - 2;

  if (num >= 10) return "A+";
  else if (num >= 8) return "A";
  else if (num >= 5) return "B+";
  else return "C+";
};

const getBuff = (
  type: "gpa" | "sat",
  num: number,
  grade: string,
  month: number
) => {
  if (type == "gpa") {
    if (grade == "A+") {
      return [{ ...BuffList.goodSchoolExam, grade: 3, month }];
    } else if (grade == "A") {
      if (num < 8) {
        return [{ ...BuffList.goodSchoolExam, grade: 3, month }];
      }
    } else if (grade == "B+") {
      if (num > 8) {
        return [{ ...BuffList.badSchoolExam, grade: 3, month }];
      } else if (num < 4) {
        return [{ ...BuffList.goodSchoolExam, grade: 3, month }];
      }
    }
  } else {
    if (grade == "A+") {
      return [{ ...BuffList.goodMockExam, grade: 3, month }];
    } else if (grade == "A") {
      if (num < 8) {
        return [{ ...BuffList.goodMockExam, grade: 3, month }];
      }
    } else if (grade == "B+") {
      if (num > 8) {
        return [{ ...BuffList.badMockExam, grade: 3, month }];
      } else if (num < 4) {
        return [{ ...BuffList.goodMockExam, grade: 3, month }];
      }
    }
  }

  return [];
};

const StudentsContextProvider = ({ children }: { children: ReactNode }) => {
  const [month, setMonth] = useState(3);
  const [ending, setEnding] = useState<{
    gpa: number[];
    sat: number[];
    specialist: number[];
  }>({ gpa: [], sat: [], specialist: [] });
  const [windows, setWindows] = useState<WindowProps[]>([]);
  const [students, setStudents] = useState<Student[]>([
    {
      index: 1,
      name: "강태웅",
      gpa: 6,
      sat: 7,
      attitude: 8,
      hp: 10,
      morale: 3,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 2,
      name: "김채린",
      gpa: 1,
      sat: 1,
      attitude: 1,
      hp: 10,
      morale: 10,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 3,
      name: "김현채",
      gpa: 1,
      sat: 7,
      attitude: 5,
      hp: 10,
      morale: 3,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 4,
      name: "나마로",
      gpa: 1,
      sat: 1,
      attitude: 1,
      hp: 10,
      morale: 10,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 5,
      name: "남영우",
      gpa: 7,
      sat: 5,
      attitude: 9,
      hp: 10,
      morale: 8,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 6,
      name: "송상화",
      gpa: 7,
      sat: 5,
      attitude: 6,
      hp: 10,
      morale: 7,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 7,
      name: "은가은",
      gpa: 4,
      sat: 9,
      attitude: 3,
      hp: 10,
      morale: 4,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 8,
      name: "양제현",
      gpa: 7,
      sat: 1,
      attitude: 5,
      hp: 10,
      morale: 7,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
    {
      index: 9,
      name: "홍준영",
      gpa: 7,
      sat: 7,
      attitude: 1,
      hp: 10,
      morale: 10,
      buffs: [],
      grade: [],
      lastHomework: 0,
    },
  ]);
  useEffect(() => {
    if (month == 4 || month == 6 || month == 10) {
      setStudents((students) =>
        students.map((student) => {
          return {
            ...student,
            buffs: [
              ...student.buffs,
              { ...BuffList.examPeriod, grade: 3, month: month },
            ],
          };
        })
      );
    } else {
      setStudents((students) =>
        students.map((student) => {
          return {
            ...student,
            buffs: student.buffs.filter((buffs) => buffs.name !== "시험 기간"),
          };
        })
      );
    } // 시험기간

    if (month == 5 || month == 7 || month === 11) {
      setStudents((students) =>
        students.map((student) => {
          const grade = getGrade(student.gpa);
          return {
            ...student,
            grade: [...student.grade, grade],
            buffs: [
              ...student.buffs,
              ...getBuff("gpa", student.gpa, grade, month),
            ],
          };
        })
      );
    } // 시험성적

    if (month == 4 || month == 10 || month == 12) {
      setStudents((students) =>
        students.map((student) => {
          const grade = getGrade(student.sat);
          return {
            ...student,
            grade: [...student.grade, grade],
            buffs: [
              ...student.buffs,
              ...getBuff("sat", student.sat, grade, month),
            ],
          };
        })
      );
    } // 모고성적

    if (month == 13) {
      setWindows((windows) => [
        ...windows.filter((window) => window.type !== WindowType.homework),
        {
          type: WindowType.ending,
          top: 200,
          left: 200,
          id: new Date().toString() + Math.random().toString(),
        },
      ]);

      setEnding({
        gpa: students
          .filter((student) => student.gpa >= 8 && student.gpa >= 6)
          .map((student) => student.index),
        sat: students
          .filter(
            (student) => student.grade[5] == "A" || student.grade[5] == "A+"
          )
          .map((student) => student.index),
        specialist: students
          .filter((student) => student.gpa >= 5 && student.attitude >= 8)
          .map((student) => student.index),
      });
    }
  }, [month]);

  return (
    <StudentsContext.Provider
      value={{
        students,
        setStudents,
        windows,
        setWindows,
        month,
        setMonth,
        ending,
        setEnding,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsContextProvider;

export const useStudentsContext = () => useContext(StudentsContext);
