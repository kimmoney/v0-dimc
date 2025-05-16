import { Radar } from 'react-chartjs-2';

import { useRouter } from 'next/router';

import {
  Chart,
  Filler,
  Legend,
  LineElement,
  plugins,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

import { PDFRadarChartStyled } from './styled';

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface PDFRadarChartProps {
  dScore: number;
  iScore: number;
  mScore: number;
  cScore: number;
}

const PDFRadarChart = ({
  dScore,
  iScore,
  mScore,
  cScore,
}: PDFRadarChartProps) => {
  const RadarData = {
    labels: ['D', 'I', 'C', 'M'],
    datasets: [
      {
        borderColor: 'rgba(0, 0, 0, 0)',
        pointRadius: 7,
        pointHoverRauis: 9,
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        tension: -0.03,
        data: [dScore, iScore, cScore, mScore],
      },
    ],
  };
  const RadarOptions = {
    scales: {
      r: {
        pointLabels: {
          display: false,
        },

        grid: {
          circular: true,
          color: 'rgba(168, 169, 168, 0.8)',
        },
        ticks: {
          display: false,
        },
        angleLines: {
          color: 'rgb(168, 169, 168)',
          lineWidth: 0.4,
          borderDash: [3, 3],
        },
        suggestedMin: 0,
        suggestedMax: 100,
        startAngle: -45,
      },
    },
    layout: {
      padding: {
        top: 30, // 차트 위쪽 여백
        right: 30, // 차트 오른쪽 여백
        bottom: 30, // 차트 아래쪽 여백
        left: 30, // 차트 왼쪽 여백
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      customPointLabels: {
        labels: ['D', 'I', 'C', 'M'], // 커스텀 레이블
        backgroundColors: [
          'rgb(0, 160, 213)',
          'rgb(198, 47, 124)',
          'rgb(42, 45, 116)',
          'rgb(233, 181, 74)',
        ], // 배경 색상
        fontColor: '#fff', // 글씨 색상
        beginAngle: -45, // 시작 각도
      },
    },
    ticks: {
      count: 7,
    },
  };
  Chart.register({
    id: 'customPointLabels',
    beforeDraw(chart) {
      const {
        ctx,
        chartArea: { left, top, right, bottom, width, height },
      } = chart;

      // 안전하게 options.plugins 접근
      const plugins = chart.options?.plugins as any;
      if (!plugins?.customPointLabels) {
        return; // customPointLabels가 없는 경우 처리 종료
      }

      const labels = plugins.customPointLabels.labels || [];
      const backgroundColors = plugins.customPointLabels.backgroundColors || [];
      const fontColor = plugins.customPointLabels.fontColor || '#000';
      const beginAngle = plugins.customPointLabels.beginAngle || 0;

      const centerX = (left + right) / 2; // 차트 영역의 중심 x 좌표
      const centerY = (top + bottom) / 2; // 차트 영역의 중심 y 좌표

      // 차트 밖으로 라벨을 배치하려면 drawingArea 값을 더 크게 설정
      const drawingArea = Math.min(width, height) / 2 + 60; // 라벨을 좀 더 그래프에서 멀리 배치하기 위해 40px로 확장

      // 동그라미 크기 고정
      const fixedRadius = 25; // 모든 동그라미의 크기를 고정된 값(50px)으로 설정

      ctx.save();
      labels.forEach((label: string, index: number) => {
        // 라벨 위치 계산
        const angle =
          (Math.PI * (beginAngle + index * (360 / labels.length))) / 180 -
          Math.PI / 2; // 시작 각도 보정
        const x = centerX + drawingArea * Math.cos(angle);
        const y = centerY + drawingArea * Math.sin(angle);

        // 글자 크기 및 스타일 설정
        ctx.font = `700 30px NotoSansKR`;

        // 원형 배경 그리기 (고정된 크기 사용)
        ctx.fillStyle = backgroundColors[index]; // 배경 색상 설정
        ctx.beginPath();
        ctx.arc(x, y, fixedRadius, 0, Math.PI * 2); // 원 그리기
        ctx.fill();

        // 텍스트 그리기
        ctx.fillStyle = fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y); // 텍스트 중앙에 배치
      });
      ctx.restore();
    },
    afterDraw(chart) {
      const {
        ctx,
        chartArea: { left, top, right, bottom, width, height },
        scales: { r },
        data: { datasets },
      } = chart;

      // 안전하게 options.plugins 접근
      const plugins = chart.options?.plugins as any;
      if (!plugins?.customPointLabels) {
        return; // customPointLabels가 없는 경우 처리 종료
      }

      const dataValues = chart.data.datasets[0].data;

      const centerX = (left + right) / 2; // 차트 영역의 중심 x 좌표
      const centerY = (top + bottom) / 2; // 차트 영역의 중심 y 좌표

      // 차트 밖으로 라벨을 배치하려면 drawingArea 값을 더 크게 설정
      const drawingArea = Math.min(width, height) / 2; // 라벨을 좀 더 그래프에서 멀리 배치하기 위해 40px로 확장
      const sampleText = `${Math.max(...(datasets[0].data as number[]))}%`; // 최대 점수를 기준으로 크기 결정

      const padding = 10;
      const borderRadius = 10;
      const textWidth = ctx.measureText(sampleText).width + padding * 2;
      const textHeight = 20; // 고정된 높이

      ctx.save();
      chart.data.datasets[0].data.forEach((score: any, index: number) => {
        const angle =
          (Math.PI * (-45 + index * (360 / dataValues.length))) / 180 -
          Math.PI / 2;
        const x = centerX + drawingArea * (score / 100) * Math.cos(angle);
        const y = centerY + drawingArea * (score / 100) * Math.sin(angle);

        const borderColors = [
          'rgb(0, 160, 213)',
          'rgb(198, 47, 124)',
          'rgb(42, 45, 116)',
          'rgb(233, 181, 74)',
        ];

        ctx.fillStyle = '#fff'; // 배경 색상
        ctx.strokeStyle = borderColors[index]; // 테두리 색상
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x - textWidth / 2 + borderRadius, y - textHeight / 2);
        ctx.arcTo(
          x + textWidth / 2,
          y - textHeight / 2,
          x + textWidth / 2,
          y + textHeight / 2,
          borderRadius,
        );
        ctx.arcTo(
          x + textWidth / 2,
          y + textHeight / 2,
          x - textWidth / 2,
          y + textHeight / 2,
          borderRadius,
        );
        ctx.arcTo(
          x - textWidth / 2,
          y + textHeight / 2,
          x - textWidth / 2,
          y - textHeight / 2,
          borderRadius,
        );
        ctx.arcTo(
          x - textWidth / 2,
          y - textHeight / 2,
          x + textWidth / 2,
          y - textHeight / 2,
          borderRadius,
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 텍스트 그리기
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `100 14px NotoSansKR`;
        ctx.fillText(`${score}%`, x, y);
      });

      ctx.restore();
    },
  });

  return (
    <PDFRadarChartStyled>
      <Radar data={RadarData} options={RadarOptions} />
    </PDFRadarChartStyled>
  );
};

export default PDFRadarChart;
