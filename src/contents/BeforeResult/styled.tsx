import styled, { keyframes } from 'styled-components';

const moveShark = keyframes`
  0% {
    transform: translate(100vw, -50%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: scale(0.5);
    transform: translate(-50%, -50%);
  }
`;

export const BeforeResultPageStyled = styled.div`
  position: relative; /* 부모 컨테이너에 relative 추가 */
  background-color: #fff;
  background-image: url('/assets/result/before/beforeResultBg.png');
  background-size: cover;
  background-position: top;
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 추가: 상어가 화면 밖으로 나가는 부분 숨김 */

  .textWrapper {
    margin: 0 auto;
    margin-top: 150px;
    width: 1024px;
    text-align: center;
    color: #fff;
    font-size: 50px;
    font-family: 'PyeongtaegAnbocheRegular';
  }

  .sharkImg {
    animation: ${moveShark} 3s ease-out forwards;
    position: absolute; /* fixed에서 absolute로 변경 */
    top: 50%;
    left: 50%;
    transform: translate(100vw, -50%);
  }

  .fadeOut {
    animation: ${fadeOut} 1s;
  }

  @media (max-width: 480px) {
    height: calc(100vh - 44px);
    .textWrapper {
      margin-top: 60px;
      width: 100vw;
      text-align: center;
      font-size: 30px;
    }
  }
`;