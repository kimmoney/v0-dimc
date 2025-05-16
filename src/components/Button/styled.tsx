import styled from 'styled-components';

export const CustomButtonStyled = styled.div<{
  $textColor?: string;
  $fontSize?: string;
}>`
  cursor: pointer;
  color: ${props => (props.$textColor ? props.$textColor : 'black')};
  font-size: ${props => (props.$fontSize ? props.$fontSize : '16px')};
`;
