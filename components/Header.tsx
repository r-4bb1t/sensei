import { monthDescription } from "@/constants/types";
import { useStudentsContext } from "@/contexts/studentsContext";

export default function Header() {
  const { month } = useStudentsContext();
  return (
    <header className="md:z-auto md:bg-transparent bg-white z-40 md:border-none border-b-2 border-b-black w-full flex flex-col md:items-end md:p-6 font-bold fixed pointer-events-none inset-x-0 top-0">
      {month < 13 && (
        <>
          <div className="flex md:flex-col md:items-end items-center">
            <div className="relative w-fit shrink-0">
              <img src="/assets/icons/calendar.png" />
              <div className="absolute flex justify-center inset-0 text-xl pt-6">
                {month}월
              </div>
            </div>
            <div className="w-full md:w-fit px-4 py-2 md:border-2 border-black bg-white flex flex-col md:items-end">
              <div className="text-xl bg-white md:pt-0 pt-2">
                {monthDescription[month - 3].message}
              </div>
            </div>
          </div>
          <div className="md:w-fit font-normal text-base bg-white mt-1 px-2 border-t-2 md:border-2 border-black">
            {monthDescription[month - 3].description}
          </div>
        </>
      )}
    </header>
  );
}
