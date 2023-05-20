import { useEffect, useRef } from "react";

export default function Message({ id }: { id?: number }) {
  const chatlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatlistRef.current) return;
    chatlistRef.current.scrollTop = chatlistRef.current?.scrollHeight;
  }, [chatlistRef]);

  return (
    <div className="flex flex-col md:h-96 h-screen overflow-y-auto">
      <div className="h-12 border-b-2 border-b-black flex px-4 items-center shrink-0 gap-2">
        <img src={`/assets/students/front_1.png`} className="w-8 h-8 mt-1" />
        <div className="font-bold">김현채</div>
      </div>
      <div className="overflow-y-auto p-4" ref={chatlistRef}>
        {[...Array(20)].map((_, i) => (
          <div className="chat chat-start" key={i}>
            <div className="chat-bubble bg-black text-white">
              Its over Anakin, <br />I have the high ground.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
