import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const SharkSectionStyled = styled.div`
  height: calc(1080px - 88px - 100px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;

  .sharkNameText {
    min-width: 1024px;
    font-size: 48px;
    font-family: 'PyeongtaegAnbocheRegular';
    text-align: center;
    color: #fff;
  }

  .fadeIn {
    animation: ${fadeIn} 1s ;
  }

  @media (max-width: 480px) {
    height: auto;
    gap: 0px;
    .sharkNameText {
      padding-top: 100px;
      min-width: 90vw;
      font-size: 30px;
    }
      .curriculumImg{
        margin-bottom:50px
      }
  }
`;
