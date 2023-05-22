export interface Student {
  index: number;
  name: string;

  gpa: number;
  sat: number;
  attitude: number;

  hp: number;
  morale: number;

  buffs: Buff[];
  lastHomework: number;

  grade: string[];
  ending: string;
}

export interface Buff {
  name: string;
  description: string;
  grade: number;
  month: number;
  isGood: boolean;
  effect: {
    gpa?: number;
    sat?: number;
    attitude?: number;

    hp?: number;
    morale?: number;
  };
  duration: number;
  display: boolean;
}

export interface HomeworkType {
  index: number;
  name: string;
  description: string;
  stat: {
    gpa?: number;
    sat?: number;
    attitude?: number;

    hp?: number;
    morale?: number;
  };
  month: {
    [key: number]: {
      gpa?: number;
      sat?: number;
      attitude?: number;

      hp?: number;
      morale?: number;
    };
  };
}

export enum MESSAGE {
  retire,
  goodMockExam,
  goodSchoolExam,
  badMockExam,
  badSchoolExam,
  lowMorale,
}

export interface MessageType {
  student: number;
  message: string;
}
