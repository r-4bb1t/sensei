import { Student } from "@/constants/types";

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
