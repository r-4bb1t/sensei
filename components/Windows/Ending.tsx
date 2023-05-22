import { useStudentsContext } from "@/contexts/studentsContext";

export default function Ending() {
  const { ending, students, reset } = useStudentsContext();
  return (
    <div className="w-full h-full flex flex-col justify-between items-center pb-12">
      <div className="w-full flex flex-col items-center px-4 py-4 border-b-2 border-b-black border-dashed">
        <img src="/assets/logo.png" className="w-12 h-12" />
        <div>202N학년도 KUCC고등학교 입시결과</div>
        <div className="w-full grid grid-cols-[32px_1fr_32px] px-4 items-center gap-2 my-1">
          <div className="rounded-full border-2 border-black w-8 h-8 flex items-center justify-center">
            경
          </div>
          <div className="font-bold text-lg text-center">
            수시 {ending.gpa.length}명 정시 {ending.sat.length}명 특기자{" "}
            {ending.specialist.length}명
          </div>
          <div className="rounded-full border-2 border-black w-8 h-8 flex items-center justify-center">
            축
          </div>
        </div>
        <div>합격을 축하합니다!</div>
      </div>

      <div className="w-full flex flex-col items-center px-8 py-4">
        <div className="w-full grid grid-cols-[64px_1fr] mt-6 gap-2 font-bold">
          <div className="text-right">수시</div>
          <div className="flex flex-wrap gap-2">
            {ending.gpa.map((id) => (
              <div
                className="tooltip pt-1"
                data-tip={students[id - 1].name}
                key={id}
              >
                <img
                  src={`/assets/students/front_${id}.png`}
                  className="w-12 h-12"
                />
              </div>
            ))}
          </div>
          <div className="text-right">정시</div>
          <div className="flex flex-wrap gap-2">
            {ending.sat.map((id) => (
              <div
                className="tooltip pt-1"
                data-tip={students[id - 1].name}
                key={id}
              >
                <img
                  src={`/assets/students/front_${id}.png`}
                  className="w-12 h-12"
                />
              </div>
            ))}
          </div>
          <div className="text-right">특기자</div>
          <div className="flex flex-wrap gap-2">
            {ending.specialist.map((id) => (
              <div
                className="tooltip pt-1"
                data-tip={students[id - 1].name}
                key={id}
              >
                <img
                  src={`/assets/students/front_${id}.png`}
                  className="w-12 h-12"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-lg md:text-base mt-4">
          총{" "}
          {
            [...ending.gpa, ...ending.sat, ...ending.specialist].filter(
              (e, i) =>
                [...ending.gpa, ...ending.sat, ...ending.specialist].indexOf(
                  e
                ) === i
            ).length
          }
          명의 학생이 합격하였습니다.
        </div>
      </div>

      <button
        className="mt-4 px-4 py-1 hover:bg-black hover:text-white border-black border-2"
        onClick={() => reset()}
      >
        다시하기
      </button>
    </div>
  );
}
