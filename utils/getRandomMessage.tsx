import { MESSAGE, Student } from "@/constants/types";

export const getRandomMessage = (student: Student, month: number) => {
  let messages = ["급식 뭐 나오지", "배고프다"];
  if (student.attitude < 3) {
    if (student.gpa > 5 || student.sat > 5) {
      messages.push("하기 싫다");
    } else {
      messages.push("안할래");
    }
  } else {
    if (student.gpa > 5 || student.sat > 5) {
      messages.push("열심히 해야지");
    } else {
      messages.push("성적 올리자");
    }
  }

  if (student.morale < 3) {
    messages.push("의욕이 없다");
  }

  if (month === 3 || month === 9) {
    messages.push("모평 준비");
    if (student.attitude > 5) {
      messages.push("잘 봐야지");
      messages.push("개학 설렌다");
    } else {
      messages.push("개학 싫어");
    }
  }

  if (month === 4 || month === 6 || month === 10) {
    messages.push("시험이라니");
    if (student.attitude > 5) messages.push("잘 봐야지");
  }

  if (student.hp < 5) {
    messages.push("너무 피곤해");
    messages.push("조퇴할까");
  }

  return messages[Math.floor(Math.random() * messages.length)];
};

export const getRandomPhoneMessage = (student: Student, type: MESSAGE) => {
  let messages = [];
  let prefixes = ["선생님 ", "선생님! ", "쌤! ", "쌤 "];

  let random = [];
  switch (type) {
    case MESSAGE.retire:
      if (student.attitude > 5)
        random.push(["저 너무 아파서 병결 쓸게요ㅠㅠ 죄송합니다"]);
      else if (student.attitude > 3) random.push(["저 아파서 학교 안가요"]);
      else random.push(["학교 안가요"]);
      break;
    case MESSAGE.goodMockExam:
      if (student.attitude > 7)
        random.push(["저 이번 모의고사 진짜 잘봤어요! 다 쌤 덕분이에요"]);
      else if (student.attitude > 5) random.push(["저 모평 잘봤어요!"]);
      if (student.lastHomework == 2)
        random.push([
          "저 모의고사 생각보다 잘 봤어요.",
          "수능특강 해설 효과 짱이네요.",
        ]);
      break;
  }
  messages =
    random.length > 0 ? random[Math.floor(Math.random() * random.length)] : [];

  if (messages.length > 0)
    messages[0] =
      (student.attitude > 3
        ? prefixes[Math.floor(Math.random() * prefixes.length)]
        : "") + messages[0];
  return messages;
};
