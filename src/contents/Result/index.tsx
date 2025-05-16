import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import CustomButton from '@/components/Button';
import SharkBanner from '@/components/SharkBanner';
import RadarSection from '@/layout/Result/RadarSection';
import SharkSection from '@/layout/Result/SharkSection';
import { getSharkTypeByScore } from '@/util/getSharkTypeByScore';
import PDFDownload from '@/util/PDFDownload';
import CurriculumModal from '@/contents/Curriculum';
import { Score } from '@/contents/Curriculum/curriculumData';



import { Modal } from 'antd';

import { ResultPageStyled } from './styled';

const ResultPage = () => {
  const router = useRouter();
  const [answerData, setAnswerData] = useState<string | null>(null);
  const [personalInfoData, setPersonalInfoData] = useState<string | null>(null);
  const [name, setNameData] = useState('');
  const [isCurriculumVisible, setIsCurriculumVisible] = useState(false);

  useEffect(() => {
    setAnswerData(localStorage.getItem('answer') || '{}');
    setPersonalInfoData(localStorage.getItem('personalinfo') || '{}');
  }, []);

  const score = [
    { type: 'D', score: 40 },
    { type: 'I', score: 40 },
    { type: 'M', score: 40 },
    { type: 'C', score: 40 },
  ];

  if (answerData) {
    const answer = JSON.parse(answerData);
    answer.D &&
      Object.values(answer.D).forEach(
        (item: any) => (score[0].score += item.score),
      );
    answer.I &&
      Object.values(answer.I).forEach(
        (item: any) => (score[1].score += item.score),
      );
    answer.M &&
      Object.values(answer.M).forEach(
        (item: any) => (score[2].score += item.score),
      );
    answer.C &&
      Object.values(answer.C).forEach(
        (item: any) => (score[3].score += item.score),
      );
  }

  useEffect(() => {
    if (personalInfoData) {
      const personalInfo = JSON.parse(personalInfoData);
      setNameData(personalInfo.name);
    }
  }, [personalInfoData]);

  // 상어 타입 설정
  const sharkType = getSharkTypeByScore({
    dscore: score[0].score,
    iscore: score[1].score,
    mscore: score[2].score,
    cscore: score[3].score,
  });
  
  
  const showCurriculum = () => {
    setIsCurriculumVisible(true);
  };

  const closeCurriculum = () => {
    setIsCurriculumVisible(false);
  };


  return (
    <ResultPageStyled>
      <SharkSection sharkType={sharkType} />
      <RadarSection
        dScore={score[0].score}
        iScore={score[1].score}
        mScore={score[2].score}
        cScore={score[3].score}
      />
      <div className="curriculumWrapper">
        <Image
          src={`/assets/result/after/curriculumImg.png`}
          alt="main"
          width={1000}
          height={1000}
          className="curriculumImg"
        />
        <div className="lastTextWrapper">
          &quot; DIMC 검사는 DORO가 개발한 역량 진단 도구로,
          <br /> 여러분의 디지털 미래를 위한 나침반이 되어드립니다. &quot;
        </div>
      </div>

      <div className="floatingBtnWrapper">
        <CustomButton
          btnText="테스트 종료"
          textColor="#006387"
          onClick={() => {
            Modal.confirm({
              title: '테스트 종료',
              content:
                '테스트 종료시 결과가 삭제됩니다. 정말로 종료하시겠습니까?',
              onOk() {
                localStorage.clear();
                router.push('/');
              },
            });
          }}
          className="endBtn"
        />
        {/* TODO : 개인정보 연동 */}
        <PDFDownload
          className="printBtn"
          name={name}
          sharkType={sharkType}
          dScore={score[0].score}
          iScore={score[1].score}
          mScore={score[2].score}
          cScore={score[3].score}
        />
        <CustomButton
          btnText="AI 기반 추천 커리큘럼"
          textColor="#006387"
          onClick={showCurriculum}
          className="curriculumBtn"
        />
      </div>


      {isCurriculumVisible && (
        <CurriculumModal 
          scores = {score as Score[]}
          onClose={closeCurriculum}
        />
      )}

      <SharkBanner />
    </ResultPageStyled>
  );
};

export default ResultPage;