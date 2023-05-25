import type { NextPage } from "next";
import { useDrag, useDragLayer, useDrop, XYCoord } from "react-dnd";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import cc from "classcat";
import { WindowProps, WindowType } from "@/constants/window";
import StudentsList from "@/components/Windows/StudentList";
import CCTV from "@/components/CCTV";
import Student from "@/components/Windows/Student";
import { useStudentsContext } from "@/contexts/studentsContext";
import Homework from "@/components/Windows/Homework";
import Ending from "@/components/Windows/Ending";
import Footer from "@/components/Footer";
import MessageList from "@/components/Windows/MessageList";
import Message from "@/components/Windows/Message";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const Window = ({
  w,
  setWindows,
  noAnimation = false,
}: {
  w: WindowProps;
  setWindows: Dispatch<SetStateAction<WindowProps[]>>;
  noAnimation?: boolean;
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "window",
      item: w,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [w]
  );

  return (
    <motion.div
      initial={noAnimation ? {} : { scaleX: 0, scaleY: 0 }}
      animate={noAnimation ? {} : { scaleX: 1, scaleY: 1 }}
      exit={
        noAnimation
          ? {}
          : { scaleX: 0, scaleY: 0, transition: { duration: 0.1 } }
      }
      className={cc([
        "absolute overflow-visible border-2 border-black",
        w.type === WindowType.cctv && "w-[540px] h-[528px]",
        w.type === WindowType.student && "w-[540px]",
        w.type === WindowType.homework && "w-[300px]",
        (w.type === WindowType.messagelist || w.type === WindowType.message) &&
          "w-[300px] h-96",
        isDragging && "hidden",
      ])}
      style={{ top: w.top + "px", left: w.left + "px" }}
    >
      <div className="flex h-full select-none flex-col pt-8 bg-white">
        <div
          className="absolute left-0 right-0 top-0 h-8 opacity-0"
          draggable
          ref={drag}
        ></div>
        <div className="pointer-events-none font-bold absolute left-0 right-0 top-0 h-8 flex pl-4 justify-between items-center border-b-2 border-b-black">
          <h1 className="!text-base">
            {
              {
                [WindowType.student]: "학생 정보",
                [WindowType.studentlist]: "출석부",
                [WindowType.cctv]: "교실",
                [WindowType.homework]: "숙제",
                [WindowType.messagelist]: "메시지",
                [WindowType.message]: "메시지",
                [WindowType.ending]: "엔딩",
              }[w.type]
            }
          </h1>
          <button
            className="pointer-events-auto h-8 w-8 cursor-pointer border-l-2 border-l-black hover:bg-black hover:text-white"
            onClick={() =>
              setWindows((ww) => ww.filter((www) => www.id !== w.id))
            }
          >
            ×
          </button>
        </div>

        {w.type === WindowType.studentlist && <StudentsList w={w} />}
        {w.type === WindowType.cctv && <CCTV />}
        {w.type === WindowType.student && <Student id={w.data?.id} />}
        {w.type === WindowType.homework && <Homework />}
        {w.type === WindowType.ending && <Ending />}
        {w.type === WindowType.messagelist && <MessageList w={w} />}
        {w.type === WindowType.message && <Message id={w.data?.id ?? -1} />}
      </div>
    </motion.div>
  );
};

