import styled from 'styled-components';

export const SharkBannerStyled = styled.div`
  background-color: #fff;

  height: 100px;
  bottom: 0;
  left: 0;
  display: flex;
  position: fixed;
  width: 100%;

  .sharkBanner {
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .leftWrapper {
      display: flex;
      gap: 20px;

      .sharkBannerText {
        font-size: 20px;
        font-family: 'PyeongtaegAnbocheRegular';
        color: #003243;

        display: flex;
        align-items: center;
      }
    }

    .sharkBannerButton {
      background-color: #01b5f0;
      width: 200px;
      height: 60px;
      border-radius: 16px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 20px;
      font-family: 'PtBandocheRegular';

      transition-duration: 0.3s;
    }

    .sharkBannerButton:hover {
      transform: scale(1.1, 1.1);
      transition-duration: 0.5s;
    }  
  }

@media (max-width: 480px) {
  width: 100vw;
  height: 80px;
  .leftWrapper{
  margin-left: 10px;
  }
  .sharkBanner {
    .sharkBannerButton {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 13px;
      width: 100px;
      height: 40px;
    }
  }
}
`;
