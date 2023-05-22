import { WindowProps, WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import { Dispatch, SetStateAction, useState } from "react";
import Message from "./Message";
import { AnimatePresence, motion } from "framer-motion";

export default function MessageList({ w }: { w?: WindowProps }) {
  const { setWindows, isMobile, messages, students } = useStudentsContext();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto">
        {messages.length > 0 ? (
          messages
            .filter(
              (message, i) =>
                messages.findLastIndex((m) => message.student === m.student) ===
                i
            )
            .reverse()
            .map((message, i) => (
              <div
                className="cursor-pointer group hover:bg-black hover:text-white flex w-full border-b-2 border-b-black items-center"
                key={i}
                onClick={() => {
                  if (w)
                    setWindows((ww) => [
                      ...ww,
                      {
                        type: WindowType.message,
                        id: `afsd` + Math.random().toString(),
                        index: i,
                        top: (w.top + 50) % window.innerHeight,
                        left: (w.left + 50) % window.innerWidth,
                        data: {
                          id: message.student,
                        },
                      },
                    ]);
                  if (isMobile) {
                    setSelectedMessage(message.student);
                  }
                }}
              >
                <div className="h-14 w-14 flex items-center justify-center px-2 pt-3 pb-1 shrink-0">
                  <img
                    src={`/assets/students/front_${message.student}.png`}
                    className="w-full h-full"
                  />
                </div>
                <div className="w-full overflow-hidden pr-2">
                  <div className="text-sm">
                    {students[message.student - 1].name}
                  </div>
                  <div className="truncate break-all">{message.message}</div>
                </div>
              </div>
            ))
        ) : (
          <div className="w-full h-full flex items-center justify-center pb-12">
            메세지 없음
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.2 } }}
            className="w-full h-full fixed inset-0"
          >
            <div className="w-full h-full pt-32 bg-white overflow-y-auto flex flex-col items-center">
              <Message id={selectedMessage} />
              <button
                onClick={() => setSelectedMessage(null)}
                className="fixed bottom-32 text-lg bg-white px-4 py-1 hover:bg-black hover:text-white border-black border-2"
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
