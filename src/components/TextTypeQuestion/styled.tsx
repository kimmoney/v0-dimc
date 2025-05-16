import styled from 'styled-components';

export const TextTypeQuestionStyled = styled.div<{
  isImageOption?: boolean;
  getId?: number;
}>`
  max-width: 1024px;
  width: 100%;

  display: flex;
  flex-direction: column;

  .questionPart {
    margin-bottom: 50px;
    overflow: scroll;
  }
  /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
  .questionPart::-webkit-scrollbar {
    display: none;
  }
  .questionPart {
    /* 인터넷 익스플로러 */
    -ms-overflow-style: none;
    /* 파이어폭스 */
    scrollbar-width: none;
  }

  .questionWrapper {
    display: flex;
    flex-direction: column;

    .questionContainer {
      display: flex;
      gap: 10px;
      align-items: center;
      margin: 10px 0 30px;

      .index {
        margin-bottom: auto;
        font-size: 32px;
        font-family: 'PyeongtaegAnbocheRegular';
        color: #fff;
        width: 130px;
      }
      .question {
        font-size: 20px;
        font-family: 'PtBandocheBold';
        color: #fff;
      }
    }
    .questionImage {
      width: fit-content;
      display: flex;
      justify-content: center;
      margin: 0 auto 40px;
      /* background-color: #fff; */
      /* padding: 10px; */
    }
  }

  .optionWrapper {
    font-size: 20px;
    color: #fff;

    .radioWrapper {
      /* display: flex;
      flex-direction: column;
      gap: 10px; */
      /* display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem; */

      /*
        206 : 시소 그림
        307 : 도로 로고 그림
        110 : 인공지능 그림
      */
      display: ${props => (props.isImageOption&& props.getId != 307 ? 'grid' : 'flex')};
      flex-direction: ${props => (props.isImageOption && props.getId != 307 ? 'none' : 'column')};
      grid-template-columns: ${props => {
        if (props.getId === 206) return 'repeat(4, 1fr)';
        return (props.isImageOption && props.getId != 307) ? 'repeat(2, 1fr)' : 'none';
      }};
      gap: ${props => props.isImageOption && props.getId != 307 ? '4rem' : '10px'};

      margin: ${props => (props.isImageOption ? 'auto' : 'auto auto auto 130px')};
      max-width: ${props => (props.isImageOption ? '50vw' : 'auto')};

      width: ${props =>  {if (props.getId === 307) return '400px';
        return (props.isImageOption ? '50vw' : 'auto');
      }};
        

      .radioOption {
        display: flex;
        gap: 10px;
      }
    }
  }
  .tipContainer {
    margin: 30px auto;
    display: flex;
    align-items: center;
    .questionDescription {
      margin:auto;
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 20px;
      font-family: 'PtBandocheBold';
      color: #00536e;

      border: 2px solid #fff;
      border-radius: 8px; //8px;
      padding: 32px;
      background-color: #fff;
      .tipText{
        margin-bottom: auto;
        margin-right: 10px;
        color: #01B5F0;

        font-size: 15px;
        font-family: 'PyeongtaegAnbocheRegular';
      }
    }
  }
  .btnWrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 32px;

    .nextBtn {
      background-color: #fff;
      width: 180px;
      display: flex;
      justify-content: center;
      padding: 16px;
      border-radius: 50px;
      border: 3px solid #01b5f0;
      font-family: 'PyeongtaegAnbocheRegular';
    }
  }
  @media (max-width: 480px) {
  max-width: 100vw;
  .questionPart{
    margin-bottom:auto;
  }
  .questionWrapper {
    .questionContainer {
      gap: 10px;
      .index {
        font-size: 20px;
        width: 30px;
      }
      .question {
        font-size: 18px;
      }
    }
    .questionImage {
      width: fit-content;
      margin: 0 auto 40px;
    }
  }

  .optionWrapper {
    font-size: 17px;

    .radioWrapper {
      margin-left: ${props => (props.isImageOption && props.getId != 307 ? 'none' : '50px')};
      width: ${props => {
      if (props.getId === 307){
        return '200px'
      }
       return (props.isImageOption ? '80vw' : 'auto')}};
      gap: ${props => {
        if (props.getId === 206) {
          return '25px';
        }
        return props.isImageOption && props.getId != 307  ? '4rem' : '10px';
      }};
      max-width: ${props => (props.isImageOption ? '80vw' : 'auto')};
      .radioOption {
        &:nth-child(5) {
          grid-column: span 2; /* 5번째 항목이 두 칸을 차지하도록 */
        }
        gap: ${props => {
          if (props.getId === 206) {
            return '3px';
          }
          return '10px';
        }};
      }
    }
  }
  .tipContainer {
    margin: 30px auto;
    .questionDescription {
      font-size: 16px;
      padding: 20px;

      .tipText{
        font-size: 12px;
      }
    }
  }
  .btnWrapper {
    gap: 32px;
    margin-bottom:auto;
    .nextBtn {
      width: 150px;

      border-radius: 25px;
      border: 2px solid #01b5f0;
    }
  }
  }
`;
