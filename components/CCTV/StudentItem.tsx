import { WindowType } from "@/constants/window";
import { useStudentsContext } from "@/contexts/studentsContext";
import { getRandomMessage } from "@/utils/getRandomMessage";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StudentItem({ id }: { id: number }) {
  const { students, month, setWindows } = useStudentsContext();
  const student = students[id - 1];
  const [message, setMessage] = useState<string | null>(null);
  const [inv, setInv] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    const random = Math.random() * 3000;
    if (inv) clearInterval(inv);
    setInv(
      setInterval(() => {
        if (Math.random() > 0.8) {
          setMessage(getRandomMessage(student, month));
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        }
      }, 3000 + random)
    );
  }, [month]);

  return month !== 8 && month !== 13 ? (
    <img src="/assets/blank.png" className="w-full" />
  ) : student.hp > 0 ? (
    <motion.div
      className="relative flex justify-center origin-bottom"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0, transition: { duration: 0.2 } }}
    >
      <div className="absolute -top-6">
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: 5, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -5, scale: 0 }}
              className="w-fit px-1 py-0.5 rounded border-2 border-black bg-white text-xs whitespace-nowrap origin-bottom"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="tooltip w-full" data-tip={students[id - 1].name}>
        <button
          className="pointer-events-auto w-full"
          onClick={(e) => {
            setWindows((ww) => [
              ...ww,
              {
                type: WindowType.student,
                id: `${student.index}` + Math.random().toString(),
                index: student.index,
                top: e.clientY + Math.random() * 50,
                left: e.clientX + +Math.random() * 50,
                data: {
                  id: student.index,
                },
              },
            ]);
          }}
        >
          <div className="flex items-end w-full h-16">
            <img
              src={`/assets/students/${id}.png`}
              className="w-full animate-study origin-bottom"
            />
          </div>
        </button>
      </div>
    </motion.div>
  ) : (
    <img src="/assets/items/absent.png" className="w-full" />
  );
}
