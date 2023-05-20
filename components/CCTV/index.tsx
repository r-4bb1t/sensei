import { useStudentsContext } from "@/contexts/studentsContext";
import Background from "./Background";
import Objects from "./Objects";
import Studying from "./Studying";
import { useEffect, useState } from "react";

export default function CCTV() {
  const { month, isMobile } = useStudentsContext();
  const [size, setSize] = useState(3);

  useEffect(() => {
    if (isMobile) setSize(2);
    else setSize(3);
  }, [isMobile]);

  return (
    <>
      <div className="relative md:window-pane pointer-events-none h-full break-all !p-0 bg-black-800">
        <div className="w-full md:h-auto h-full flex items-center pb-[40%] md:pb-0 justify-center md:block">
          <div
            className="relative max-w-full md:scale-100 scale-[1.4]"
            style={{ width: `${(size * 2 + 2) * 64}px` }}
          >
            <Background size={size} />
            <Objects size={size} />
            {month !== 8 && month !== 13 && <Studying size={size} />}
          </div>
          <div className="w-full h-full absolute inset-0 pointer-events-none">
            <img
              src="/assets/noise.gif"
              className="w-full h-full mix-blend-overlay opacity-30"
            />
          </div>
        </div>
      </div>
    </>
  );
}
