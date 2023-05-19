import { WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import cc from "classcat";

export default function Footer() {
  const { mobileTab, setMobileTab } = useStudentsContext();
  return (
    <footer className="md:hidden fixed bottom-0 h-24 w-full bg-white border-t-2 border-t-black grid grid-cols-4">
      <button
        className={cc([
          "w-full h-full flex flex-col items-center justify-end pb-3",
          mobileTab == WindowType.studentlist && "bg-[rgba(0,0,0,0.2)]",
        ])}
        onClick={() => setMobileTab(WindowType.studentlist)}
      >
        <img src="/assets/icons/studentslist.png" className="w-12 h-12" />
        <div className="">출석부</div>
      </button>
      <button
        className={cc([
          "w-full h-full flex flex-col items-center justify-end pb-3",
          mobileTab == WindowType.cctv && "bg-[rgba(0,0,0,0.2)]",
        ])}
        onClick={() => setMobileTab(WindowType.cctv)}
      >
        <img src="/assets/icons/cctv.png" className="w-12 h-12" />
        <div className="">교실</div>
      </button>
    </footer>
  );
}
