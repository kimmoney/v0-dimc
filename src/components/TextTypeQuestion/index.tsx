import { use, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import baseImagePath from '@/api/baseImagePath';

import { Modal } from 'antd';

import CustomButton from '../Button';
import CustomRadio from '../Radio';
import { TextTypeQuestionStyled } from './styled';
import Image from 'next/image';

interface TextTypeQuestionProps {
  lastQuestionIndex: number;
  questionData: {
    id: any;
    order: number;
    type: string; // 'D' | 'I' | 'M' | 'C';
    questionDescription: string;
    question: string;
    questionImage?: string;
    options: Array<{
      label: any;
      value: string | number;
      id?: string | number;
      score: number;
      image?: string;
    }>;
  };
}

const TextTypeQuestionComponent = ({
  lastQuestionIndex,
  questionData,
}: TextTypeQuestionProps) => {
  const router = useRouter();

  //문제별 선택한 답안을 useState로 저장
  const [answer, setAnswer] = useState<string | number>('');

  //이전 페이지로 가도 localStorage에 저장된 답안을 유지하기 위해
  //현재 페이지에 진입 시 localStorage에 저장된 답안을 불러옴
  const [answerData, setAnswerData] = useState<any>({});

  const [personalData, setPersonalData] = useState<any>({});

  // "잘 모르겠다" 옵션 추가

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAnswerData(JSON.parse(localStorage.getItem('answer') || '{}'));
      setPersonalData(JSON.parse(localStorage.getItem('personalinfo') || '{}'));
    }
  }, []);

  useEffect(() => {
    setAnswerData(JSON.parse(localStorage.getItem('answer') || '{}'));

    const selectedAnswer =
      answerData[questionData?.type]?.[questionData?.order]?.answer;

    setAnswer('');
    !!selectedAnswer && setAnswer(selectedAnswer);
    console.log('answerData', answerData);
  }, [router.query.id]);

  const extendedOptions = questionData?.options
  ? [
      ...questionData.options,
      { label: '잘 모르겠다', value: 'unknown', score: 0 },
    ]
  : [];

  //-------------------------------------------------------------------
  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    const nextId = Number(router.query.id) + 1;
    router.push(`${nextId}`);
  };

  //-------------------------------------------------------------------
  // 답안을 localStorage에 저장하는 함수

  const saveDataInLocalstorage = () => {
    //답안을 전역에 저장하고 answer을 초기화
    if (answer) {
      const newAnswerData = {
        ...answerData,
        [questionData?.type]: {
          ...answerData[questionData?.type],
          [questionData?.order]: {
            answer: answer,
            score: extendedOptions?.find(item => item.value === answer)
              ?.score,
          },
        },
      };
      localStorage.setItem('answer', JSON.stringify(newAnswerData));
    }
  };

  //-------------------------------------------------------------------
  // 데이터 DB에 저장 함수

  const score = [
    { type: 'D', score: 40 },
    { type: 'I', score: 40 },
    { type: 'M', score: 40 },
    { type: 'C', score: 40 },
  ];

  if (answerData) {
    answerData.D &&
      Object.values(answerData.D).forEach(
        (item: any) => (score[0].score += item.score),
      );
    answerData.I &&
      Object.values(answerData.I).forEach(
        (item: any) => (score[1].score += item.score),
      );
    answerData.M &&
      Object.values(answerData.M).forEach(
        (item: any) => (score[2].score += item.score),
      );
    answerData.C &&
      Object.values(answerData.C).forEach(
        (item: any) => (score[3].score += item.score),
      );
  }

  const saveData = async () => {
    const data = {
      name: personalData?.name,
      englishname: personalData?.englishname,
      birth: personalData?.birth,
      email: personalData?.email,
      phone: personalData?.phone,
      gender: personalData?.gender,
      dscore: score[0].score,
      iscore: score[1].score,
      mscore: score[2].score,
      cscore: score[3].score,
      answer: JSON.stringify(answerData),
    };

    const response = await fetch('/api/saveData', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
  };

  //-------------------------------------------------------------------

  const isImageOption = questionData?.options.some(item => item.image);
  const getId = questionData?.id;
  
  return (
    <TextTypeQuestionStyled isImageOption={isImageOption} getId={getId}>
      <div className="questionPart">
        <div className="questionWrapper">

          <div className="questionContainer">
            <div className="index">{questionData?.order < 10 ? `0${questionData?.order}` : questionData?.order}</div>
            <div className="question">{questionData?.question}</div>
          </div>
          {questionData?.questionImage && (
             <Image
              src={`${baseImagePath}/assets/dimcImg/question/${questionData?.questionImage}`}
              className='questionImage'
              alt="questionImage"
              width={1000}  
              height={1000} 
            />
          )}
        </div>
        <div className="optionWrapper">
          <CustomRadio
            options={extendedOptions}
            value={answer}
            setValue={setAnswer}
            parentClassName="radioWrapper"
            className="radioOption"
          />
        </div>
        <div className="tipContainer">
          <div className="questionDescription">
          <div className="tipText">TIP!</div>
            {questionData?.questionDescription}
          </div>
        </div>
      </div>
      <div className="btnWrapper">
        {router.query.id !== '0' && (
          <CustomButton
            btnText={'◀ 이전 문제'}
            textColor="#007196"
            onClick={() => {
              router.push(`${Number(router.query.id) - 1}`);
            }}
            className="nextBtn"
          />
        )}
        {/* 다음 문제로 이동하는 버튼, 다음 인덱스가 있는 경우에만 표출 */}
        {Number(router.query.id) < lastQuestionIndex && (
          <CustomButton
            btnText={'다음 문제 ▶'}
            textColor="#007196"
            onClick={() => {
              saveDataInLocalstorage();
              if (answer) {
                nextPage();
              } else {
                Modal.warning({
                  title: '알림',
                  content: '답안을 선택해주세요.',
                });
              }
            }}
            className="nextBtn"
          />
        )}
        {/* 마지막 문제인 경우 제출하기 버튼으로 변경 */}
        {Number(router.query.id) === lastQuestionIndex && (
          <CustomButton
            btnText={'제출하기'}
            textColor="#007196"
            onClick={() => {
              saveDataInLocalstorage();
              saveData();
              router.push('/before-result');
            }}
            className="nextBtn"
          />
        )}
      </div>
    </TextTypeQuestionStyled>
  );
};

export default TextTypeQuestionComponent;
