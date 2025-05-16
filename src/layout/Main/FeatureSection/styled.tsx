import styled from 'styled-components';

export const FeatureSectionStyled = styled.div`
  /* height: calc(1080px - 88px); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 160px; */
  /* gap: 312px; */

  .topWrapper {
    display: flex;
    margin: 0 auto;
    gap: 64px;
    .step {
      width: 300px;
      height: 320px;
      background-color: #fff;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      border-radius: 80px 0;
      /* border: 7px solid #009BCE; */
      border: 5px solid #009bce;
      .stepTitle{
        display: flex;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
        padding: 30px 0;
        }
      }
      .title {
        /* font-size: 32px; */
        font-size: 24px;
        font-family: 'PyeongtaegAnbocheRegular';
        color: #0095c6;
        line-height: 2;
        text-align: center;
      }
      .subTitle {
        /* font-size: 16px; */
        font-size: 14px;
        font-family: 'PtBandocheRegular';
        color: #005672;
        line-height: 1.5;
        text-align: center;
      }
    }
  }
  .startBtn {
    background-color: #fff;
    width: 260px;
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 36px;
    font-family: 'PyeongtaegAnbocheRegular';
    font-size: 30px;

    /* margin: 312px 0 234px; */
    margin: 200px 0 700px;

    transition-duration: 0.3s;
  }

  .startBtn:hover {
    transform: scale(1.1, 1.1);
    transition-duration: 0.5s;
  }

/* 태블릿 */
@media (max-width: 768px) {

}
/* 모바일 */
@media (max-width: 480px) {
  width: 100vw;
  margin: 20px 0;
  .topWrapper {
    width:100%;
    display: flex;
    margin: 0;
    gap: 10px;
    flex-direction: column;

    .step {
      width: 85%;
      height: 70px;
      margin: auto;

      flex-direction: row;
      border-radius: 15px;

      border: 2px solid #009bce;

      .stepTitle{
        img {
        padding: 0;
        width: 40px;
        }
        .title {
          width: 80px;
          font-weight: bold;
          font-size: 10px;
          line-height: 2;
          white-space: nowrap;
        }
      }
      .subTitle {
        font-size: 9.5px;
        font-weight: bold;
      }
    }
  }
  .startBtn {
    width: 100px;
    height: 30px;

    padding: 0px;
    border-radius: 15px;
    font-size: 12px;

    margin: 50px 0px;

    transition-duration: 0.3s;
  }

  .startBtn:hover {
    transform: scale(1.1, 1.1);
    transition-duration: 0.5s;
  } 
}
`;
