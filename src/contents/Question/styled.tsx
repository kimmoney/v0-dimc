import styled from 'styled-components';

export const QuestionPageStyled = styled.div<{
  $bgNum: number;
}>`
  height: 100%;
  min-height: calc(100vh - 88px);
  background-color: #fff;
  background-image: url('/assets/question/questionBg${props => props.$bgNum}.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;

  padding: 60px 80px;

  display: flex;
  flex-direction: column;

  align-items: center;

  @media (max-width: 480px) {
  padding: 10px;
}
`;
