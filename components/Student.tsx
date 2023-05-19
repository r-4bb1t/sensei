import { useStudentsContext } from "@/contexts/studentsContext";

export default function Student({ id = 1 }: { id?: number }) {
  const { students } = useStudentsContext();
  const student = students[id - 1];
  return (
    <div className="w-full flex flex-col items-center pb-4">
      <div className="text-lg font-bold text-center w-full my-1">
        {id}번 {student.name}
      </div>
      <div className="w-full flex justify-center h-24 mb-2">
        <img src="/assets/items/desk1.png" className="w-24 absolute" />
        <img
          src={`/assets/students/${id}.png`}
          className="w-24 absolute animate-study origin-bottom"
        />
      </div>

      <div className="grid grid-cols-[64px_1fr] gap-2 w-52 pr-4 items-center">
        <div className="text-right">내신</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${student.gpa * 10}%` }}
          ></div>
        </div>
        <div className="text-right">모의고사</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-green-400"
            style={{ width: `${student.sat * 10}%` }}
          ></div>
        </div>
        <div className="text-right">태도</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-blue-400"
            style={{ width: `${student.attitude * 10}%` }}
          ></div>
        </div>

        <div className="text-right mt-4">의욕</div>
        <div className="w-full border-2 border-black h-4 mt-4">
          <div
            className="h-full bg-zinc-400"
            style={{ width: `${student.morale * 10}%` }}
          ></div>
        </div>
        <div className="text-right">체력</div>
        <div className="w-full border-2 border-black h-4">
          <div
            className="h-full bg-red-400"
            style={{ width: `${student.hp * 10}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
