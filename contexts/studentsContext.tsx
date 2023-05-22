import Ending from "@/components/Windows/Ending";
import { MESSAGE, MessageType, Student } from "@/constants/types";
import { BuffList } from "@/constants/values";
import { initialStudents } from "@/constants/values";
import { WindowProps, WindowType } from "@/constants/window";
import { getRandomPhoneMessage } from "@/utils/getRandomMessage";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAlert } from "./alertsContext";

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
  mobileTab: WindowType;
  setMobileTab: Dispatch<SetStateAction<WindowType>>;
  isMobile: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  addMessage: (index: number, messages: string[]) => void;
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
  mobileTab: WindowType.cctv,
  setMobileTab: () => {},
  isMobile: false,
  loading: false,
  setLoading: () => {},
  messages: [],
  setMessages: () => {},
  addMessage: () => {},
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
  const [windows, setWindows] = useState<WindowProps[]>([]);
  const [mobileTab, setMobileTab] = useState<WindowType>(WindowType.cctv);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  const [month, setMonth] = useState(3);
  const [ending, setEnding] = useState<{
    gpa: number[];
    sat: number[];
    specialist: number[];
  }>({ gpa: [], sat: [], specialist: [] });
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { push } = useAlert();

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    });
  }, []);

  const addMessage = (studentId: number, newMessages: string[]) => {
    const Promises = newMessages.map(
      (message) =>
        new Promise<void>((resolve, rej) => {
          setTimeout(() => {
            push({ studentId, name: students[studentId - 1].name, message });
            setMessages((messages) => [
              ...messages,
              { student: studentId, message },
            ]);
            resolve();
          }, Math.random() * 1000 + 50);
        })
    );
    Promise.all(Promises);
  };

  useEffect(() => {
    setStudents((students) =>
      students.map((student) => {
        return {
          ...student,
          buffs:
            student.morale < 5
              ? [...student.buffs, { ...BuffList.lowMorale, month, grade: 3 }]
              : student.buffs,
        };
      })
    );

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
      const grade = students.map((student) => {
        const g = getGrade(student.gpa);
        const bn = getBuff("gpa", student.gpa, g, month - 1).pop()?.name;
        if (bn === BuffList.goodSchoolExam.name)
          addMessage(
            student.index,
            getRandomPhoneMessage(student, MESSAGE.goodSchoolExam)
          );
        else if (bn === BuffList.badSchoolExam.name)
          addMessage(
            student.index,
            getRandomPhoneMessage(student, MESSAGE.badSchoolExam)
          );
        return g;
      });
      setStudents((students) =>
        students.map((student, i) => {
          return {
            ...student,
            grade: [...student.grade, grade[i]],
            buffs: [
              ...student.buffs,
              ...getBuff("gpa", student.gpa, grade[i], month - 1),
            ],
          };
        })
      );
    } // 시험성적

    if (month == 4 || month == 10 || month == 12) {
      const grade = students.map((student) => {
        const g = getGrade(student.gpa);
        const bn = getBuff("sat", student.sat, g, month - 1).pop()?.name;
        if (bn === BuffList.goodMockExam.name)
          addMessage(
            student.index,
            getRandomPhoneMessage(student, MESSAGE.goodMockExam)
          );
        else if (bn === BuffList.badMockExam.name)
          addMessage(
            student.index,
            getRandomPhoneMessage(student, MESSAGE.badMockExam)
          );
        return g;
      });
      setStudents((students) =>
        students.map((student, i) => {
          return {
            ...student,
            grade: [...student.grade, grade[i]],
            buffs: [
              ...student.buffs,
              ...getBuff("sat", student.sat, grade[i], month - 1),
            ],
          };
        })
      );
    } // 모평성적

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
    } else if (
      windows.filter((w) => w.type === WindowType.homework).length == 0
    )
      setWindows((windows) => [
        ...windows,
        {
          type: WindowType.homework,
          top: 160,
          left: 300,
          id: new Date().toString() + Math.random().toString(),
        },
      ]);
  }, [month]);

  const reset = () => {
    setStudents(initialStudents);
    setEnding({ gpa: [], sat: [], specialist: [] });
    setMonth(3);
    setWindows([]);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(
        () => {
          setLoading(false);
          setMonth((month) => month + 1);
        },
        process.env.NODE_ENV === "development" ? 1000 : 5000
      );

      students.forEach((student) => {
        if (student.hp == 0)
          addMessage(
            student.index,
            getRandomPhoneMessage(student, MESSAGE.retire)
          );
      });
    }
  }, [loading]);

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
        mobileTab,
        setMobileTab,
        isMobile,
        loading,
        setLoading,
        messages,
        setMessages,
        addMessage,
      }}
    >
      {children}
      <AnimatePresence>
        {month == 13 && (
          <motion.div
            className="fixed w-full h-full inset-0 bg-white md:hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.2 } }}
          >
            <Ending />
          </motion.div>
        )}
      </AnimatePresence>
    </StudentsContext.Provider>
  );
};

export default StudentsContextProvider;

export const useStudentsContext = () => useContext(StudentsContext);
