import Background from "./Background";
import Objects from "./Objects";
import Studying from "./Studying";

const size = 3;

export default function CCTV() {
  return (
    <>
      <div className="relative window-pane pointer-events-none h-full break-all !p-0 bg-black-800">
        <div className="relative" style={{ width: `${(size * 2 + 2) * 64}px` }}>
          <Background size={size} />
          <Objects size={size} />
          <Studying size={size} />
        </div>
        <div className="w-full h-full absolute inset-0 pointer-events-none">
          <img
            src="/assets/noise.gif"
            className="w-full h-full mix-blend-overlay opacity-50"
          />
        </div>
      </div>
    </>
  );
}
