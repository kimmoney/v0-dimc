import { CustomProgressBarStyled } from './styled';

interface CustomProgressBarProps {
  total: number; 
  nowIndex: number;
  typeData: string; // 'D' | 'I' | 'M' | 'C' | 'F';
  baseColor?: string;
  progressColor?: string;
}

const CustomProgressBar = ({ total, nowIndex, baseColor, progressColor, typeData}: CustomProgressBarProps) => {

  const determineProgressColor = () => {
    if(typeData =='F'){
      return "#01B5F0";
    }
    else{
    switch (nowIndex%10) {
      case 0:
        return "#004F69";
      case 1:
        return "#01B5F0";
      case 2:
        return "#00B6F0";
      case 3:
        return "#00A4D9";
      case 4:
        return "#049DBF";
      case 5:
        return "#0087B2";
      case 6:
        return "#007BA3";
      case 7:
        return "#007093";
      case 8:
        return "#006485";
      case 9:
        return "#005B79";
      default:
        return progressColor || "#01B5F0"; // 기본값 설정
    }}
  };

  const progress = (nowIndex / total) * 100;
  const finalProgressColor = determineProgressColor()

  return (
    <CustomProgressBarStyled $completedPercent={progress}
    $baseColor={baseColor}
    $progressColor={finalProgressColor}
    $typeData={typeData}
    >
      <div className="baseBar">
        <div className="complete" />
      </div>
      <div className="questionType">{typeData}</div>
    </CustomProgressBarStyled>
  );
};

export default CustomProgressBar;
