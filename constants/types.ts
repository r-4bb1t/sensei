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

export const monthDescription = [
  "드디어 개학!",
  "중간고사 준비 +_+",
  "얘들아, 열심히 하자~!",
  "벌써 기말고사ㅠㅠ",
  "조금만 참으면 방학이다!",
  "얘들아, 보고싶어!",
  "9월 모의고사 화이팅!",
  "또 중간고사라니...",
  "곧 결전의 날!",
  "졸업의 달",
];

export const homework = [
  {
    index: 0,
    name: "선생님의 족집게 특별과제",
    description:
      "내신의 모든 것을 알려준다! 시험기간에 과제를 해결한다면 내신쯤이야 식은 죽 먹기!",
    stat: { gpa: 1, hp: -1 },
  },
  {
    index: 1,
    name: "담임선생님의 훈화말씀",
    description:
      "다 너희들을 위해서 하는 말이야! 사람은 인성이 되어있어야 된단다!",
    stat: { attitude: 1, morale: -1 },
  },
  {
    index: 2,
    name: "학생들을 위한 수능특강 해설",
    description:
      "모의고사를 잘본 친구들은 더 잘 알아듣겠지? 수능이 얼마 안남았다면 더 열심히 해라!",
    stat: { sat: +1, hp: -1 },
  },
  {
    index: 3,
    name: "단합을 위한 수학여행",
    description:
      "반 친구들끼리 단합이 되어야지,, 방학 때 머리 좀 식히러 여행갈까?",
    stat: { morale: 2, attitude: 2, gpa: -1 },
  },
  {
    index: 4,
    name: "학생들을 위한 맛있는 간식파티",
    description:
      "고생한 너희들을 위해 선생님이 쏜다! 수능까지 조금만 더 힘내렴!",
    stat: { hp: 2, morale: 1 },
  },
];
