export default function Message({ id }: { id?: number }) {
  return (
    <div className="flex flex-col md:h-96 h-screen">
      {[1, 2, 3].map((_, i) => (
        <div
          className="cursor-pointer group hover:bg-black hover:text-white flex border-b-2 border-b-black items-center"
          key={i}
        >
          <div className="h-14 w-14 flex items-center justify-center px-2 pt-3 pb-1">
            <img
              src={`/assets/students/front_1.png`}
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="text-sm">김현채</div>
            <div>선생님!@</div>
          </div>
        </div>
      ))}
    </div>
  );
}
