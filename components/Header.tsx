import { monthDescription } from "@/constants/types";
import { useStudentsContext } from "@/contexts/studentsContext";

export default function Header() {
  const { month } = useStudentsContext();
  return (
    <header className="w-full flex items-center justify-end p-6 text-3xl font-bold fixed pointer-events-none inset-x-0 top-0">
      <div className="px-4 py-2 border-2 border-black bg-white flex flex-col items-end">
        {month}월
        <div className="text-xl bg-white mt-1">
          : {monthDescription[month - 3]}
        </div>
      </div>
    </header>
  );
}
