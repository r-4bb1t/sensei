import { useStudentsContext } from "@/contexts/studentsContext";

export default function Ending() {
  const { ending, students } = useStudentsContext();
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center px-4 py-4">
        <img src="/assets/logo.png" className="w-12 h-12" />
        <div>202N학년도 KUCC고등학교 입시결과</div>
        <div className="w-full grid grid-cols-[32px_1fr_32px] px-4 items-center gap-2 my-1">
          <div className="rounded-full border-2 border-black w-8 h-8 flex items-center justify-center">
            경
          </div>
          <div className="font-bold text-lg">
            수시 {ending.gpa.length}명 정시 {ending.sat.length}명 특기자{" "}
            {ending.specialist.length}명
          </div>
          <div className="rounded-full border-2 border-black w-8 h-8 flex items-center justify-center">
            축
          </div>
        </div>
        <div>합격을 축하합니다!</div>

        <div className="w-full grid grid-cols-[96px_1fr] mt-6">
          <div>수시</div>
          <div className="flex flex-wrap gap-2">
            {ending.gpa.map((id) => (
              <img
                src={`/assets/students/front_${id}.png`}
                key={id}
                className="w-6 h-6"
              />
            ))}
          </div>
          <div>정시</div>
          <div className="flex flex-wrap gap-2">
            {ending.sat.map((id) => (
              <img
                src={`/assets/students/front_${id}.png`}
                key={id}
                className="w-6 h-6"
              />
            ))}
          </div>
          <div>특기자</div>
          <div className="flex flex-wrap gap-2">
            {ending.specialist.map((id) => (
              <img
                src={`/assets/students/front_${id}.png`}
                key={id}
                className="w-6 h-6"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
