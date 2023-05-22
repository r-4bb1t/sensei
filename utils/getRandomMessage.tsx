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

export const getRandomPhoneMessage = (
  student: Student,
  type: MESSAGE,
  isSAT?: boolean
) => {
  let messages = [];
  let prefixes = ["선생님 ", "선생님! ", "쌤! ", "쌤 "];

  let random = [];
  switch (type) {
    case MESSAGE.retire:
      if (student.attitude > 5) {
        random.push(["저 너무 아파서 병결 쓸게요ㅠㅠ 죄송합니다!"]);
        random.push(["아파서 학교 못 갈 것 같아요ㅠㅠ"]);
        random.push(["너무 힘들어요... 죄송합니다."]);
      } else if (student.attitude > 3) {
        random.push(["저 아파서 학교 안가요"]);
        random.push(["몸이 안 좋아서 등교 못 합니다."]);
      } else {
        random.push(["학교 안가요"]);
        random.push(["저 쓰러짐"]);
        random.push(["이건 학대예요."]);
      }
      break;
    case MESSAGE.goodMockExam:
      if (student.attitude > 7)
        random.push([
          `저 ${
            isSAT ? "수능" : "이번 모의고사"
          } 진짜 잘봤어요! 다 쌤 덕분이에요!!`,
        ]);
      else if (student.attitude > 5)
        random.push([`저 ${isSAT ? "수능" : "모평"} 잘봤어요!`]);
      else {
        random.push(["수능 만점 각"]);
      }
      if (student.lastHomework == 2)
        random.push([
          `저 ${isSAT ? "수능" : "모의고사"} 생각보다 잘 봤어요.`,
          "수능특강 해설 효과 짱이네요.",
        ]);
      break;
    case MESSAGE.goodSchoolExam:
      if (student.attitude > 7) {
        random.push(["저 이번 시험 대박 잘 봤어요! 감사합니다!"]);
      } else if (student.attitude > 5) {
        random.push(["시험 잘봤어요!"]);
      } else {
        random.push(["이러다 전교 1등 할 듯..."]);
      }
      if (student.lastHomework == 0)
        random.push(["족집게 특별과제 덕분에 성적 잘 받았어요."]);
      break;
    case MESSAGE.badMockExam:
      if (student.attitude > 7) {
        random.push([
          `${isSAT ? "수능" : "이번 모평"} 너무 못 봤어요... 저 어떡하죠?`,
        ]);
        if (!isSAT) random.push(["저 수능 특별 수업 해주시면 안되나요?ㅜㅜ"]);
      } else if (student.attitude > 5)
        random.push([`저 ${isSAT ? "수능" : "모평"} 망했어요ㅠㅠ`]);
      else {
        random.push(["제가 그렇죠 뭐.."]);
      }
      if (student.lastHomework == 2) {
        random.push(["수특 해설이 효과가 없었나봐요.."]);
        if (!isSAT) random.push(["수특 해설 더 열심히 들을게요..."]);
      }
      break;
    case MESSAGE.badSchoolExam:
      if (student.attitude > 7) {
        random.push(["이번 시험 너무 못 봤어요..."]);
      } else if (student.attitude > 5) random.push(["저 시험 망했어요ㅠ"]);
      else {
        random.push(["정시에 모든 걸 걸죠 뭐."]);
      }
      if (student.lastHomework == 2) {
        random.push(["과제 열심히 해야겠네요..."]);
      }
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
