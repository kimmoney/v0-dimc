/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import { CurriculumPageStyle } from './styled';
import { curriculumData, CurriculumType, CurriculumLevel, Score } from './curriculumData';

interface CurriculumModalProps {
  scores: Score[];
  onClose: () => void;
}

const getLevel = (score: number): CurriculumLevel => {
  if (score < 50) return '기초';
  if (score < 75) return '중급';
  return '심화';
};

const HorizontalLine: React.FC<{ startX: number; endX: number; y: number }> = ({ startX, endX, y }) => (
  <div
    style={{
      position: 'absolute',
      top: '0%',
      left: `${startX}px`,
      width: `${endX - startX}px`,
      height: '4px',
      background: 'repeating-linear-gradient(to right, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
    }}
  />
);

const TreeSection: React.FC<{ type: CurriculumType; score: number; index: number; onCalculateCenter: (centerX: number, centerY: number, index: number) => void }> = ({
  type,
  score,
  index,
  onCalculateCenter,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = ['#14A9EE', '#EC008B', '#F9A312', '#2E3092'];
  const level = getLevel(score);
  const items = curriculumData[type]?.[level] || {};

  useEffect(() => {
    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const parentRect = sectionRef.current.parentElement?.getBoundingClientRect();

      if (parentRect) {
        const centerX = sectionRect.left - parentRect.left + sectionRect.width / 2;
        const centerY = sectionRect.top - parentRect.top + sectionRect.height / 2;
        onCalculateCenter(centerX, centerY, index);
      }
    }
  }, [onCalculateCenter, index]);

  return (
    <div className="TreeSection" ref={sectionRef}>
      <div className="TreeSectionHeader" style={{ borderColor: colors[index % colors.length], color: colors[index % colors.length] }} >
        {`${type} 과정`}
      </div>
      <div className="TreeItems">
        {Object.entries(items).map(([key, { title, detail }], itemIndex, array) => (
          <React.Fragment key={key}>
            <div className="TreeItem">
              <div className="TreeItemLabel">{key}</div>
              <div className="TreeItemSubtitle">{title}</div>
              <div className="TreeItemDetail">{detail}</div>
            </div>
            {itemIndex < array.length - 1 && <img src="/picture/점선.png" alt="커리큘럼 아이콘" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const CurriculumModal: React.FC<CurriculumModalProps> = ({ scores, onClose }) => {
  const treeWrapperRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  const handleCalculateCenter = (centerX: number, centerY: number, index: number) => {
    setPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = { x: centerX, y: centerY };
      return newPositions;
    });
  };

  return (
    <CurriculumPageStyle>
      <div className="ModalOverlay">
        <div className="ModalContent">
          <div className="CurriculumHeader">
            <div className="CurriculumIcon">
              <img src="/picture/computer.png" alt="커리큘럼 아이콘" />
            </div>
            <h1>AI 기반 추천 커리큘럼</h1>
            <div className='VerticalLine'></div>
          </div>
          <div className="TreeWrapper" ref={treeWrapperRef} style={{ position: 'relative' }}>
            {positions.map((pos, index) => {
              if (index === positions.length - 1) return null;
              const nextPos = positions[index + 1];
              return (<HorizontalLine key={index} startX={pos.x} endX={nextPos.x} y={(pos.y + nextPos.y) / 2} />);
            })}
            {scores.map((scoreData, index) => (
              <TreeSection key={index} {...scoreData} index={index} onCalculateCenter={handleCalculateCenter} />
            ))}
          </div>
          <button className="CloseButton" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </CurriculumPageStyle>
  );
};

export default CurriculumModal;
