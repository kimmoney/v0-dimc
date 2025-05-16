export type CurriculumType = "D" | "I" | "M" | "C";
export type CurriculumLevel = "기초" | "중급" | "심화";

export interface Score {
  type: CurriculumType;
  score: number;
}

export const curriculumData: Record<
  CurriculumType,
  Record<CurriculumLevel, Record<string, { title: string; detail: string }>>
> = {
    D: {
        기초: {
          'D1·공통·1': { title: "컴퓨터 속 날 닮은 너", detail: "코스페이시스로 만나는 메타버스" },
          'D2·공통·1': { title: "내 꿈이 실제가 되는 순간", detail: "직접 느껴보는 가상현실" },
          'D1·기초·1': { title: "내 손으로 만드는 무한의 계단", detail: "코스페이시스를 활용한 게임 메이킹" }
        },
        중급: {
          'D1·기초·1': { title: "내 손으로 만드는 무한의 계단", detail: "코스페이시스를 활용한 게임 메이킹" },
          'D2·기초·2': { title: "3D 세상 속 나만의 캐릭터", detail: "블렌더로 3D 캐릭터 만들기" },
          'D3·기초·1': { title: "ZEP과 떠나는 메타버스 모험", detail: "ZEP과 제페토로 탐험하는 메타버스" }
        },
        심화: {
          'D1·중급·1': { title: "우리 집으로 놀러오세요!", detail: "코스페이시스로 만드는 나의 집" },
          'D1·심화·3': { title: "미스터리가 가득한 방에서 무슨 일이?", detail: "코스페이시스로 만들어보는 방탈출" },
          'D2·심화·2': { title: "하나보다는 둘, 둘보다는 셋", detail: "협업을 위한 노션 사용해보기" }
        }
      },
      I: {
        기초: {
          'I1·공통·1': { title: "AI도 선생님이 필요해", detail: "AI를 학습시켜 올바른 구별하기" },
          'I2·공통·1': { title: "트롤리 딜레마, 나의 선택은?", detail: "인공지능 윤리 문제의 중요성" },
          'I1·기초·1': { title: "내 마음을 읽는 인공지능", detail: "그리기 AI로 인공지능 사고 과정 이해하기" }
        },
        중급: {
          'I3·기초·1': { title: "잘 그리지 못해도 괜찮아, AI와 함께라면!", detail: "투닝 AI로 만드는 나만의 네컷 웹툰" },
          'I5·기초·1': { title: "너, 웹 디자이너가 되어보지 않을래?", detail: "Framer로 만들어보는 나만의 웹사이트" },
          'I4·중급·2': { title: "Short 하게 Shorts 스타 되는 법", detail: "Vrew로 손쉽게 만드는 유튜브 쇼츠" }
        },
        심화: {
          'I4·중급·2': { title: "Short 하게 Shorts 스타 되는 법", detail: "Vrew로 손쉽게 만드는 유튜브 쇼츠" },
          'I5·중급·1': { title: "PPT? 눈 Gamma도 뚝딱이지!", detail: "Gamma를 활용한 자기소개 PPT 만들기" },
          'I1·심화·1': { title: "멍멍! 야옹? 내가 누구게", detail: "Teachable Machine으로 인공지능 학습시키기" }
        }
      },
      M: {
        기초: {
          'M1·기초·1': { title: "버튼 NO! 똑똑한 무드등", detail: "조도센서의 원리 알고 무드등 만들기" },
          'M5·기초·1': { title: "여기도, 저기도 블루투스?", detail: "블루투스의 원리 알고 스피커 만들기" },
          'M6·기초·1': { title: "보이지 않는 빛을 따라서", detail: "IR 센서 이해하고 IR 자동차 만들기" }
        },
        중급: {
          'M1·기초·1': { title: "버튼 NO! 똑똑한 무드등", detail: "조도센서의 원리 알고 무드등 만들기" },
          'M5·기초·1': { title: "여기도, 저기도 블루투스?", detail: "블루투스의 원리 알고 스피커 만들기" },
         ' M6·기초·1': { title: "보이지 않는 빛을 따라서", detail: "IR 센서 이해하고 IR 자동차 만들기" }
        },
        심화: {
          'M1·기초·1': { title: "버튼 NO! 똑똑한 무드등", detail: "조도센서의 원리 알고 무드등 만들기" },
          'M5·기초·1': { title: "여기도, 저기도 블루투스?", detail: "블루투스의 원리 알고 스피커 만들기" },
          'M6·기초·1': { title: "보이지 않는 빛을 따라서", detail: "IR 센서 이해하고 IR 자동차 만들기" }
        }
      },
      C: {
        기초: {
          'C1·공통·1': { title: "컴퓨터와 대화할 수 있다면", detail: "알고리즘과 이진법 이해하기" },
          'C2·공통·1': { title: "컴퓨팅 사고력 Level UP!", detail: "코드모스 컴퓨팅 사고력 테스트" },
          'C1·기초·1': { title: "내 손으로 만드는 무한의 계단", detail: "코스페이시스를 활용한 게임 메이킹" }
        },
        중급: {
          'C3·기초·1': { title: "말 한마디로 다 되는 세상이 있다?", detail: "음성인식의 원리를 이용한 나만의 집 만들기" },
          'C1·중급·1': { title: "이번 게임은 제가 이겼습니다.", detail: "틱택토와 하노이탑으로 배우는 알고리즘" },
          'C4·중급·1': { title: "작은 친구는 앞으로! 큰 친구는 뒤로!", detail: "정렬, 비정렬 알고리즘 배우기"}
        },
        심화: {
          'C2·심화·2': { title: "AI 노바와 함께 Mission Clear!", detail: "AI 노바를 활용하여 미션 수행하기" },
          'C7·중급·3': { title: "블록이 모여 게임이 되는 마법", detail: "블록 코딩으로 만들어보는 아케이드 게임" },
          'C6·중급·2': { title: "마인크래프트, 어디까지 해봤니?", detail: "코딩으로 플레이하는 마인크래프트" }
        }
      }
};
