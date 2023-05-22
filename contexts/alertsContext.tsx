import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Alert } from "@/components/Alert";
import { AnimatePresence } from "framer-motion";

interface IAlert {
  name: string;
  studentId: number;
  message: string;
}

interface IAlertsWithId extends IAlert {
  id: number;
}

interface IAlertContext {
  alerts: IAlertsWithId[];
  push(alert: IAlert): void;
}

const doNothing = () => null;

export const AlertContext = createContext<IAlertContext>({
  alerts: [],
  push: doNothing,
});

const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<IAlertsWithId[]>([]);

  const push = (alert: IAlert) =>
    setAlerts((prev) => [...prev, { id: +new Date(), ...alert }]);
  const close = (id: number) =>
    setAlerts((prev) => prev.filter((a) => a.id !== id));

  return (
    <AlertContext.Provider
      value={{
        alerts,
        push,
      }}
    >
      <aside
        className={
          "fixed md:bottom-8 top-2 md:top-auto bottom-auto z-50 w-full px-2 flex md:flex-col flex-col-reverse items-end gap-2"
        }
      >
        <AnimatePresence>
          {alerts.map(({ id, name, studentId, message }) => (
            <Alert
              key={id}
              studentId={studentId}
              name={name}
              message={message}
              close={() => close(id)}
            />
          ))}
        </AnimatePresence>
      </aside>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;

export const useAlert = () => useContext(AlertContext);
