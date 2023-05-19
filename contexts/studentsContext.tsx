import { Student } from "@/constants/types";
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
}

const StudentsContext = createContext<StudentsContextProps>({
  students: [],
  setStudents: () => {},
});

const StudentsContextProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([
    {
      index: 1,
      name: "강태웅",
      gpa: 6,
      sat: 7,
      attitude: 8,
      hp: 10,
      morale: 3,
    },
    {
      index: 2,
      name: "김채린",
      gpa: 1,
      sat: 1,
      attitude: 1,
      hp: 10,
      morale: 10,
    },
    {
      index: 3,
      name: "김현채",
      gpa: 1,
      sat: 7,
      attitude: 5,
      hp: 10,
      morale: 3,
    },
    {
      index: 4,
      name: "나마로",
      gpa: 1,
      sat: 1,
      attitude: 1,
      hp: 10,
      morale: 10,
    },
    {
      index: 5,
      name: "남영우",
      gpa: 7,
      sat: 5,
      attitude: 9,
      hp: 10,
      morale: 8,
    },
    {
      index: 6,
      name: "송상화",
      gpa: 7,
      sat: 5,
      attitude: 6,
      hp: 10,
      morale: 7,
    },
    {
      index: 7,
      name: "은가은",
      gpa: 4,
      sat: 9,
      attitude: 3,
      hp: 10,
      morale: 4,
    },
    {
      index: 8,
      name: "양제현",
      gpa: 7,
      sat: 1,
      attitude: 5,
      hp: 10,
      morale: 7,
    },
    {
      index: 9,
      name: "홍준영",
      gpa: 7,
      sat: 7,
      attitude: 1,
      hp: 10,
      morale: 10,
    },
  ]);
  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsContextProvider;

export const useStudentsContext = () => useContext(StudentsContext);
