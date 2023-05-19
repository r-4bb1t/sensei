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
  };
  duration: number;
}

export const BuffList = {
  athleticCompetition: {
    name: "체육대회 에이스",
    description: "%grade학년 %month월 체육대회에서 좋은 결과를 만들어냈습니다.",
    effect: { morale: 1 },
    duration: 2,
  }, // 체육대회 이벤트 출전
  badMockExam: {
    name: "예상치 못한 성적 하락",
    description:
      "%grade학년 %month월 모의고사에서 예상보다 낮은 점수를 받아 우울해졌습니다.",
    effect: { morale: -1 },
    duration: 2,
  }, // SAT 수치가 7 이상일 경우 특정 확률로 발생
  goodMockExam: {
    name: "모의고사 성적우수상",
    description:
      "%grade학년 %month월 모의고사에서 예상보다 좋은 성적을 냈습니다.",
    effect: { morale: 1 },
    duration: 2,
  }, // SAT 수치에 비례한 확률로 발생
  badSchoolExam: {
    name: "예상치 못한 성적 하락",
    description:
      "%grade학년 %month월 교내 시험에서 예상보다 낮은 점수를 받아 우울해졌습니다.",
    effect: { morale: -1 },
    duration: 2,
  }, // GPA 수치가 7 이상일 경우 특정 확률로 발생
  goodSchoolExam: {
    name: "내신 성적우수상",
    description:
      "%grade학년 %month월 교내 시험에서 예상보다 좋은 성적을 냈습니다.",
    effect: { morale: 1 },
    duration: 2,
  }, // GPA 수치에 비례한 확률로 발생
  examPeriod: {
    name: "시험 기간",
    description: "모두가 힘든 시기를 겪고 있군요.",
    effect: { hp: -1 },
    duration: 0,
  },
};

export const monthDescription = [
  { message: "드디어 개학!", description: "효과 없음" },
  {
    message: "중간고사 준비 +_+",
    description: "시험 기간! 특별과제, 훈화말씀 효과 2배, 모든 학생 체력 -1",
  },
  { message: "얘들아, 열심히 하자~!", description: "효과 없음" },
  {
    message: "벌써 기말고사ㅠㅠ",
    description: "시험 기간! 특별과제, 훈화말씀 효과 2배, 모든 학생 체력 -1",
  },
  { message: "조금만 참으면 방학이다!", description: "효과 없음" },
  {
    message: "얘들아, 보고싶어!",
    description:
      "방학 특전. 특별과제, 훈화말씀, 수능특강 해설 감소 효과 없음. 수학 여행, 간식 파티 효과 2배!",
  },
  { message: "9월 모의고사 화이팅!", description: "효과 없음" },
  {
    message: "또 중간고사라니...",
    description: "시험 기간! 특별과제, 훈화말씀 효과 2배, 모든 학생 체력 -1",
  },
  {
    message: "곧 결전의 날!",
    description: "수능 30일의 전사. 수능특강 해설 증가 효과 2배!",
  },
  { message: "졸업의 달", description: "효과 없음" },
];

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

export const homework = <HomeworkType[]>[
  {
    index: 0,
    name: "선생님의 족집게 특별과제",
    description:
      "내신의 모든 것을 알려준다! 시험기간에 과제를 해결한다면 내신쯤이야 식은 죽 먹기!",
    stat: { gpa: 1, hp: -1 },
    month: {
      4: { gpa: 2, hp: 2 },
      6: { gpa: 2, hp: 2 },
      8: { gpa: 2, hp: 0 },
      10: { gpa: 1, hp: 2 },
    },
  },
  {
    index: 1,
    name: "담임선생님의 훈화말씀",
    description:
      "다 너희들을 위해서 하는 말이야! 사람은 인성이 되어있어야 된단다!",
    stat: { attitude: 1, morale: -1 },
    month: {
      4: { attitude: 2, morale: 2 },
      6: { attitude: 2, morale: 2 },
      8: { attitude: 2, morale: 0 },
      10: { attitude: 1, morale: 2 },
    },
  },
  {
    index: 2,
    name: "학생들을 위한 수능특강 해설",
    description:
      "모의고사를 잘본 친구들은 더 잘 알아듣겠지? 수능이 얼마 안남았다면 더 열심히 해라!",
    stat: { sat: 1, hp: -1 },
    month: {
      11: { sat: 2 },
    },
  },
  {
    index: 3,
    name: "단합을 위한 수학여행",
    description:
      "반 친구들끼리 단합이 되어야지,, 방학 때 머리 좀 식히러 여행갈까?",
    stat: { morale: 2, attitude: 2, gpa: -1 },
    month: {
      8: { morale: 2, attitude: 2 },
    },
  },
  {
    index: 4,
    name: "학생들을 위한 맛있는 간식파티",
    description:
      "고생한 너희들을 위해 선생님이 쏜다! 수능까지 조금만 더 힘내렴!",
    stat: { hp: 2, morale: 1 },
    month: {
      8: { hp: 2, morale: 2 },
    },
  },
];
