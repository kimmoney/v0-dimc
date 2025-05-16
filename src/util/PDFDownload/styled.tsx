import styled from 'styled-components';

export const PDFDownloadStyled = styled.div<{
  $dScore: number;
  $iScore: number;
  $mScore: number;
  $cScore: number;
}>`
  display: flex;
  flex-direction: column;
  font-family: 'NotoSansKR';
  // ---------------------------------
  // 공통 스타일
  .header {
    text-align: right;
    font-size: 12px;
    font-weight: 300;
    color: #808080;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    .text {
      font-size: 12px;
      font-weight: 300;
      color: #808080;
    }
    .logoWrapper {
      display: flex;
      align-items: baseline;
      gap: 12px;
      .shark {
        height: 20px;
      }
      .dimc {
        height: 15px;
      }
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: 600;
    border-bottom: 4px solid #000;
    padding: 10px 0 20px;
  }

  .subTitle {
    font-size: 20px;
    font-weight: 500;
    padding: 20px 0 10px;
  }

  .smallContent {
    font-size: 14px;
    font-weight: 200;
    line-height: 1.6;
    padding: 0 0 30px;
  }

  .largeContent {
    font-size: 20px;
    font-weight: 200;
    padding: 0 0 30px;
  }

  .mainContentSection {
    height: calc(297mm + 20px);
  }

  // ---------------------------------
  // 각 섹션별 스타일
  #result-contents-1 {
    .symbol {
      width: 130px;
      padding: 100px 0 20px 0;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 5px solid #000;
      margin: 0 15px;
      padding-bottom: 40px;
      .mainTitle {
        font-size: 55px;
        font-weight: 700;
        line-height: 1;
      }
      .name {
        font-size: 30px;
        font-weight: 600;
      }
    }
    .description {
      margin: 0 15px;
      padding: 20px 0;
      font-size: 15.3px;
      line-height: 1.5;
    }
    .dimcDesc {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 100px 0;
      .desc {
        display: flex;
        width: 250px;
        height: 70px;
        .circle {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          &.d {
            background-color: rgb(0, 160, 213);
          }
          &.i {
            background-color: rgb(198, 47, 124);
          }
          &.m {
            background-color: rgb(255, 241, 81);
          }
          &.c {
            background-color: rgb(42, 45, 116);
          }
        }
        .text {
          font-size: 16px;
          font-weight: 450;
          line-height: 2;
          margin-left: 5px;
        }
        .english {
          font-family: 'Mulish';
          font-weight: 100;
        }
      }
    }
  }

  #result-contents-2 {
    .professor {
      width: 18%;
      margin: 25px 25px 30px auto;
    }
    .smallContent {
      margin-left: 25px;
    }
    .signatureWrapper {
      display: flex;
      align-items: center;
      margin-left: 25px;
      .signatureText {
        font-size: 14px;
        font-weight: 200;
        padding: 10px 10px 0 0;
      }
      .signature {
        width: 200px;
      }
    }
  }

  #result-contents-3 {
    .dimcDesc {
      font-size: 16px;
      font-weight: 350;
      padding: 20px 0 60px;
    }
    .typeImg {
      height: 40px;
      margin-left: 40px;
    }
    .subDimcDesc {
      font-size: 15px;
      font-weight: 300;
      line-height: 1.7;
      margin: 0 5px 40px 67px;
    }
  }

  #result-contents-4 {
    .fourNecessityImg {
      width: 75%;
      margin: 0 auto;
    }
    .testCoreContent {
      width: 80%;
      margin: 0 auto 0 110px;
      .testCoreSubTitle {
        .testCoreCircle {
          font-size: 12px;
        }
        font-size: 16px;
        font-weight: 500;
      }
      .testCoreSubDesc {
        font-size: 14px;
        font-weight: 300;
        padding: 5px 0 20px 15px;
      }
    }
    .studentTargetContent,
    .parentTargetContent {
      display: flex;
      align-items: center;
      margin: 0 auto 0 90px;
      img {
        width: 100px;
        padding-top: 20px;
      }
      .studentTargetDesc,
      .parentTargetDesc {
        font-size: 14px;
        font-weight: 300;
        padding-left: 10px;
      }
      .blueCircle {
        color: rgb(69, 153, 227);
      }
      .pinkCircle {
        color: rgb(207, 44, 125);
      }
    }
  }

  #result-contents-5 {
    .sharkImg {
      margin: 0 auto;
      width: 60%;
    }
    .sharkTypeKorean {
      font-size: 26px;
      font-weight: 600;
      text-align: center;
    }
    .sharkTypeUpperCase {
      font-size: 20px;
      font-weight: 400;
      letter-spacing: -0.1px;
      text-align: center;
    }
    .sharkKeywordWrapper {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0 50px;
      .keyword {
        padding: 0 10px 13px;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 400;
        background-color: rgb(228, 228, 227);
        color: rgb(117, 116, 116);
      }
    }
    .comment {
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0.5px;
      text-align: center;
    }
    .commentFrom {
      font-size: 12px;
      font-weight: 300;
      font-family: 'MulishItalic';
      text-align: center;

      padding: 5px 0 40px;
    }
    .sharkTypeText {
      width: 80%;
      font-size: 16px;
      font-weight: 200;
      line-height: 1.7;
      letter-spacing: 0.5px;
      margin: 0 auto;
    }
  }

  #result-contents-6 {
    .radarWrapper {
      width: 350px;
      margin: 20px auto 30px;
    }
    .dimcScore {
      text-align: center;
      font-size: 14px;
      font-weight: 300;
    }
    .totalScore {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      margin: 20px 0 80px;
    }
  }

  #result-contents-6,
  #result-contents-7 {
    .d {
      color: rgb(0, 160, 213);
    }
    .i {
      color: rgb(198, 47, 124);
    }
    .m {
      color: rgb(233, 181, 74);
    }
    .c {
      color: rgb(42, 45, 116);
    }

    .dimcType {
      font-size: 18px;
      font-weight: 400;

      .english {
        font-family: 'Mulish';
        font-weight: 100;
        margin-bottom: 5px;
      }
    }
    .tagDesc {
      display: flex;
      gap: 10px;
      margin: 20px 0 20px 20px;
      span {
        padding: 0 10px 13px;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 400;
      }
      .d {
        background-color: rgb(229, 246, 250);
        color: rgb(0, 102, 135);
      }
      .i {
        background-color: rgb(252, 245, 248);
        color: rgb(198, 47, 124);
      }
      .m {
        background-color: rgb(255, 254, 237);
        color: rgb(224, 152, 79);
      }
      .c {
        background-color: rgb(234, 234, 240);
        color: rgb(49, 52, 121);
      }
    }
    .dimcScoreBar {
      display: flex;
      justify-content: space-between;
      margin: 0 0 0 20px;
      .dimcSubTitle {
        font-size: 14px;
        font-weight: 300;
      }
      .score {
        font-size: 13px;
        font-weight: 500;
      }
    }
    .scoreBarWrap {
      width: calc(100% - 20px);
      height: 12px;
      border-radius: 24px;
      background-color: rgb(203, 204, 203);
      margin: 10px 0 10px 20px;
      .scoreBar {
        height: 100%;
        border-radius: 24px;
      }
      .d {
        width: ${props => props.$dScore}%;
        background-color: rgb(0, 160, 213);
      }
      .i {
        width: ${props => props.$iScore}%;
        background-color: rgb(198, 47, 124);
      }
      .m {
        width: ${props => props.$mScore}%;
        background-color: rgb(255, 241, 81);
      }
      .c {
        width: ${props => props.$cScore}%;
        background-color: rgb(42, 45, 116);
      }
    }
    .dimcTypeText {
      margin: 0 0 0 20px;
      font-size: 16px;
      font-weight: 300;
      &.mar {
        margin-bottom: 120px;
      }
    }
  }

  #result-contents-8 {
    .mainContentSection {
      padding: 20px;
    }

    .CurriculumTitle {
      text-align: center;
      font-size: 20px;
      margin-bottom: 20px;
    }

    .dotLine {
      display: flex;
      justify-content: center;
      margin: 10px 0;

      img {
        width: 80%;
        height: auto;
      }
    }

    .CurriculumIcon {
      display: flex;
      justify-content: center;
      margin-bottom: 1px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .decorativeImage {
      display: flex;
      justify-content: center;
      margin: 7px;

      img {
        max-width: 600px;
        height: auto;
      }
    }

    .process-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
  
    .process-container {
      flex: 1;
      text-align: center;

      /* 색상 변수 설정 */
      &:nth-of-type(1) {
        --border-color: #14A9EE;
        --text-color: #14A9EE;
      }

      &:nth-of-type(2) {
        --border-color: #EC008B;
        --text-color: #EC008B;
      }

      &:nth-of-type(3) {
        --border-color: #F9A312;
        --text-color: #F9A312;
      }

      &:nth-of-type(4) {
        --border-color: #2E3092;
        --text-color: #2E3092;
      }

      .process-title-box {
        border: 2px solid var(--border-color); /* 변수 사용 */
        background-color: #ffffff;
        color: var(--text-color); /* 변수 사용 */
        border-radius: 4px;

        .process-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 7px;
          padding-bottom: 7px;
        }
      }


      .tree-box {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f9f9f9;
        text-align: conter;
        margin-bottom: 10px;

        .tree-node {
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;

          &.tree-level-0 {
            font-weight: bold;
          }

          &.tree-level-1{
            font-weight: bold;
            font-size:10px;
          },
          &.tree-level-2{
            font-weight: normal;
            font-size:8px;
          },
          &.tree-level-3 {
            margin-left: 0;
          }
        }
      }
    }

    .commonImageWrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
    .dimcScore {
      text-align: center;
      font-size: 14px;
      font-weight: 300;
    }
    .totalScore {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      margin: 20px 0 80px;
    }
}



  #result-contents-9 {
    .sharkRankImg {
      width: 95%;
      margin: 0 auto;
    }
  }

  #result-contents-10 {
    .subjects {
      height: 32px;
      margin-left: 20px;
    }
    .subjectRelativeSubDesc {
      font-size: 14px;
      font-weight: 300;
      margin: 0 5px 30px 30px;
    }
    .subjectRelative {
      align-items: center;
    }
  }

  #result-contents-11 {
    .sixDifference {
      width: 70%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      margin: 0 auto;
      margin-top: 20px;
    }
    .classApply {
      margin: 0 auto;
      width: 50%;
      padding: 20px 0;
    }
    .ticketWrapper {
      display: flex;
      justify-content: center;
      gap: 30px;
      .ticket {
        width: 25%;
      }
    }
  }
`;
