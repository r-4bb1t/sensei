import { WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import cc from "classcat";
import { useEffect, useState } from "react";

export default function Footer() {
  const { mobileTab, setMobileTab, loading, messages, month } =
    useStudentsContext();
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    if (mobileTab !== WindowType.messagelist && messages.length > 0)
      setUnread(true);
  }, [messages]);

  useEffect(() => {
    if (mobileTab == WindowType.messagelist) setUnread(false);
  }, [mobileTab]);

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
      <button
        className={cc([
          "w-full h-full flex flex-col items-center justify-end pb-3 relative",
          mobileTab == WindowType.homework && "bg-[rgba(0,0,0,0.2)]",
        ])}
        onClick={() => setMobileTab(WindowType.homework)}
      >
        <img src="/assets/icons/homework.png" className="w-12 h-12" />
        {!loading && month < 13 && (
          <div className="absolute w-6 h-6 text-white top-1 right-4 border-2 border-black bg-red-500 rounded-full flex items-center justify-center text-sm font-black">
            N
          </div>
        )}
        <div className="">숙제</div>
      </button>
      <button
        className={cc([
          "w-full h-full flex flex-col items-center justify-end pb-3 relative",
          mobileTab == WindowType.messagelist && "bg-[rgba(0,0,0,0.2)]",
        ])}
        onClick={() => setMobileTab(WindowType.messagelist)}
      >
        <img src="/assets/icons/message.png" className="w-12 h-12" />
        {unread && (
          <div className="absolute w-6 h-6 text-white top-1 right-4 border-2 border-black bg-red-500 rounded-full flex items-center justify-center text-sm font-black">
            N
          </div>
        )}
        <div className="">메시지</div>
      </button>
    </footer>
  );
}
