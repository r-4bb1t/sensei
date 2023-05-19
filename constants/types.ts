export interface Student {
  index: number;
  name: string;

  gpa: number;
  sat: number;
  attitude: number;

  hp: number;
  morale: number;
}

export interface Buff {
  name: string;
  description: string;
  grade: number;
  month: number;
  effect: {
    gpa?: number;
    sat?: number;
    attitude?: number;

    hp?: number;
    morale?: number;

    duration: number;
  }[];
}

export const BuffList = {
  athleticCompetition: {
    name: "체육대회 에이스",
    description: "%grade학년 %month월 체육대회에서 좋은 결과를 만들어냈습니다.",
    effect: [
      { morale: 1, duration: 3 },
      { gpa: -1, duration: 0 },
    ],
  }, // 체육대회 이벤트 출전
  badMockExam: {
    name: "예상치 못한 성적 하락",
    description:
      "%grade학년 %month월 모의고사에서 예상보다 낮은 점수를 받아 우울해졌습니다.",
    effect: [
      { morale: -1, duration: 3 },
      { sat: -1, duration: 0 },
    ],
  }, // SAT 수치가 7 이상일 경우 특정 확률로 발생
  goodMockExam: {
    name: "모의고사 성적우수상",
    description: "%grade학년 %month월 모의고사에서 좋은 성적을 냈습니다.",
    effect: [
      { morale: 1, duration: 3 },
      { sat: 1, duration: 1000 },
    ],
  }, // SAT 수치에 비례한 확률로 발생
  badSchoolExam: {
    name: "예상치 못한 성적 하락",
    description:
      "%grade학년 %month월 교내 시험에서 예상보다 낮은 점수를 받아 우울해졌습니다.",
    effect: [
      { morale: -1, duration: 3 },
      { gpa: -1, duration: 0 },
    ],
  }, // GPA 수치가 7 이상일 경우 특정 확률로 발생
  goodSchoolExam: {
    name: "내신 성적우수상",
    description: "%grade학년 %month월 교내 시험에서 좋은 성적을 냈습니다.",
    effect: [
      { morale: 1, duration: 3 },
      { gpa: 1, duration: 1000 },
    ],
  }, // GPA 수치에 비례한 확률로 발생
};
