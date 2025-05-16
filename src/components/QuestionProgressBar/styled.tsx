import styled from 'styled-components';

export const CustomProgressBarStyled = styled.div<{
  $completedPercent: number;
  $baseColor?: string;
  $progressColor?: string;
  $typeData?: string;
}>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  .baseBar{
    display: flex;
    width: 90%;
    max-width: 1024px;
    height: 16px;
    border: 2px solid #fff;

    background-color: ${props => props.$baseColor? props.$baseColor : '#fff'};

    border-radius: 24px;

    .complete {
      width: ${props => props.$completedPercent}%;
      background-color: ${props => props.$progressColor? props.$progressColor : '#002337'};
      border-radius: ${props => {
        if (props.$completedPercent === 100) {
          return '24px;';
        }
        return '24px 0 0 24px'
      }};
    }
  }
  .questionType{
    display: ${props => (props.$typeData === 'F' ? 'none' : 'flex')};
    
    align-items: center;
    justify-content: center;
    
    font-family: 'PyeongtaegAnbocheRegular';
    font-size: 60px;
    color: #fff;
    
    width: 80px;
    height: 80px;
  }
@media (max-width: 480px) {
  .questionType{
    width: 50px;
    height: 50px;
    font-size: 35px
  }
}
`;
