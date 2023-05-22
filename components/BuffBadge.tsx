import { Buff } from "@/constants/types";
import { useStudentsContext } from "@/contexts/studentsContext";
import cc from "classcat";

export default function BuffBadge({
  buff,
  hideDisabled = false,
}: {
  buff: Buff;
  hideDisabled?: boolean;
}) {
  const { month } = useStudentsContext();
  return (
    <>
      <div
        className={cc([
          "tooltip text-sm border-2 border-black px-1 py-0.5 text-white bg-black rounded md:block hidden",
          buff.month + buff.duration < month && "!bg-opacity-50",
        ])}
        data-tip={buff.description
          .replace("%grade", `${buff.grade}`)
          .replace("%month", `${buff.month}`)}
      >
        {buff.name}
      </div>
      <div className="md:hidden flex gap-2">
        <div className="text-sm border-2 border-black px-1 py-0.5 text-white bg-black rounded whitespace-nowrap h-fit">
          {buff.name}
        </div>
        <div className="pt-1 !leading-5 text-sm">
          {buff.description
            .replace("%grade", `${buff.grade}`)
            .replace("%month", `${buff.month}`)}
        </div>
      </div>
    </>
  );
}
