import Image from 'next/image';
import { useRouter } from 'next/router';

import baseImagePath from '@/api/baseImagePath';
import CustomButton from '@/components/Button';

import { FeatureSectionStyled } from './styled';

const FeatureSection = () => {
  const router = useRouter();
  return (
    <FeatureSectionStyled>
      <div className="topWrapper">
        <div className="step">
          <div className="stepTitle">
          <div className="title">검사 시작하기</div>
          <Image
            src={`${baseImagePath}/assets/main/startTest.png`}
            alt="main"
            width={100}
            height={100}
          />
          </div>
          <div className="subTitle">
            디지털 지식, 인공지능 이해, 만들기 능력,
            <br />
            컴퓨팅 역량을 평가해보세요.
          </div>
        </div>
        <div className="step">
        <div className="stepTitle">
          <div className="title">결과 확인하기</div>
          <Image
            src={`${baseImagePath}/assets/main/checkResult.png`}
            alt="main"
            width={100}
            height={100}
          />
          </div>
          <div className="subTitle">
            각 역량별 점수를 확인하고, 나의 강점과
            <br />
            발전이 필요한 부분을 알아보세요.
          </div>
        </div>
        <div className="step">
        <div className="stepTitle">
        <div className="title">내 잠재력 확인하기</div>
          <Image
            src={`${baseImagePath}/assets/main/checkPotential.png`}
            alt="main"
            width={100}
            height={100}
          />
          </div>
          <div className="subTitle">
            결과를 바탕으로 추천받는 활동과
            <br /> 학습 경로를 통해 더욱 성장할 수 있어요.
          </div>
        </div>
      </div>
      <CustomButton
        btnText={'시작하기!'}
        textColor="#01B5F0"
        onClick={() => {
          router.push('/agree');
        }}
        className="startBtn"
      />
    </FeatureSectionStyled>
  );
};

export default FeatureSection;
