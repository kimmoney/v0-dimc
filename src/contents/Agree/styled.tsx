import styled from 'styled-components';

export const AgreePageStyled = styled.div`
background-color: #fff;
background-image: url('/assets/main/mainFirstBg.png');
background-position: center top; /* 배경 이미지 위치를 중앙 상단으로 설정 */
background-size: cover;
background-repeat: no-repeat;

min-height: 100vh;

  .agreeContainer {
    margin: auto;
    padding: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    img{
    padding-top: 20px;
    padding-bottom: 30px;
    }

    /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
    .agreeContent::-webkit-scrollbar {
      display: none;
    }
    .agreeContent {
      /* 인터넷 익스플로러 */
      -ms-overflow-style: none;
      /* 파이어폭스 */
      scrollbar-width: none;
    }

    .agreeContent {
      background-color: #fff;
      width: 777px;
      height: 800px;
      padding: 60px 175px;

      border-radius: 70px;
      border: 9px solid #7edfff;

      overflow-y: auto;

      color: #003c5b;

      display: flex;
      flex-direction: column;
      gap: 30px;

      .mainText {
        font-size: 27px;
        font-family: 'PyeongtaegAnbocheRegular';
        text-align: center;
      }
      .mainDetailTitle {
        font-size: 25px;
        font-family: 'PyeongtaegAnbocheRegular';
        margin-left: 8.5px;
      }

      /* 체크박스 스타일 */
      .checkbox {
        position: relative;
        width: 30px;
        height: 30px;
        cursor: pointer;
        appearance: none;
        background-color: transparent;
      }

      /* 체크박스가 체크되었을 때 동그라미를 표시 */
      .checkbox:checked::after {
        content: '✓';
        position: absolute;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        border-radius: 50%; /* 동그란 모양 */
        color: #fff; /* 동그라미 안의 체크 표시 색상 */
        background-color: #01b5f0; /* 체크 상태일 때의 동그라미 색상 */
      }

      /* 체크되지 않은 경우의 스타일 */
      .checkbox::after {
        content: '✓';
        position: absolute;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        border-radius: 50%;
        color: #fff;
        background-color: #a7a7a7;
      }

      .allAgreeWrapper {
        display: flex;
        align-items: center;
      }

      .agreeDetailWrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .checkboxWrapper {
          display: flex;
          align-items: center;

          .essentialText {
            font-size: 13px;
            font-family: 'AppleSDGothicNeoEB';
            color: #ff941a;

            margin-left: 10px;
          }
        }
        .detailWrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;

          border: 1px solid #003c5b;
          border-radius: 20px;
          padding: 19px 17px;

          &.privacy, &.dimcuse {
            height: 170px;
            overflow-y: auto;
          }

          .content {
            font-size: 13px;
            font-family: 'AppleSDGothicNeoM';

            .detailTitle {
              font-family: 'AppleSDGothicNeoEB';
            }
          }
          .red {
            color: #ff6b6b;
            font-family: 'AppleSDGothicNeoEB';
            font-size: 13px;
            text-align: center;
          }
          .lastAgree {
            font-size: 17px;
            font-family: 'AppleSDGothicNeoEB';
            text-align: center;
            &.check {
              display: flex;
              gap: 10px;
            }
          }
          .agreeOption {
            display: flex;
            justify-content: center;
            gap: 10px;
          }
        }
        /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
        .detailWrapper::-webkit-scrollbar {
          display: none;
        }
        .detailWrapper {
          /* 인터넷 익스플로러 */
          -ms-overflow-style: none;
          /* 파이어폭스 */
          scrollbar-width: none;
        }
      }
    }

    .nextBtn {
      width: 409px;
      background-color: #01b5f0;
      border-radius: 15px;
      padding: 15px 0;

      text-align: center;
      font-size: 20px;
      font-family: 'AppleSDGothicNeoEB';
      color: #fff;
    }
    /* 비활성화된 상태 */
    .nextBtn:disabled {
      background-color: #a7a7a7; /* 비활성화 상태 배경색 */
      cursor: not-allowed; /* 마우스 커서 */
    }
  }
/* 모바일 */
@media (max-width: 480px) {
  .bg-bottom {
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    bottom: 0;
    background-image: url('/assets/main/mainSecondBg.png');
    background-size: contain;

    z-index: 0;
  }
  background-size: contain;
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  

  .logo{
    width:200px;
    margin-top: 20px;
  }
  .agreeContainer {
    padding: 0 50px 50px;

    .agreeContent{
      z-index: 1;
      width: 100%;
      height: 100%;
      padding: 60px 60px;
      gap: 40px;
      .mainText {
        display: none;
      }
      .mainDetailTitle {
        font-size: 20px;
      }

      .agreeDetailWrapper{
        .checkboxWrapper {
          .essentialText {
            font-size: 15px;
          }
        }
        .detailWrapper{
          .content {
            font-size: 15px;
          }
          .red {
            font-size: 15px;
          }
          .lastAgree {
            font-size: 17px;
          }
        }
      }
    }
    .nextBtn {
    margin: 0 auto;
    }
  }
}
`;
