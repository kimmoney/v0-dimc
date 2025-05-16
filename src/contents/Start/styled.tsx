import styled from 'styled-components';

export const StartPageStyled = styled.div`
  background-image: url('/assets/main/startPageBg.png');
  background-size: cover;
  background-position: top;
  background-color: #64D9FF;

  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  align-items: center;
  

  .topWrapper {
    margin-top: 340px;
    font-size: 80px;
    font-family: 'PyeongtaegAnbocheRegular';
    color: #fff;
  }
  .startBtn {
    margin-top: 250px;

    font-family: 'PyeongtaegAnbocheRegular';
    font-size: 30px;

    background-color: #01b5f0;
    width: 260px;
    height: 86px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 36px;

    transition-duration: 0.3s;
  }
  .startBtn:hover {
    transform: scale(1.1, 1.1);
    transition-duration: 0.5s;
  }

  @media (max-width: 480px) {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  height: calc(100vh - 44px);
  
  .topWrapper {
    margin-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #01b5f0;
  }
  .startBtn {
    margin-top: 200px;
    font-size: 20px;
    width: 200px;
    height: 70px;
    align-items: center;
    border-radius: 26px;
  }
}
@media (max-width: 380px) {
  .topWrapper {
    font-size: 22px;
  }
  .startBtn {
    margin-top: 150px;
    font-size: 16px;
    width: 150px;
    height: 60px;
  }
}

`;
