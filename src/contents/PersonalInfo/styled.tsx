import styled from 'styled-components';

export const PersonalInfoPageStyled = styled.div`
  height: 1440px;
  background-image: url('/assets/main/mainFirstBg.png'), url('/assets/main/mainSecondBg.png');
  background-position: center top, center bottom; /* 배경 이미지 위치를 중앙 상단으로 설정 */
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;

  .pInfoContainer {
    margin: 0 auto;
    padding: 50px;
    width: 1024px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 45px;

    .pInfoContent {
      background-color: #fff;
      width: 777px;
      padding: 83px 170px;

      border-radius: 70px;
      border: 9px solid #7edfff;

      overflow-y: auto;

      color: #003c5b;

      display: flex;
      flex-direction: column;
      gap: 30px;
      .logo2, .subText{
      display:none;
      }
      .mainText {
        font-size: 27px;
        font-family: 'PyeongtaegAnbocheRegular';
        text-align: center;
      }
      .item {
        .title {
          font-size: 25px;
          font-family: 'PyeongtaegAnbocheRegular';
          margin-bottom: 10px;
        }
        input {
          width: 100%;
          height: 62px;
          border: 2px solid #75afc1;
          border-radius: 17px;
          padding: 10px;
          font-size: 16px;
          font-family: 'PtBandocheRegular';
          &.englishInput {
            width: calc((100% - 20px) / 2);
          }
          &.phoneInput {
            width: calc((100% - 20px) / 3);
          }
        }
        input::placeholder {
          font-size: 16px;
          font-family: 'PtBandocheRegular';
        }
        .phoneInputWrapper {
          display: flex;
          gap: 10px;
        }
        .englishInputWrapper {
          display: flex;
          gap: 10px;
        }
        .genderOptions {
          display: flex;
          height: 62px;
          gap: 10px;
          .genderOption {
            width: calc((100% - 10px) / 2);
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 18px;
            font-family: 'PyeongtaegAnbocheRegular';

            border: 2px solid #75afc1;
            border-radius: 17px;

            cursor: pointer;
          }
          .selected {
            background-color: #75afc1;
            color: #fff;
          }
        }
      }
      .nextBtn {
        width: 332px;
        background-color: #01b5f0;
        border-radius: 15px;

        padding: 15px 0;
        margin: 30px auto 0;

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
  }

  /* 모바일 */
@media (max-width: 480px) {
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content:center;

  .pInfoContainer {
    padding: 20px;
    height: 100%;
    width: 100%;
    margin:auto;
    .logo1{
      display:none;
    }
    .pInfoContent {
      border-radius: 50px;
      border: 7px solid #7edfff;
      margin: auto;
      width: 100%;
      padding: 20px;
      gap: 20px;

      height: auto;
      
      .logo2{
        display:block;
        width: 100px;
        margin: 30px auto 0 30px;
      }
      .subText{
        font-size: 16px;
        margin: 0 auto 30px 15px;
        display:block;
        font-family: 'PyeongtaegAnbocheRegular';
      }

      .mainText {
        display:none;
      }

      .item {
        margin: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        .title {
          margin: auto;
          width: 100px;
          font-size: 15px;
        }
        input {
          border-radius: 13px;
          font-size: 12px;
          width: 200px;
          height: 40px;
          &.englishInput {
          width: 100px;
            }
          }
        input::placeholder {
          font-size: 12px;
        }
        .phoneInputWrapper {
          width: 200px;
        }
        .englishInputWrapper {
          width: 200px;
        }
        .genderOptions {
          gap: 20px;
          height: 50px;
          width: 200px;
          .genderOption {
          font-size: 12px;
          }
        }
      }
      .nextBtn {
      margin: auto;
      }
    }
  }
}
`;
