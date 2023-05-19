import { BuffList, Student } from "@/constants/types";
import { initialStudents } from "@/constants/values";
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
  reset: Function;
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
  reset: () => {},
});

const getGrade = (num: number) => {
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
  const [students, setStudents] = useState<Student[]>(initialStudents);
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

  const reset = () => {
    setStudents(initialStudents);
    setEnding({ gpa: [], sat: [], specialist: [] });
    setMonth(3);
    setWindows([]);
  };

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
        reset,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsContextProvider;

export const useStudentsContext = () => useContext(StudentsContext);
