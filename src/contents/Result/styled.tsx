import styled from 'styled-components';

export const ResultPageStyled = styled.div`
  background-color: #003243;

  background-image: url('/assets/result/after/topWrapperBg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;

  height: calc(3 * (1080px - 88px - 100px) + 200px);

  overflow-y: scroll;
  /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
  :-webkit-scrollbar {
    display: none;
  }
  /* 인터넷 익스플로러 */
  -ms-overflow-style: none;
  /* 파이어폭스 */
  scrollbar-width: none;

  padding-bottom: 100px;

  .curriculumWrapper {
    height: calc(1080px - 88px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 140px;

    .lastTextWrapper {
      color: #fff;
      font-size: 24px;
      font-family: 'PtBandocheBold';
      text-align: center;
    }
  }

  .floatingBtnWrapper {
    display: flex;
    flex-direction: column;
    position: fixed;
    gap: 10px;
    top: 110px;
    right: 30px;
  }
  .printBtn,
  .endBtn {
    background-color: #fff;
    text-align: center;
    width: 170px;
    padding: 10px;
    border-radius: 24px;
    border: 1px solid #006387;

    font-size: 14px;
    font-family: 'PtBandocheBold';

    transition-duration: 0.3s;
  }
  .endBtn:hover,
  .printBtn:hover {
    transform: scale(1.1, 1.1);
    transition-duration: 0.5s;
  }
  .curriculumBtn {
    background-color: #fff;
    text-align: center;
    width: 170px;
    padding: 10px;
    border-radius: 24px;
    border: 1px solid #006387;

    font-size: 14px;
    font-family: 'PtBandocheBold';

    transition-duration: 0.3s;
  }
  .curriculumBtn:hover{
    transform: scale(1.1, 1.1);
    transition-duration: 0.5s;
  }

@media (max-width: 480px) {
  height: auto;
  .curriculumWrapper {
    margin-top: 200px;
    height: 500px;
    gap: 100px;
    .curriculumImg{
      width: 90%;
    }
    .lastTextWrapper {
      margin-bottom: auto;
      font-size: 4.1vw;
    }
  }
  .floatingBtnWrapper {
    top: 100px;
    right: 10px;
  }
  .printBtn,
  .endBtn {
    width: 130px;
    padding: 5px;
    border-radius: 15px;
    font-size: 13px;
  },
  .curriculumBtn {
    width: 130px;
    padding: 5px;
    border-radius: 15px;
    font-size: 13px;
  }
}


`;
