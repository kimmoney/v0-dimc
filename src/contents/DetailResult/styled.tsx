import styled from 'styled-components';

export const DetailResultStyled = styled.div<{
  $bgType: string;
}>`
  width: 100%;
  height: calc(100vh - 88px - 100px);
  background-image: url('/assets/result/after/${props => props.$bgType}.png');
  background-size: cover;
  background-position: top;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  .mainContent {
    width: 1024px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .questionType {
      font-size: 36px;
      color: #fff;
      font-family: 'PyeongtaegAnbocheRegular';
      margin-bottom: 40px;
    }
    .scoreTextWrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    }
    .zeroToHundred,
    .scoreText {
      font-size: 16px;
      color: #fff;
      font-family: 'PyeongtaegAnbocheRegular';
    }

    .descriptionWrapper {
      width: 100%;
      padding: 50px 30px;
      margin: 40px 0 60px;
      background-color: #fff;
      text-align: center;
      border-radius: 24px;

      font-size: 20px;
      font-family: 'PyeongtaegAnbocheRegular';
      color: #006387;
    }
    .backBtn{
      background-color: #fff;
      width: 240px;
      display: flex;
      justify-content: center;
      padding: 16px;
      border-radius: 50px;
      border: 3px solid #01b5f0;
      font-family: 'PyeongtaegAnbocheRegular';

      transition-duration: 0.3s;
    }
    .backBtn:hover{
      transform: scale(1.1, 1.1);
      transition-duration: 0.5s;
    }
  }
@media (max-width: 480px) {
  height: 100%;
  .mainContent{
    width: 100vw;

    .questionType{
      margin-top: 40px;
      font-size: 20px;
    }
    .descriptionWrapper{
      width: 90%;
      font-size: 14px;
      margin-bottom: 40px;
    }
    .backBtn{
      margin-bottom: 110px;
    }
  }
}
`;
