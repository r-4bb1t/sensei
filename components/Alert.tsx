import { useEffect } from "react";
import { motion } from "framer-motion";

interface IAlertProps {
  close(): void;
  studentId: number;
  name: string;
  message: string;
}

export function Alert({ close, studentId, name, message }: IAlertProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [close]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="border-2 border-black bg-white py-2 px-4 md:w-[300px] w-full"
    >
      <div className="flex gap-2 items-center">
        <img
          src={`/assets/students/front_${studentId}.png`}
          className="block w-6 h-6 shrink-0"
        />
        <div className="w-full pr-4 overflow-hidden">
          <div className="font-bold">{name}</div>
          <div className="truncate text-sm">{message}</div>
        </div>
      </div>
    </motion.div>
  );
}
