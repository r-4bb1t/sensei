import { motion } from "framer-motion";

export default function Sensei() {
  return (
    <div className="relative">
      <div className="animate-bounce absolute -top-1 origin-bottom">
        <div className=" -translate-x-10 -translate-y-4">
          <motion.div
            initial={{ y: 5, scale: 0 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -5, scale: 0 }}
            className="origin-bottom w-fit px-1 py-0.5 rounded border-2 border-black bg-white text-xs whitespace-nowrap"
          >
            {
              ["숙제해랑", "숙제 멍!", "숙제 멍멍"][
                Math.floor(Math.random() * 3)
              ]
            }
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0, transition: { duration: 0.2 } }}
      >
        <img
          src="/assets/items/sensei.gif"
          className="w-full -translate-x-7 -translate-y-4"
        />
      </motion.div>
    </div>
  );
}
