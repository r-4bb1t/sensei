export enum WindowType {
  "studentlist",
  "student",
  "cctv",
  "homework",
  "ending",
}

export interface WindowProps {
  type: WindowType;
  top: number;
  left: number;
  id: string;
  index?: number;
  data?: {
    id: number;
  };
}
