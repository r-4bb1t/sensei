import { Student } from "@/constants/types";
import { WindowProps } from "@/constants/window";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface StudentsContextProps {
  students: Student[];
  setStudents: Dispatch<SetStateAction<Student[]>>;
  windows: WindowProps[];
  setWindows: Dispatch<SetStateAction<WindowProps[]>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
}

const StudentsContext = createContext<StudentsContextProps>({
  students: [],
  setStudents: () => {},
  windows: [],
  setWindows: () => {},
  month: 3,
  setMonth: () => {},
});

const StudentsContextProvider = ({ children }: { children: ReactNode }) => {
  const [month, setMonth] = useState(3);
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
      lastHomework: 0,
    },
  ]);
  return (
    <StudentsContext.Provider
      value={{ students, setStudents, windows, setWindows, month, setMonth }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsContextProvider;

export const useStudentsContext = () => useContext(StudentsContext);
