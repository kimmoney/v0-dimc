import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import CustomProgressBar from '@/components/QuestionProgressBar';
import TextTypeQuestionComponent from '@/components/TextTypeQuestion';

import { QuestionPageStyled } from './styled';

// 질문 데이터의 타입을 정의
interface Question {
  id: number;
  order: number;
  type: string;
  questionDescription: string;
  question: string;
  questionImage?: string;
  options: {
    id: number;
    value: number;
    label: string;
    score: number;
    image?: string;
  }[];
}


const QuestionPage = () => {
  const router = useRouter();
  const nowId = router.query.id;

  const [questionData, setQuestionData] = useState<Question[]>([]);

  useEffect(() => {
    fetch('/api/getData')
      .then(res => res.json())
      .then(data => {

        const custom = data.map((item:any) => {
          return {
            id: item.id,
            order: item.order,
            type: item.type,
            questionDescription: item.description,
            question: item.question,
            questionImage: item.questionImage,
            options: [
              { id: 1, value: 1, label: item.option1, score: item.score1, image: item.optionImage1 },
              { id: 2, value: 2, label: item.option2, score: item.score2, image: item.optionImage2 },
              { id: 3, value: 3, label: item.option3, score: item.score3, image: item.optionImage3 },
              { id: 4, value: 4, label: item.option4, score: item.score4, image: item.optionImage4 },
            ]
          };
        });

        setQuestionData(custom);
      });
  }, []);

  // questionData.order를 넘김 10 이상인 경우에는 10으로 변경
  const bgNum = questionData[Number(nowId)]?.order >= 10 ? 10 : questionData[Number(nowId)]?.order;

  return (
    <QuestionPageStyled $bgNum = {bgNum}>
      <CustomProgressBar
        total = {questionData.length}
        nowIndex={Number(nowId)+1}
        typeData={questionData[Number(nowId)]?.type}
      />
      <TextTypeQuestionComponent questionData={questionData[Number(nowId)]} lastQuestionIndex={questionData.length - 1}/>
    </QuestionPageStyled>
  );
};

export default QuestionPage;