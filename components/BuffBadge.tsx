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
    <div
      className={cc([
        "tooltip text-sm border-2 border-black px-1 py-0.5 text-white bg-black rounded",
        buff.month + buff.duration < month && "!opacity-50",
      ])}
      data-tip={buff.description
        .replace("%grade", `${buff.grade}`)
        .replace("%month", `${buff.month}`)}
    >
      {buff.name}
    </div>
  );
}
