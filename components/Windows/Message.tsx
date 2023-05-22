import { useStudentsContext } from "@/contexts/studentsContext";
import { useEffect, useRef } from "react";

export default function Message({ id }: { id: number }) {
  const chatlistRef = useRef<HTMLDivElement>(null);
  const { students, messages } = useStudentsContext();

  useEffect(() => {
    if (!chatlistRef.current) return;
    chatlistRef.current.scrollTop = chatlistRef.current?.scrollHeight;
  }, [chatlistRef]);

  return (
    <div className="w-full flex flex-col h-screen overflow-y-auto">
      <div className="h-12 border-b-2 border-b-black flex px-4 items-center shrink-0 gap-2">
        <img
          src={`/assets/students/front_${id}.png`}
          className="w-8 h-8 mt-1"
        />
        <div className="font-bold">{students[id - 1].name}</div>
      </div>
      <div className="overflow-y-auto p-4 pb-48 md:pb-4" ref={chatlistRef}>
        {messages
          .filter((message) => message.student === id)
          .reverse()
          .map((message, i) => (
            <div className="chat chat-start" key={i}>
              <div className="chat-bubble bg-black text-white">
                {message.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
