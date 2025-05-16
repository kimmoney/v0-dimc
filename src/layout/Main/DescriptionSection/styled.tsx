import styled from 'styled-components';

export const DescriptionSectionStyled = styled.div`
  .mainSection{
    display: flex;
    justify-content: center;
    padding: 150px 0 210px;

    .leftContainer {
      width: 512px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 130px;
        font-family: 'PyeongtaegAnbocheRegular';
        color: #fff;
        line-height: 1;
      }
      .subTitle {
        font-size: 32px;
        font-family: 'PtBandocheBold';
        color: #fff;

        margin-left: 10px;
      }
      .description {
        font-size: 20px;
        font-family: 'PtBandocheRegular';
        color: #fff;

        margin-top: 10px;
        margin-left: 10px;
      }
    }
    .rightContainer {
      width: 512px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
      /* 태블릿 */
  @media (max-width: 768px) {
  
  }
  /* 모바일 */
  @media (max-width: 480px) {
  .mainSection{
    display: flex;
    justify-content: center;
    padding: 10px 0 0 0;
    gap: 10px;

    .leftContainer {
      width: 54vw;
      padding: 0 0 40px 0;
      .title {
        font-size: 40px;
        line-height: 1;
      }
      .subTitle {
        font-size: 10px;
        margin: 0px 0 0 5px;
        white-space: nowrap; /* 줄바꿈 방지 */
        overflow: visible; /* 글씨가 박스를 벗어날 수 있도록 설정 */
      }
      .description {
        font-size: 8px;
        margin: 0px 0 0 5px;
        white-space: nowrap;
        overflow: visible;
      }
    }
    .rightContainer {
      width: 40vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
`;
