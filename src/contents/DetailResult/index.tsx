import { use, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import CustomProgressBar from '@/components/QuestionProgressBar';
import SharkBanner from '@/components/SharkBanner';

import { DetailResultStyled } from './styled';
import { LeftCircleOutlined } from '@ant-design/icons';
import CustomButton from '@/components/Button';

const DetailResult = () => {
  const router = useRouter();

  const type = router.query.type;
  const score = Number(router.query.score);

  const [bgType, setBgType] = useState('');
  const [scoreText, setScoreText] = useState('');
  const [typeText, setTypeText] = useState('');
  const [description, setDescription] = useState('');

  const detailHtml = {
    D: {
      underFiftyBg:
        '당신의 디지털 지식은 아직 기초 단계에 있습니다. </br> 컴퓨터나 스마트폰 같은 디지털 기기를 사용하는 데 어려움을 느낄 수 있으며, <br/> 인터넷에서 정보를 찾거나 디지털 도구를 활용하는 데 익숙하지 않을 수 있습니다. <br/> 이 상태에서는 디지털 기기를 사용할 때 실수를 하거나 혼란을 느낄 수 있습니다.<br/>하지만 걱정하지 마세요! 디지털 기술은 연습을 통해 익힐 수 있습니다. <br/>기초적인 디지털 도구를 사용해보는 것부터 시작해서 점차 익숙해지도록 연습해보세요.',
      underSeventyFiveBg:
        '당신은 디지털 기술에 대해 어느 정도 익숙하며, <br/> 컴퓨터와 스마트폰을 사용해 기본적인 작업을 할 수 있습니다. <br/>예를 들어, 인터넷에서 정보를 검색하거나, 간단한 프로그램을 사용해본 경험이 있을 것입니다. <br/>이 정도의 디지털 지식은 학교나 집에서 필요한 대부분의 디지털 작업을 수행하는 데 충분합니다. <br/>하지만 더 복잡한 작업에서는 약간의 어려움을 느낄 수 있습니다.<br/>더 다양한 디지털 도구를 시도해보고, 새로운 기술을 배워보는 것이 좋습니다. <br/>이를 통해 디지털 세계에서 더 자신감을 가질 수 있습니다.',
      underNinetyBg:
        '당신은 디지털 기술을 매우 잘 이해하고 있으며, 다양한 디지털 기기를 능숙하게 다룰 수 있습니다.<br/> 인터넷에서 필요한 정보를 빠르게 찾거나, 여러 디지털 도구를 활용해 창의적인 작업을 수행할 수 있습니다. <br/> 당신은 새로운 디지털 기술에 흥미를 느끼고, 빠르게 배우는 능력이 있습니다.<br/>이 정도의 역량을 가지고 있다면, 다양한 디지털 프로젝트에서 주도적인 역할을 할 수 있습니다.<br/>디지털 기술을 이용해 자신만의 창의적인 프로젝트를 만들어보고, <br/>친구들과 함께 협력하는 것도 좋습니다.',
      overNinetyBg:
        '당신은 디지털 기술에 매우 뛰어난 능력을 가지고 있으며,<br/> 다양한 디지털 기기를 자유자재로 사용할 수 있습니다.<br/>최신 디지털 도구와 프로그램을 빠르게 익히고, 창의적인 방법으로 활용할 수 있습니다. <br/>디지털 환경에서 발생하는 대부분의 문제를 스스로 해결할 수 있으며,<br/>다른 사람들에게 디지털 기술을 가르쳐 줄 수 있는 능력도 가지고 있습니다.<br/>당신은 디지털 프로젝트에서 리더 역할을 맡아, 팀원들과 함께 혁신적인 결과물을 만들어낼 수 있습니다.<br/>이 역량을 바탕으로 더욱 도전적인 디지털 프로젝트에 참여해보세요.<br/>',
    },
    I: {
      underFiftyBg:
        '당신은 인공지능(AI)에 대한 이해가 아직 부족한 상태입니다.<br/>AI가 무엇인지, 어떻게 작동하는지에 대해 배우는 것이 필요합니다.<br/>예를 들어, 인공지능이 사진 속 사람을 인식하거나,<br/>게임에서 상대방의 움직임을 예측하는 방식에 대해 궁금해할 수 있습니다.<br/>AI 기술을 배우기 위해 간단한 AI 예제나 게임을 통해 인공지능의 기본 개념을 접해보세요.<br/>새로운 기술을 배우는 과정에서 AI에 대한 흥미가 생길 수 있습니다.',
      underSeventyFiveBg:
        '당신은 인공지능에 대해 기본적인 이해를 가지고 있습니다.<br/>AI가 어떻게 작동하는지, 일상생활에서 어떻게 활용되는지에 대해 알고 있으며,<br/>간단한 AI 프로그램이나 게임을 사용해본 경험이 있을 것입니다.<br/>예를 들어, AI가 어떻게 사람의 목소리를 인식하거나,<br/> 사진 속 물체를 분류하는지 이해하고 있을 수 있습니다.<br/>이 단계에서는 AI에 대해 더 깊이 배우고, 작은 AI 프로젝트에 참여해보는 것이 좋습니다.<br/>이를 통해 AI 기술에 대한 이해를 넓히고, 문제 해결 능력을 키울 수 있습니다.',
      underNinetyBg:
        '당신은 인공지능에 대해 높은 수준의 이해를 가지고 있으며,<br/>AI가 다양한 분야에서 어떻게 사용되는지 잘 알고 있습니다.<br/>예를 들어, AI를 활용해 간단한 게임을 만들거나,<br/> 데이터를 분석하는 프로그램을 작성할 수 있는 능력을 가지고 있을 수 있습니다.<br/>당신은 AI가 문제를 해결하는 방식에 대해 깊이 이해하고 있으며,<br/>이를 통해 창의적인 프로젝트를 수행할 수 있습니다.<br/>새로운 AI 기술을 배우고, 이를 적용해 더 복잡한 문제를 해결하는 도전에 나서보세요.',
      overNinetyBg:
        '당신은 인공지능에 대한 매우 뛰어난 역량을 가지고 있으며,<br/>AI를 활용해 다양한 문제를 해결할 수 있습니다.<br/>예를 들어, AI를 사용해 데이터를 분석하거나, <br/>게임에서 상대방의 움직임을 예측하는 프로그램을 만들 수 있을 것입니다.<br/>AI 기술을 통해 창의적인 아이디어를 실현하고, <br/>친구들과 협력해 복잡한 AI 프로젝트를 주도할 수 있습니다.<br/>이 역량을 바탕으로 더 도전적인 AI 프로젝트를 시도하고, AI 기술을 더욱 깊이 있게 탐구해보세요.',
    },
    M: {
      underFiftyBg:
        '당신은 물건을 만들거나 조립하는 활동에 아직 익숙하지 않을 수 있습니다.<br/>예를 들어, 레고나 간단한 공작 활동에서 어려움을 느낄 수 있습니다.<br/> 만들기 활동에서 실수를 하거나, 복잡한 조립 과정에서 혼란을 겪을 수 있습니다.<br/>하지만 걱정하지 마세요! 만들기는 연습을 통해 익힐 수 있습니다.<br/>간단한 만들기 프로젝트부터 시작해서, 점차 더 복잡한 도구와 재료를 사용해보세요.<br/>조금씩 만들기에 익숙해지면서 자신감을 키울 수 있습니다.',
      underSeventyFiveBg:
        '당신은 만들기 활동에 대해 기본적인 이해를 가지고 있으며,<br/>간단한 물건을 조립하거나 만드는 데 능숙합니다.<br/>예를 들어, 종이, 나무, 플라스틱 등의 재료를 사용해 작은 프로젝트를 완성할 수 있습니다.<br/>만들기를 통해 창의적인 아이디어를 실현하는 데 흥미를 느끼며, <br/>새로운 도구를 시도해보는 것도 좋아합니다.<br/>더 다양한 재료와 도구를 사용해보며, 자신만의 창의적인 작품을 만들어보세요.<br/>이를 통해 더 큰 프로젝트에도 도전할 수 있습니다.',
      underNinetyBg:
        '당신은 만들기 활동에서 뛰어난 능력을 발휘하며,<br/>다양한 재료와 도구를 사용해 복잡한 프로젝트를 완성할 수 있습니다.<br/>예를 들어, 로봇을 조립하거나, 전자 기기를 만드는 프로젝트에 참여할 수 있습니다.<br/>만들기를 통해 창의적인 아이디어를 실제로 구현하며,<br/>친구들과 협력해 대형 프로젝트를 수행하는 데도 자신이 있습니다.<br/>이 역량을 바탕으로 더 복잡한 만들기 프로젝트에 도전해보세요.<br/>새로운 기술을 배우고, 자신만의 독창적인 작품을 만들어보세요.',
      overNinetyBg:
        '당신은 만들기 활동에서 매우 뛰어난 역량을 가지고 있습니다.<br/>다양한 재료와 도구를 자유롭게 활용하여 창의적인 프로젝트를 주도적으로 수행할 수 있으며,<br/>복잡한 만들기 과정도 잘 해결할 수 있습니다.<br/>예를 들어, 로봇을 설계하고 조립하거나, 전자 기기를 제작하는 프로젝트를 주도할 수 있습니다.<br/>친구들에게 만들기 기술을 가르쳐주거나,<br/>팀을 이끌어 큰 프로젝트를 성공적으로 완성할 수 있는 리더십을 갖추고 있습니다.<br/>이 능력을 바탕으로 더욱 도전적인 만들기 프로젝트에 참여해보세요.',
    },
    C: {
      underFiftyBg:
        '당신은 컴퓨터를 사용하는 데에 아직 익숙하지 않으며,<br/>기본적인 코딩 작업에서도 어려움을 겪을 수 있습니다.<br/>예를 들어, 간단한 프로그램을 작성하거나,<br/>컴퓨터에서 명령어를 입력하는 데 어려움을 느낄 수 있습니다.<br/>컴퓨터 기초를 배우고, 블록 코딩 같은 쉬운 방법으로 프로그램을 작성해보는 것이 좋습니다.<br/>이를 통해 컴퓨팅에 대한 자신감을 키우고, <br/>점차 더 복잡한 문제를 해결할 수 있는 능력을 길러보세요.',
      underSeventyFiveBg:
        '당신은 컴퓨터와 코딩에 대해 기본적인 이해를 가지고 있으며,<br/>간단한 프로그램을 작성할 수 있습니다.<br/>예를 들어, 블록 코딩이나 간단한 프로그래밍 언어를 사용해 본 경험이 있을 것입니다.<br/>컴퓨터를 사용해 문제를 해결하는 방식에 대해 흥미를 가지고 있으며,<br/>더 많은 코딩 프로젝트에 참여해보고 싶을 것입니다.<br/>새로운 코딩 언어나 프로젝트에 도전해보면서, 컴퓨팅 기술을 더 발전시켜보세요.',
      underNinetyBg:
        '당신은 컴퓨팅 기술에 매우 능숙하며,<br/>다양한 코딩 언어를 사용해 간단한 프로그램을 작성할 수 있습니다.<br/>예를 들어, 간단한 게임을 만들거나 데이터를 정리하는 프로그램을 <br/>작성할 수 있는 능력을 가지고 있을 것입니다.<br/>문제를 해결하기 위해 알고리즘을 설계하고,<br/>컴퓨터를 활용해 창의적인 프로젝트를 완성하는 데 능숙합니다.<br/>더 복잡한 프로젝트에 도전하며, 컴퓨팅 기술을 더욱 발전시켜보세요.',
      overNinetyBg:
        '당신은 컴퓨팅 기술에서 탁월한 능력을 발휘합니다.<br/>다양한 프로그래밍 언어를 자유롭게 사용할 수 있으며,<br/>창의적인 프로젝트를 수행하기 위해 알고리즘을 설계하고 구현할 수 있습니다.<br/>예를 들어, 간단한 소프트웨어를 개발하거나, <br/>친구들과 함께 코딩 프로젝트를 주도할 수 있을 것입니다.<br/>새로운 컴퓨팅 아이디어를 실현해보고,<br/>컴퓨팅 기술을 통해 더 큰 문제를 해결하는 도전적인 프로젝트에 참여해보세요.',
    },
  };

  useEffect(() => {
    // 백그라운드 이미지 설정
    // 점수 구간 텍스트 설정
    if (score < 50) {
      setBgType('underFiftyBg');
      setScoreText('50% 미만');
    } else if (score < 75) {
      setBgType('underSeventyFiveBg');
      setScoreText('50% 이상 ~ 75% 미만');
    } else if (score < 90) {
      setBgType('underNinetyBg');
      setScoreText('75% 이상 ~ 90% 미만');
    } else {
      setBgType('overNinetyBg');
      setScoreText('90% 이상');
    }

    // 역량 타입 텍스트 설정
    if (type === 'D') {
      setTypeText('Digital Knowledge');
    } else if (type === 'I') {
      setTypeText('Artificial Intelligence');
    } else if (type === 'M') {
      setTypeText('Making');
    } else if (type === 'C') {
      setTypeText('Computing');
    }

    // 설명 설정
    if (type === 'D') {
      if (score < 50) {
        setDescription(detailHtml.D.underFiftyBg);
      } else if (score < 75) {
        setDescription(detailHtml.D.underSeventyFiveBg);
      } else if (score < 90) {
        setDescription(detailHtml.D.underNinetyBg);
      } else {
        setDescription(detailHtml.D.overNinetyBg);
      }
    }
    if (type === 'I') {
      if (score < 50) {
        setDescription(detailHtml.I.underFiftyBg);
      } else if (score < 75) {
        setDescription(detailHtml.I.underSeventyFiveBg);
      } else if (score < 90) {
        setDescription(detailHtml.I.underNinetyBg);
      } else {
        setDescription(detailHtml.I.overNinetyBg);
      }
    }
    if (type === 'M') {
      if (score < 50) {
        setDescription(detailHtml.M.underFiftyBg);
      } else if (score < 75) {
        setDescription(detailHtml.M.underSeventyFiveBg);
      } else if (score < 90) {
        setDescription(detailHtml.M.underNinetyBg);
      } else {
        setDescription(detailHtml.M.overNinetyBg);
      }
    }
    if (type === 'C') {
      if (score < 50) {
        setDescription(detailHtml.C.underFiftyBg);
      } else if (score < 75) {
        setDescription(detailHtml.C.underSeventyFiveBg);
      } else if (score < 90) {
        setDescription(detailHtml.C.underNinetyBg);
      } else {
        setDescription(detailHtml.C.overNinetyBg);
      }
    }
  }),
    [type, score];

  return (
    <DetailResultStyled $bgType={bgType}>
      <div className="mainContent">
        <div className="questionType">
          {type}({typeText}) 역량{' '}
        </div>
        <div className="scoreText">{scoreText}</div>
        <div className="scoreTextWrapper">
          <div className="zeroToHundred">0%</div>
          <div className="zeroToHundred">100%</div>
        </div>
        <CustomProgressBar
          total={100}
          nowIndex={score}
          baseColor="#ffffff"
          progressColor="#002337"
          typeData="F"
        />
        <div
          className="descriptionWrapper"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <CustomButton
          btnText={'결과페이지로 돌아가기'}
          textColor="#007196"
          onClick={() => {
            router.push('/result');
          }}
          className="backBtn"
        />
      </div>
      <SharkBanner />
    </DetailResultStyled>
  );
};

export default DetailResult;
