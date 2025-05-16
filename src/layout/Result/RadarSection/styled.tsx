import styled from 'styled-components';

export const RadarSectionStyled = styled.div<{
  $textColor?: string;
  $textFontSize?: string;
  $titleFontSize?: string;
  $customHeight?: string;
}>`
  height: ${({ $customHeight }) =>
    $customHeight ? $customHeight : 'calc(1080px - 88px - 100px)'};
  max-width: 1024px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  gap: 20px;

  .topTextWrapper {
    display: flex;
    justify-content: 'center';
    gap: 40px;
  }

  .bottomTextWrapper {
    display: flex;
    justify-content: 'center';
  }

  .mobileTextWrapper, .mobileTitle, .mobileContent{
    display:none;
  }
  .textWrapper {
    color: ${({ $textColor }) => ($textColor ? $textColor : '#fff')};
    text-align: center;
    &.m,
    &.i {
      width: 250px;
    }
    padding: 20px 0;
  }
  .textWrapper:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 20px 0;
    .title {
      transform: scale(1.3);
      transition-duration: 0.5s;
    }
  }

  .title {
    font-size: ${({ $titleFontSize }) =>
      $titleFontSize ? $titleFontSize : '50px'};
    font-family: 'PyeongtaegAnbocheRegular';
    cursor: pointer;
    transition-duration: 0.3s;
  }

  .content {
    font-size: ${({ $textFontSize }) =>
      $textFontSize ? $textFontSize : '14px'};
    font-family: 'PtBandocheRegular';
    margin-top: 5px;
  }

  .centerLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .description {
    color: #bbbbbb;
    font-size: 12px;
    padding-top: 20px;
  }
@media (max-width: 480px) {
  height: ${({ $customHeight }) =>
    $customHeight ? $customHeight : '900px'};
  width: 100vw;
  gap: 0px;

  .title{
    display:none;
  }
  .content{
    display:none;
  }
  .radarChart {
    width: 80%;
  }
  .centerLine {
    gap:0px;
    width:100vw;
  }
  .textWrapper{
    padding: 0;
  }
  .description{
  margin-top:40px;
  }

  .mobileTextWrapper, .mobileTitle, .mobileContent{
    display:block;
  }

  .mobileTextWrapper{
    color: ${({ $textColor }) => ($textColor ? $textColor : '#fff')};
    text-align: center;
    margin:10px;
  }
  .mobileTitle{
    font-size: 30px;
    font-family: 'PyeongtaegAnbocheRegular';
    cursor: pointer;
    transition-duration: 0.3s;
  }
  .mobileContent{
    font-size: 14px;
    font-family: 'PtBandocheRegular';
    margin-top: 5px;
  }

  .topTextWrapper {
    display: flex;
    justify-content: 'center';
    gap: 40px;
  }
}
`;
