import { Radar } from 'react-chartjs-2';

import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Chart,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

import { RadarSectionStyled } from './styled';

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface RadarSectionProps {
  dScore: number;
  iScore: number;
  mScore: number;
  cScore: number;
  displayClickText?: boolean;
  color?: string;
  graphColor?: string;
  pointColor?: string;
  graphFillColor?: string;
  textColor?: string;
  textFontSize?: string;
  titleFontSize?: string;
  graphSize?: string;
  customHeight?: string;
  isPdf?: boolean;
}

const RadarSection = ({
  dScore,
  iScore,
  mScore,
  cScore,
  displayClickText = true,
  graphColor,
  pointColor,
  graphFillColor,
  textColor,
  textFontSize,
  titleFontSize,
  graphSize,
  customHeight,
  isPdf = false,
}: RadarSectionProps) => {
  const router = useRouter();

  const chartData = {
    labels: ['D', 'I', 'C', 'M'],
    datasets: [
      {
        label: 'dimc score',
        data: [dScore, iScore, cScore, mScore],
        fill: true,
        backgroundColor: graphFillColor
          ? graphFillColor
          : 'rgba(255, 255, 255, 0.7)',
        borderColor: pointColor ? pointColor : '#A5EAFF',
        borderWidth: 0,
        pointBackgroundColor: 'rgba(0, 0, 0, 0)', //pointColor ? pointColor : '#A5EAFF',
        pointBorderColor: 'rgba(0, 0, 0, 0)', //graphColor ? graphColor : '#fff',
        pointBorderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: graphColor ? graphColor : '#fff',
        pointHoverBorderColor: pointColor ? pointColor : '#A5EAFF',
      },
    ],
  };

  const chartOption = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        ticks: {
          stepSize: 30,
          display: false,
          color: 'rgba(0, 0, 0, 0.8)',
          font: {
            size: 8,
            family: 'PtBandocheRegular',
          },
          backdropColor: 'rgba(255, 255, 255, 0.8)',
        },
        grid: {
          color: graphColor ? graphColor : 'rgba(255, 255, 255, 0.5)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <RadarSectionStyled
      $textColor={textColor}
      $textFontSize={textFontSize}
      $titleFontSize={titleFontSize}
      $customHeight={customHeight}
    >
      <div className="topTextWrapper">
        <div className="d textWrapper">
          <div
            className="d title"
            onClick={() => {
              router.push(`/detail/D/${dScore}`);
            }}
          >
            D
          </div>
          <div className="d content">
            디지털 역량에서는 정보 기술 활용 능력과 사이버 보안,
            <br /> 개인정보 보호, 디지털 윤리에 대한 이해도를 평가합니다.
            <br /> 이를 통해 온라인 환경에서의 책임 있는 행동과
            <br /> 효율적인 협업 능력을 파악합니다.
          </div>
        </div>
      </div>
      <div className="centerLine">
        <div className="m textWrapper">
          <div
            className="m title"
            onClick={() => {
              router.push(`/detail/M/${mScore}`);
            }}
          >
            M
          </div>
          <div className="m content">
            인공지능 역량에서는 <br />
            AI의 기본 개념과 학습 방법,
            <br /> 그리고 윤리적 이슈에 대한 <br />
            이해도를 평가합니다.
            <br /> 머신러닝과 딥러닝의 원리,
            <br /> 데이터 분석 능력, 인공지능의 사회적 영향
            <br /> 및 윤리적 인식을 살펴봅니다.
          </div>
        </div>

        <div className="radarChart">
          <Radar
            data={chartData}
            options={chartOption}
            style={{
              width: graphSize ? graphSize : '400px',
              height: graphSize ? graphSize : '400px',
            }}
          />
        </div>

        <div className="i textWrapper">
          <div
            className="i title"
            onClick={() => {
              router.push(`/detail/I/${iScore}`);
            }}
          >
            I
          </div>
          <div className="i content">
            메이킹 역량에서는 과학적 원리를 활용한
            <br /> 창의적인 제작 실력과 다양한 방법을
            <br /> 적용하여 문제를 해결하는
            <br /> 역량을 평가합니다.
            <br /> 전자 부품의 이해, 센서 활용, 패턴 인식
            <br /> 등의 기술적 소양을 포함합니다.
          </div>
        </div>
      </div>

      <div className="bottomTextWrapper">
        <div className="=c textWrapper">
          <div
            className="c title"
            onClick={() => {
              router.push(`/detail/C/${cScore}`);
            }}
          >
            C
          </div>
          <div className="c content">
            컴퓨팅 역량에서는 데이터의 기본 단위와 수 체계,
            <br /> 알고리즘 설계 및 문제 해결 역량을 파악합니다. <br />
            데이터 구조의 이해, 코딩 실력, <br />
            그리고 문제를 효율적으로 풀어내는 능력을 살펴봅니다.
          </div>
        </div>
      </div>
      <div className="mobileTextWrapper">
      <div className="d mobileTextWrapper">
          <div
            className="d mobileTitle"
            onClick={() => {
              router.push(`/detail/D/${dScore}`);
            }}
          >
            D
          </div>
          <div className="d mobileContent">
            디지털 역량에서는 정보 기술 활용 능력과 사이버 보안,
            <br /> 개인정보 보호, 디지털 윤리에 대한 이해도를 평가합니다.
            <br /> 이를 통해 온라인 환경에서의 책임 있는 행동과
            <br /> 효율적인 협업 능력을 파악합니다.
          </div>
        </div>
        <div className="i mobileTextWrapper">
          <div
            className="i mobileTitle"
            onClick={() => {
              router.push(`/detail/I/${iScore}`);
            }}
          >
            I
          </div>
          <div className="i mobileContent">
            메이킹 역량에서는 과학적 원리를 활용한
            <br /> 창의적인 제작 실력과 다양한 방법을 적용하여
            <br />  문제를 해결하는 역량을 평가합니다.
            <br /> 전자 부품의 이해, 센서 활용, 패턴 인식
            <br /> 등의 기술적 소양을 포함합니다.
          </div>
        </div>
        <div className="m mobileTextWrapper">
          <div
            className="m mobileTitle"
            onClick={() => {
              router.push(`/detail/M/${mScore}`);
            }}
          >
            M
          </div>
          <div className="m mobileContent">
            인공지능 역량에서는 <br />
            AI의 기본 개념과 학습 방법, 그리고 윤리적 
            <br /> 이슈에 대한 이해도를 평가합니다.
            <br /> 머신러닝과 딥러닝의 원리, 데이터 분석 능력,
            <br />   인공지능의 사회적 영향 및 윤리적 인식을 살펴봅니다.
          </div>
        </div>
        <div className="=c mobileTextWrapper">
          <div
            className="c mobileTitle"
            onClick={() => {
              router.push(`/detail/C/${cScore}`);
            }}
          >
            C
          </div>
          <div className="c mobileContent">
            컴퓨팅 역량에서는 데이터의 기본 단위와 수 체계,
            <br /> 알고리즘 설계 및 문제 해결 역량을 파악합니다. <br />
            데이터 구조의 이해, 코딩 실력, <br />
            그리고 문제를 효율적으로 풀어내는 능력을 살펴봅니다.
          </div>
        </div>
      </div>

      {displayClickText && (
        <div className="description">
          * 각 타입을 클릭하여 상세 설명을 확인해보세요!
        </div>
      )}
    </RadarSectionStyled>
  );
};

export default RadarSection;
