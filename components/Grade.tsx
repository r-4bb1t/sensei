import cc from "classcat";

export default function Grade({ grade }: { grade: string }) {
  return grade ? (
    <div className="flex justify-center">
      <div
        className={cc([
          "border-4 border-dotted w-8 h-8 flex items-center justify-center grade-text text-xl font-bold",
          (grade === "A+" || grade === "A") && "border-blue-600 text-blue-600",
          grade === "B+" && "border-green-600 text-green-600",
          grade === "C+" && "border-red-600 text-red-600",
        ])}
      >
        {grade}
      </div>
    </div>
  ) : (
    <></>
  );
}
