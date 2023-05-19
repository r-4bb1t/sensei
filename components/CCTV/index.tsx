import { useStudentsContext } from "@/contexts/studentsContext";
import Background from "./Background";
import Objects from "./Objects";
import Studying from "./Studying";

const size = 3;

export default function CCTV() {
  const { students } = useStudentsContext();
  return (
    <>
      <div className="window-pane pointer-events-none h-full break-all !p-0">
        <div className="relative" style={{ width: `${(size * 2 + 2) * 64}px` }}>
          <Background size={size} />
          <Objects size={size} />
          <Studying size={size} />
        </div>
      </div>
    </>
  );
}
