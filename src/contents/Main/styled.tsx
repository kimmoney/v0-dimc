import styled from 'styled-components';

export const MainPageStyled = styled.div`
  background-color: #fff;
  background-image: url('/assets/main/mainBg.png');
  background-size: cover;
  background-position: top;
  min-width: 1024px;

  @media (max-width: 480px) {
    background-image: url('/assets/main/mainFirstBg.png'), url('/assets/main/mainSecondBg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top, bottom;

    
    
    height: calc(100vh - 44px);
    background-size: certain;
    min-width: 100vw;
  }
`;