const Home: NextPage = () => {
  const { windows, setWindows, mobileTab, setMobileTab } = useStudentsContext();
  const [layer, setLayer] = useState([0, 0]);

  const moveWindow = useCallback(
    (id: string, left: number, top: number) => {
      setWindows((windows) =>
        windows.map((window) => {
          if (window.id === id) {
            return { ...window, left: left, top: top };
          }
          return window;
        })
      );
    },
    [windows, setWindows]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "window",
      drop(item: WindowProps, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = item.left + delta.x;
        const top = item.top + delta.y;
        moveWindow(item.id, left, top);
        return undefined;
      },
    }),
    [moveWindow]
  );

  const { item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  useEffect(() => {
    if (currentOffset && initialOffset)
      setLayer([
        currentOffset.x - initialOffset.x,
        currentOffset.y - initialOffset.y,
      ]);
    else setLayer([0, 0]);
  }, [currentOffset]);

  return (
    <div className="md:bg-[#ff8e96] bg-white flex h-screen flex-col overflow-hidden">
      <Header />
      <main
        className="hidden md:flex h-full w-full flex-col py-16 px-8 overflow-hidden gap-2"
        ref={drop}
      >
        <div className="flex absolute inset-0 w-full h-full items-center justify-center pointer-events-none">
          <div className="w-full h-[50%] flex items-center justify-center">
            <img
              src="/assets/background.png"
              className="h-full object-contain mb-20"
            />
          </div>
        </div>
        <AnimatePresence>
          {windows.map((window) => (
            <Window w={window} setWindows={setWindows} key={window.id} />
          ))}
        </AnimatePresence>
        <button
          className="hover:bg-[rgba(0,0,0,0.2)] w-16 h-20 flex flex-col items-center"
          onClick={(e) => {
            if (
              windows.filter((w) => w.type === WindowType.studentlist).length ==
              0
            )
              setWindows((windows) => [
                ...windows,
                {
                  type: WindowType.studentlist,
                  top: e.clientY + Math.random() * 50,
                  left: e.clientX + +Math.random() * 50,
                  id: new Date().toString() + Math.random().toString(),
                },
              ]);
            else
              setWindows((w) =>
                w.filter((ww) => ww.type !== WindowType.studentlist)
              );
          }}
        >
          <img src="/assets/icons/studentslist.png" className="w-12 h-12" />
          <div className="font-bold px-1 mt-2">출석부</div>
        </button>
        <button
          className="hover:bg-[rgba(0,0,0,0.2)] w-16 h-20 flex flex-col items-center"
          onClick={(e) => {
            if (windows.filter((w) => w.type === WindowType.cctv).length == 0)
              setWindows((windows) => [
                ...windows,
                {
                  type: WindowType.cctv,
                  top: e.clientY,
                  left: e.clientX + 20,
                  id: new Date().toString() + Math.random().toString(),
                },
              ]);
            else
              setWindows((w) => w.filter((ww) => ww.type !== WindowType.cctv));
          }}
        >
          <img src="/assets/icons/cctv.png" className="w-12 h-12" />
          <div className="font-bold px-1 mt-2">교실</div>
        </button>
        <button
          className="hover:bg-[rgba(0,0,0,0.2)] w-16 h-20 flex flex-col items-center"
          onClick={(e) => {
            if (
              windows.filter((w) => w.type === WindowType.homework).length == 0
            )
              setWindows((windows) => [
                ...windows,
                {
                  type: WindowType.homework,
                  top: e.clientY,
                  left: e.clientX + 20,
                  id: new Date().toString() + Math.random().toString(),
                },
              ]);
            else
              setWindows((w) =>
                w.filter((ww) => ww.type !== WindowType.homework)
              );
          }}
        >
          <img src="/assets/icons/homework.png" className="w-12 h-12" />
          <div className="font-bold px-1 mt-2">숙제</div>
        </button>
        <button
          className="hover:bg-[rgba(0,0,0,0.2)] w-16 h-20 flex flex-col items-center"
          onClick={(e) => {
            if (
              windows.filter((w) => w.type === WindowType.messagelist).length ==
              0
            )
              setWindows((windows) => [
                ...windows,
                {
                  type: WindowType.messagelist,
                  top: e.clientY,
                  left: e.clientX + 20,
                  id: new Date().toString() + Math.random().toString(),
                },
              ]);
            else
              setWindows((w) =>
                w.filter((ww) => ww.type !== WindowType.messagelist)
              );
          }}
        >
          <img src="/assets/icons/message.png" className="w-12 h-12" />
          <div className="font-bold px-1 mt-2">메시지</div>
        </button>
        {/* <button
          className="hover:bg-[rgba(0,0,0,0.2)] w-16 h-20 flex flex-col items-center"
          onClick={(e) => {
            if (
              windows.filter((w) => w.type === WindowType.messagelist).length ==
              0
            )
              setWindows((windows) => [
                ...windows,
                {
                  type: WindowType.messagelist,
                  top: e.clientY,
                  left: e.clientX + 20,
                  id: new Date().toString() + Math.random().toString(),
                },
              ]);
            else
              setWindows((w) =>
                w.filter((ww) => ww.type !== WindowType.messagelist)
              );
          }}
        >
          <img src="/assets/icons/collections.png" className="w-12 h-12" />
          <div className="font-bold px-1 mt-2">갤러리</div>
        </button> */}
      </main>
      <div
        className={cc([
          "hidden md:block pointer-events-none absolute inset-0 z-10 h-full w-full",
        ])}
      >
        <div
          className={cc([(!initialOffset || !currentOffset) && "hidden"])}
          style={{
            transform: `translate(${layer[0]}px, ${layer[1]}px)`,
            zIndex: "10000",
          }}
        >
          {item && (
            <Window
              w={item}
              setWindows={setWindows}
              key={item.id}
              noAnimation
            />
          )}
        </div>
      </div>
      <div className="w-full h-screen [height:calc(var(--vh, 1vh)*100)] overflow-y-auto md:hidden pt-32 pb-24">
        {
          {
            [WindowType.student]: <Student />,
            [WindowType.studentlist]: <StudentsList w={undefined} />,
            [WindowType.cctv]: <CCTV />,
            [WindowType.homework]: <Homework />,
            [WindowType.ending]: <Ending />,
            [WindowType.messagelist]: <MessageList w={undefined} />,
            [WindowType.message]: <Message id={-1} />,
          }[mobileTab]
        }
      </div>
      <Footer />
    </div>
  );
};

export default Home;
