import styled from 'styled-components';

export const CurriculumPageStyle = styled.div`
  background-color: #003243;
  background-image: url('/assets/result/after/topWrapperBg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;

  /* 스크롤바 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  .ModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .ModalContent {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1001;
    overflow-y: auto;
    max-height: 90vh;
  }

  .CurriculumHeader {
    position: relative;
    text-align: center;
    margin-bottom: 50px;

    .CurriculumIcon {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    h1 {
      font-size: 24px;
      color: #003243;
      font-family: 'PtBandocheBold';
    }

    .VerticalLine {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: calc(100% + 20px);
      background: repeating-linear-gradient(
        to bottom,
        #ccc,
        #ccc 5px,
        transparent 5px,
        transparent 10px
      );
      z-index: -1;
    }
  }

  .TreeWrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;

    .TreeSection {
      flex: 1;
      position: relative;
      border-radius: 8px;
      padding: 0px;
      text-align: center;

    &::before {
      content: '';
      position: absolute;
      top: -10px; /* 초기값, JavaScript로 업데이트 */
      left: 50%; /* 중앙 정렬 */
      transform: translateX(-50%);
      width: 3px;
      height: 20px;
      background: repeating-linear-gradient(
        to bottom,
        #ccc,
        #ccc 5px,
        transparent 5px,
        transparent 10px
      );
    }

      .TreeSectionHeader {
        margin-top: 5px;
        margin-bottom: 0px;
        padding: 5px;
        background-color:rgb(255, 255, 255);
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 20px;
        font-weight: bold;
        color:rgb(0, 0, 0);
      }

      .TreeItems {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 8px;

        .TreeItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 0;
          background-color: transparent;
          border: none;
          margin: 0;

          .TreeItemLabel {
            font-weight: bold;
            font-size: 16px;
            color:rgb(0, 0, 0);
          }

          .TreeItemSubtitle {
            font-size: 14px;
            font-weight: bold;
            color: #444;
          }

          .TreeItemDetail {
            font-size: 12px;
            color: #777;
          }

          .TreeItemSeparator {
            width: 100%; /* 너비 */
            height: 2px; /* 높이 */
            margin: 10px 0; /* 위아래 간격 */
            background: repeating-linear-gradient(
              to right,
              #ccc,
              #ccc 5px,
              transparent 5px,
              transparent 10px
            ); /* 가로 점선 */
          }
        }
      }
    }
  }

  .CloseButton {
    margin-top: 20px;
    background-color: #006387;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'PtBandocheBold';

    &:hover {
      background-color: #004c5a;
    }
  }

  @media (max-width: 768px) {
    .ModalContent {
      width: 95%;
    }
  }
`;
