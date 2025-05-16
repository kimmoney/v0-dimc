/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';
import { Radar } from 'react-chartjs-2';

import CustomButton from '@/components/Button';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import getSharkKoreanName from '../getSharkKoreanName';
import getSharkTextBySharkType from '../getSharkTextBySharkType';
import getTypeTextByScore from '../getTypeTextByScore';
import PDFRadarChart from '../PDFRadarChart';
import { PDFDownloadStyled } from './styled';



interface PDFDownloadProps {
  className?: string;
  name: string;
  sharkType: string;
  dScore: number;
  iScore: number;
  mScore: number;
  cScore: number;
}

const PDFDownload = ({
  className,
  name,
  sharkType,
  dScore,
  iScore,
  mScore,
  cScore,
}: PDFDownloadProps) => {
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm');

    // 페이지별 콘텐츠를 가져오기
    const resultContents = [
      document.getElementById('result-contents-1'),
      document.getElementById('result-contents-2'),
      document.getElementById('result-contents-3'),
      document.getElementById('result-contents-4'),
      document.getElementById('result-contents-5'),
      document.getElementById('result-contents-6'),
      document.getElementById('result-contents-7'),
      document.getElementById('result-contents-8'),
      document.getElementById('result-contents-9'),
      document.getElementById('result-contents-10'),
      document.getElementById('result-contents-11'),
    ];

    for (let i = 0; i < resultContents.length; i++) {
      const resultContent = resultContents[i];
      if (resultContent) {
        // 페이지 캡처 및 PDF에 추가
        const canvas = await html2canvas(resultContent, { scale: 2 }); // scale 조정
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // PDF에 맞는 너비(mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // 높이를 비율에 맞게 계산
        pdf.addImage(imgData, 'PNG', 10, 5, imgWidth, imgHeight);

        if (i < resultContents.length - 1) {
          pdf.addPage(); // 마지막 페이지가 아니면 새 페이지 추가
        }
      }
    }

    pdf.save(`${name}_dimc_결과지.pdf`);
  };

  // 오늘 날짜 구하기
  const todayDate = new Date();
  const dd = String(todayDate.getDate()).padStart(2, '0');
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = todayDate.getFullYear();
  const today = yyyy + '-' + mm + '-' + dd;

  // 타입별, 점수별 상세 설명
  const dTypeDescription = getTypeTextByScore({ type: 'D', score: dScore });
  const iTypeDescription = getTypeTextByScore({ type: 'I', score: iScore });
  const mTypeDescription = getTypeTextByScore({ type: 'M', score: mScore });
  const cTypeDescription = getTypeTextByScore({ type: 'C', score: cScore });

  // 상어 타입 구하기
  const sharkTypeText = getSharkTextBySharkType(sharkType);
  // 상어의 한글 이름
  const sharkTypeKorean = getSharkKoreanName(sharkType);
  // 상어 이름을 대문자로
  const sharkTypeUpperCase = sharkType.toUpperCase();

  // 점수 평균
  const totalScore = (dScore + iScore + mScore + cScore) / 4;

  const sharkSubDataList: Record<
    string,
    { keyword: string[]; comment: string; commentFrom: string }
  > = {
    whale: {
      keyword: [
        '차분한 해결 능력',
        '방대한 데이터 처리',
        '체계적 분석',
        '꾸준한 목표 달성',
      ],
      comment: '"작은 것에 불과하더라도 꾸준함은 대단한 성취를 이루어냅니다."',
      commentFrom: 'Latin Proverb',
    },
    greenland: {
      keyword: [
        '장기 보존',
        '효율적 에너지 사용',
        '극한 환경 생존',
        '데이터 지속성',
      ],
      comment:
        '"장기적인 비전을 가지고 흔들림 없이 나아가는 자만이 큰 성과를 거둘 수 있다."',
      commentFrom: 'Warren Buffett',
    },
    lemon: {
      keyword: ['탐지 능력', '적응력', '실시간 데이터 처리', '의사결정 신속성'],
      comment:
        '"적응력은 모방이 아닙니다. 그것은 저항과 동화의 힘을 의미합니다."',
      commentFrom: 'Jean Piaget',
    },
    hammerhead: {
      keyword: ['정밀 감지', '공간 인지력', '목표물 탐지', '창의적 도구 활용'],
      comment: '창의성은 단지 남들이 볼 수 없는 것을 보는 것이다.',
      commentFrom: 'William Blake',
    },
    tiger: {
      keyword: ['넓은 이동 영역', '적응력', '다양한 사냥 전략', '문제 분석력'],
      comment: '인간의 진정한 강점은 환경에 적응하고 도전하는 능력이다.',
      commentFrom: 'Charles Darwin',
    },
    megamouth: {
      keyword: [
        '방대한 데이터 수집',
        '효율적 정보 분류',
        '큰 데이터 처리',
        '지속적 학습',
      ],
      comment: '지식이란 방대함 속에서도 유용한 것을 찾아내는 것이다.',
      commentFrom: 'Albert Einstein',
    },
    pyjama: {
      keyword: ['패턴 인식', '적응성', '유연성', '패턴 예측'],
      comment:
        '모든 예술은 패턴에서 시작됩니다. 패턴을 이해하면 아름다움을 발견할 수 있습니다.',
      commentFrom: 'John Ruskin',
    },
    saw: {
      keyword: ['자원 채집 능력', '정교한 작업', '도구 활용', '문제 해결력'],
      comment: '문제를 해결하려는 의지가 가장 큰 도구가 된다.',
      commentFrom: 'Henry Ford',
    },
    angel: {
      keyword: ['은폐 능력', '보안 체계 유지', '스텔스 활동', '시스템 보호'],
      comment: '진정한 용기는 보이지 않게 준비하고 위험에 대비하는 것이다.',
      commentFrom: 'Pablo Picasso',
    },
    sand: {
      keyword: [
        '단순한 사냥 전략',
        '느린 적응력',
        '독립적 행동',
        '환경 변화 민감성',
      ],
      comment: '느리지만 꾸준히 나아가면 마침내 목표에 도달할 것이다.',
      commentFrom: 'Latin Proverb',
    },
    wobbegong: {
      keyword: [
        '단순한 행동 패턴',
        '낮은 적응력',
        '특정 환경 제한',
        '제한된 탐지 능력',
      ],
      comment: '익숙한 환경에서 벗어나야 새로운 배움이 시작된다.',
      commentFrom: 'Helen Keller',
    },
    nurse: {
      keyword: [
        '조용한 작업 성향',
        '단순 작업 수행',
        '창의적 도구 부족',
        '정교한 작업 한계',
      ],
      comment: '작고 세심한 일에 충실하면 큰 성공이 온다.',
      commentFrom: 'Benjamin Franklin',
    },
    reef: {
      keyword: ['관찰력', '탐색 성향', '제한적 문제 해결', '단순한 사냥 방법'],
      comment: '관찰은 지혜의 첫 번째 단계이다.',
      commentFrom: 'William Harvey',
    },
  };

  type CurriculumType = "D" | "I" | "M" | "C";
  type CurriculumLevel = "기초" | "중급" | "심화";


  const curriculumData: Record<
    CurriculumType,
    Record<CurriculumLevel, Record<string, { title: string; detail: string }>>
  > = {
    D: {
      기초: {
        'D1·공통·1': { title: "컴퓨터 속 날 닮은 너", detail: "코스페이시스로 만나는 메타버스" },
        'D2·공통·1': { title: "내 꿈이 실제가 되는 순간", detail: "직접 느껴보는 가상현실" },
        'D1·기초·1': { title: "내 손으로 만드는 무한의 계단", detail: "코스페이시스를 활용한 게임 메이킹" }
      },
      중급: {
        'D1·기초·1': { title: "내 손으로 만드는 무한의 계단", detail: "코스페이시스를 활용한 게임 메이킹" },
        'D2·기초·2': { title: "3D 세상 속 나만의 캐릭터", detail: "블렌더로 3D 캐릭터 만들기" },
        'D3·기초·1': { title: "ZEP과 떠나는 메타버스 모험", detail: "ZEP과 제페토로 탐험하는 메타버스" }
      },
      심화: {
        'D1·중급·1': { title: "우리 집으로 놀러오세요!", detail: "코스페이시스로 만드는 나의 집" },
        'D1·심화·3': { title: "미스터리가 가득한 방에서 무슨 일이?", detail: "코스페이시스로 만들어보는 방탈출" },
        'D2·심화·2': { title: "하나보다는 둘, 둘보다는 셋", detail: "협업을 위한 노션 사용해보기" }
      }
    },
    I: {
      기초: {
        'I1·공통·1': { title: "AI도 선생님이 필요해", detail: "AI를 학습시켜 올바른 구별하기" },
        'I2·공통·1': { title: "트롤리 딜레마, 나의 선택은?", detail: "인공지능 윤리 문제의 중요성" },
        'I1·기초·1': { title: "내 마음을 읽는 인공지능", detail: "그리기 AI로 인공지능 사고 과정 이해하기" }
      },
      중급: {
        'I3·기초·1': { title: "잘 그리지 못해도 괜찮아, AI와 함께라면!", detail: "투닝 AI로 만드는 나만의 네컷 웹툰" },
        'I5·기초·1': { title: "너, 웹 디자이너가 되어보지 않을래?", detail: "Framer로 만들어보는 나만의 웹사이트" },
        'I4·중급·2': { title: "Short 하게 Shorts 스타 되는 법", detail: "Vrew로 손쉽게 만드는 유튜브 쇼츠" }
      },
      심화: {
        'I4·중급·2': { title: "Short 하게 Shorts 스타 되는 법", detail: "Vrew로 손쉽게 만드는 유튜브 쇼츠" },
        'I5·중급·1': { title: "PPT? 눈 Gamma도 뚝딱이지!", detail: "Gamma를 활용한 자기소개 PPT 만들기" },
        'I1·심화·1': { title: "멍멍! 야옹? 내가 누구게", detail: "Teachable Machine으로 인공지능 학습시키기" }
      }
    },
    M: {
      기초: {
        'M1·기초·1': { title: "버튼 NO! 똑똑한 무드등", detail: "조도센서의 원리 알고 무드등 만들기" },
        'M5·기초·1': { title: "여기도, 저기도 블루투스?", detail: "블루투스의 원리 알고 스피커 만들기" },
        'M6·기초·1': { title: "보이지 않는 빛을 따라서", detail: "IR 센서 이해하고 IR 자동차 만들기" }
      },
      중급: {
        'M1·기초·1': { title: "버튼 NO! 똑똑한 무드등", detail: "조도센서의 원리 알고 무드등 만들기" },
        'M5·기초·1': { title: "여기도, 저기도 블루투스?", detail: "블루투스의 원리 알고 스피커 만들기" },
       ' M6·기초·1': { title: "보이지 않는 빛을 따라서", detail: "IR 센서 이해하고 IR 자동차 만들기" }
      },
      심화: {
        'M1·기초·1': { title: "버튼 NO! 똑똑한 무드등", detail: "조도센서의 원리 알고 무드등 만들기" },
        'M5·기초·1': { title: "여기도, 저기도 블루투스?", detail: "블루투스의 원리 알고 스피커 만들기" },
        'M6·기초·1': { title: "보이지 않는 빛을 따라서", detail: "IR 센서 이해하고 IR 자동차 만들기" }
      }
    },
    C: {
      기초: {
        'C1·공통·1': { title: "컴퓨터와 대화할 수 있다면", detail: "알고리즘과 이진법 이해하기" },
        'C2·공통·1': { title: "컴퓨팅 사고력 Level UP!", detail: "코드모스 컴퓨팅 사고력 테스트" },
        'C1·기초·1': { title: "내 손으로 만드는 무한의 계단", detail: "코스페이시스를 활용한 게임 메이킹" }
      },
      중급: {
        'C3·기초·1': { title: "말 한마디로 다 되는 세상이 있다?", detail: "음성인식의 원리를 이용한 나만의 집 만들기" },
        'C1·중급·1': { title: "이번 게임은 제가 이겼습니다.", detail: "틱택토와 하노이탑으로 배우는 알고리즘" },
        'C4·중급·1': { title: "작은 친구는 앞으로! 큰 친구는 뒤로!", detail: "정렬, 비정렬 알고리즘 배우기"}
      },
      심화: {
        'C2·심화·2': { title: "AI 노바와 함께 Mission Clear!", detail: "AI 노바를 활용하여 미션 수행하기" },
        'C7·중급·3': { title: "블록이 모여 게임이 되는 마법", detail: "블록 코딩으로 만들어보는 아케이드 게임" },
        'C6·중급·2': { title: "마인크래프트, 어디까지 해봤니?", detail: "코딩으로 플레이하는 마인크래프트" }
      }
    },
  };
  
  const getLevel = (score: number): CurriculumLevel => {
    if (score < 50) return "기초";
    if (score < 75) return "중급";
    return "심화";
  };

  const filteredCurriculumData = (dScore: number, iScore: number, mScore: number, cScore: number) => {
    const levels: Record<CurriculumType, CurriculumLevel> = {
      D: getLevel(dScore),
      I: getLevel(iScore),
      M: getLevel(mScore),
      C: getLevel(cScore),
    };
  
    return (Object.keys(levels) as CurriculumType[]).map((type) => {
      const level = levels[type];
      const levelData = curriculumData[type][level];

  
      return {
        type: `${type}과정`,
        children: Object.entries(levelData).map(([key, course]) => ({
          title: key,
          children: [
            { title: course.title, children: [{ title: course.detail }] },
          ],
        })),
      };
    });
  };
  
  const Tree: React.FC<{ data: any[]; level?: number }> = ({ data, level = 0 }) => (
    <div className={`tree-level-${level}`}>
      {data.map((node, index) => (
        <div key={index} className={`tree-node tree-level-${level}`}>
          <div>{node.title}</div>
          {node.children && (
            <>
              <Tree data={node.children} level={level + 1} />
              {/* 점선 이미지를 그룹 아래에 추가 */}
              {level === 0 && index !== data.length - 1 && (
              <div className="dotLine">
                <img src="/picture/점선.png" alt="점선" />
              </div>
            )}
            </>
          )}
        </div>
      ))}
    </div>
  );
  
  return (
    <>
      <CustomButton
        btnText="결과지 프린트 하기"
        textColor="#006387"
        onClick={() => {
          generatePDF();
        }}
        className={className}
      />
      <PDFDownloadStyled
        $dScore={dScore}
        $iScore={iScore}
        $mScore={mScore}
        $cScore={cScore}
      >
        <div
          ref={pdfRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '210mm',
            height: '297mm',
          }}
        >
          {/* ------------- Page 1 ------------- */}
          <div id="result-contents-1" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="symbol">
                <img src="/assets/logo/dimcSymbol.png" alt="symbol" />
              </div>
              <div className="title">
                <div className="mainTitle">
                  DIMC Test <br />
                  Inspection results
                </div>
                <div className="name">{name}.</div>
              </div>
              <div className="description">
                DIMC AI 디지털 역량 진단 검사는 4가지 디지털 핵심 역량을
                평가하는 도구로, 각 역량별로 개인의 수준을 파악할 수 있도록
                설계되었습니다. 이 도구는 학습자가 디지털 및 인공지능 관련
                역량을 얼마나 효과적으로 활용할 수 있는지를 진단합니다.
              </div>
              <div className="dimcDesc">
                <div className="desc">
                  <div className="circle d" />
                  <div className="text d">
                    디지털 <span className="english d">(Digital)</span>
                  </div>
                </div>
                <div className="desc">
                  <div className="circle i" />
                  <div className="text i">
                    인공지능
                    <span className="english i">(Artificial Intelligence)</span>
                  </div>
                </div>
                <div className="desc">
                  <div className="circle m" />
                  <div className="text m">
                    메이킹 <span className="english m">(Making)</span>
                  </div>
                </div>
                <div className="desc">
                  <div className="circle c" />
                  <div className="text c">
                    컴퓨팅 <span className="english c">(Computing)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 2 ------------- */}
          <div id="result-contents-2" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">DIMC 추천사.</div>
              <img
                src="/assets/result/pdf/professor.png"
                alt="professor"
                className="professor"
              />
              <div className="smallContent">
                학부모님과 학생 여러분 안녕하세요. 한양대학교 ERICA
                소프트웨어융합대학 학장 이동호 입니다.
                <br />
                다가오는 미래 AI 로봇 시대를 준비하며, 우리 아이들이 필수적으로
                갖추어야 할 역량을
                <br />
                체계적으로 점검하고 성장할 수 있는 기회가 DIMC진단검사로
                마련되었습니다.
                <br />
                <br />
                DIMC 진단검사는 디지털(Digital), 인공지능(Intelligence),
                메이킹(Making), 컴퓨팅(Computing)이라는
                <br />네 가지 주요 영역에서 우리 아이들의 현재 역량을 측정하고,
                <br />
                이를 기반으로 개인 맞춤형 교육 과정을 제공하기 위한 진단
                서비스입니다.
                <br /> 이 검사를 통해 아이들은 단순한 디지털 기기 사용 능력을
                넘어서, 창의적 사고 능력과 AI를 활용한 문제 해결 능력 등<br />
                미래 AI 사회에서 요구되는 다양한 핵심 역량을 진단받을 수
                있습니다.
                <br />
                <br /> 왜 DIMC 진단검사를 선택해야 할까요?
                <br /> 첫째, 아이들의 강점과 약점을 명확히 파악 할 수 있습니다.
                <br />
                DIMC 진단검사는 아이들의 현재 역량을 세밀히 분석하여 어떤
                부분에서 더 노력이 필요한지,
                <br /> 어떤 영역에서 강점을 발휘하는지를 명확히 보여줍니다.
                <br /> 둘째, AI 기반 맞춤형 교육과정을 추천해드립니다.
                <br /> 진단 결과를 바탕으로 AI 기술이 각 아이에게 최적화된
                교육과정을 추천합니다.
                <br /> 이를 통해 아이들은 보다 효율적이고 효과적으로 각 역량을
                발전시킬 수 있습니다.
                <br /> 셋째, 자기주도적 학습 계획 수립을 지원합니다.
                <br /> 진단검사를 통해 학생들은 자신의 부족한 부분을 스스로
                확인하고, 이에 맞는 학습 계획을 세울 수 있습니다.
                <br /> 이는 자기주도적 학습 습관을 형성하고 장기적으로 미래
                사회에 꼭 필요한 디지털 인재로 성장할 수 있는 <br />
                밑거름이 될 수 있습니다.
                <br /> 마지막, 미래 AI 시대에 꼭 필요한 인재가 되기 위한 초석을
                마련해줍니다.
                <br /> 단순한 학습이 아닌, 창의적 문제 해결 능력과 AI 활용
                역량까지 포함된 종합적인 진단은 미래 사회에서
                <br /> 경쟁력을 갖춘 인재로 성장할 수 있는 초석을 제공합니다.
                <br />
                <br />
                DIMC 진단검사는 우리 아이들이 미래를 준비하고, 자신감을 가지고
                성장할 수 있도록 돕는 든든한 첫걸음이 될 것입니다.
                <br /> 학부모님과 학생 여러분께 진심으로 추천드립니다. 아이들의
                무한한 가능성을 발견하고, 함께 미래로 나아가 보세요!
                <br />
                <br /> 감사합니다.
              </div>
              <div className="signatureWrapper">
                <div className="signatureText">
                  한양대학교 ERICA 소프트웨어융합대학 학장
                </div>
                <img
                  src="/assets/result/pdf/professorSign.png"
                  alt="signature"
                  className="signature"
                />
              </div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 3 ------------- */}
          <div id="result-contents-3" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">What is DIMC?</div>
              <div className="dimcDesc">
                DIMC 진단 검사는 네가지 핵심 역량을 종합적으로 평가하여 개인의
                수준을 진단하는 도구입니다.
                <br /> 이 도구는 각 역량의 강점과 개선점을 파악해 디지털 시대에
                필요한 실질적인 능력을 측정합니다.
              </div>
              <img
                src="/assets/result/pdf/digital.png"
                alt="digital"
                className="typeImg"
              />
              <div className="subDimcDesc">
                디지털 역량에서는 정보기술을 안전하게 활용하며, 이를 바탕으로
                윤리적이고 책임감 있는 디지털 시민으로 성장할 수 있는지를
                중점적으로 살펴봅니다. 강력한 비밀번호 설정, 사이버 괴롭힘 대응,
                저작권 준수 등 디지털 환경에서 요구되는 보 호와 윤리 의식을
                갖추고, 개인과 공동체의 안전을 지킬 수 있는 능력을 평가합니다.
                이를 통해 디지털 사회에서 책임감 을 갖춘 사용자가 될 준비 가
                되어 있는지 확인합니다.
              </div>
              <img
                src="/assets/result/pdf/artificialIntelligence.png"
                alt="artificialIntelligence"
                className="typeImg"
              />
              <div className="subDimcDesc">
                인공지능 역량은 AI의 원리와 기술을 이해하고 이를 통해 더 나은
                사회를 만들어 갈 수 있는지를 중점적으로 진단합니다. AI의 윤리적
                문제와 사회적 책임을 깊이 인식하며, 편향된 데이터나 환경적
                영향을 포함한 AI 사용의 부작용을 공정하게 다룰 수 있는지를
                살펴봅니다. 자율주행차의 윤리적 딜레마나 AI의 환경적 영향 등
                인공지능이 실제로 미치는 영향을 다각 도로 검토하여, 미래 기술을
                책임감 있게 사용할 수 있는지를 평가합니다.
              </div>
              <img
                src="/assets/result/pdf/making.png"
                alt="making"
                className="typeImg"
              />
              <div className="subDimcDesc">
                메이킹 역량은 과학적 원리와 창의적 문제 해결 능력을 통해 현실의
                문제를 스스로 설계하고 해결하는 능력을 평가합니다. 전자 부품
                이해, 진동 제어, 센서 활용 등 기술적 이해와 함께 메이커로서
                사회적 가치를 창출할 수 있는 창의성과 응용력을 중점적으로
                살펴봅니다. 창조적 사고를 바탕으로 세상에 긍정적인 변화를 일으킬
                수 있는 실질적인 제작 능력을 갖추고 있는지 확인합니다.
              </div>
              <img
                src="/assets/result/pdf/computing.png"
                alt="computing"
                className="typeImg"
              />
              <div className="subDimcDesc">
                컴퓨팅 역량은 논리적 사고와 문제 해결 능력을 통해 디지털
                환경에서 복잡한 문제를 체계적으로 풀어내는 능력을 살펴봅 니다.
                데이터 구조와 알고리즘 이해, 오류 관리, 네트워크 개념 등을
                바탕으로 디지털 문제를 해결하며, 컴퓨팅 사고력을 길러 기술의
                미래를 주도할 인재로 성장할 준비가 되어 있는지를 평가합니다.
                효율적인 코드 작성뿐만 아니라, 디지털 혁 신에 기여할 수 있는
                사고력과 실행력을 갖추었는지 확인합니다.
              </div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 4 ------------- */}
          <div id="result-contents-4" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">What is DIMC?</div>
              <div className="subTitle">DIMC의 필요성</div>
              <div className="smallContent">
                이 검사는 학생들에게는 디지털 시대를 살아가기 위해 반드시
                갖추어야 할 다양한 기술과 역량을 체계적으로 준비할 수 있는
                <br />
                기회를 제공하며, 학부모님과 교사에게는 자녀가 디지털 환경에서
                어떤 강점과 약점을 가지고 있는지 명확히 파악하여 앞으로의
                <br />
                학습 방향과 교육 전략을 효과적으로 설계할 수 있는 소중한 통찰과
                가이드를 제공합니다.
              </div>
              <div className="fourNecessityImg">
                <img
                  src="/assets/result/pdf/fourNecessity.jpg"
                  alt="necessity"
                />
              </div>
              <div className="subTitle">검사핵심</div>
              <div className="testCoreContent">
                <div className="testCoreSubTitle">
                  {' '}
                  <span className="testCoreCircle">❶</span> 나만의 강점 발견
                </div>
                <div className="testCoreSubDesc">
                  4 가지 핵심 역량 중 어떤 분야에서 강점을 가지고 있는지 파악할
                  수 있습니다.
                </div>
                <div className="testCoreSubTitle">
                  <span className="testCoreCircle">❷</span> 개선이 필요한 영역
                  확인
                </div>
                <div className="testCoreSubDesc">
                  현재 약한 분야를 정확히 진단하고 이를 보완할 학습 플랜을 세울
                  수 있습니다.
                </div>
                <div className="testCoreSubTitle">
                  <span className="testCoreCircle">❸</span> 미래를 준비하는 학습
                  방향 설정
                </div>
                <div className="testCoreSubDesc">
                  디지털 시대의 필수 역량을 체계적으로 발전시키며, 개인의 성장
                  목표를 설정하는 데 도움을 줍니다.
                </div>
              </div>
              <div className="subTitle">검사대상</div>
              <div className="studentTargetContent">
                <img src="/assets/result/pdf/targetStudent.jpg" alt="target" />
                <div className="studentTargetDesc">
                  <span className="blueCircle">•</span> 학교 공부와 진로를
                  고민하는 학생들에게 디지털과 AI 의 강점을 제시합니다.
                  <br />
                  <span className="blueCircle">•</span> AI, 디지털 시대에 맞는
                  직업과 기술을 알아가며 진로를 설계할 수 있습니다.
                  <br />
                  <span className="blueCircle">•</span> 디지털 환경에서 책임감
                  있고 안전하게 활동하는 방법을 익힐 수 있습니다.
                </div>
              </div>
              <div className="parentTargetContent">
                <img src="/assets/result/pdf/targetParent.jpg" alt="target" />
                <div className="parentTargetDesc">
                  <span className="pinkCircle">•</span> 자녀 및 학생의 디지털
                  학습 수준을 정확히 파악하고, 맞춤형 교육 방향을 설계할 수
                  있습니다.
                  <br />
                  <span className="pinkCircle">•</span> 자녀 및 학생의 디지털
                  학습 목표와 성과에 대해 더 효과적으로 소통할 수 있습니다.
                  <br />
                  <span className="pinkCircle">•</span> 자녀 및 학생의 성장을
                  관리하고 장기적인 학업과 진로목표를 설정하는데 도움을 받을 수
                  있습니다.
                </div>
              </div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 5 ------------- */}
          <div id="result-contents-5" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">{name}&apos;s competency portfolio.</div>
              <div className="subTitle">{name}의 상어</div>
              <img
                src={`/assets/result/shark/${sharkType}.png`}
                alt="sharkImg"
                className="sharkImg"
              />
              <div className="sharkTypeKorean">{sharkTypeKorean}</div>
              <div className="sharkTypeUpperCase">
                {sharkTypeUpperCase} SHARK
              </div>
              <div className="sharkKeywordWrapper">
                {sharkSubDataList[sharkType].keyword.map((keyword, index) => (
                  <div className="keyword" key={index}>
                    {keyword}
                  </div>
                ))}
              </div>
              <div className="comment">
                {sharkSubDataList[sharkType].comment}
              </div>
              <div className="commentFrom">
                - {sharkSubDataList[sharkType].commentFrom}
              </div>
              <div className="sharkTypeText">{sharkTypeText}</div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 6 ------------- */}
          <div id="result-contents-6" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="subTitle">DIMC 역량 성취도</div>
              <div className="radarWrapper">
                <PDFRadarChart
                  dScore={dScore}
                  iScore={iScore}
                  mScore={mScore}
                  cScore={cScore}
                />
              </div>
              <div className="dimcScore">
                디지털(Digital) : {dScore}%<br />
                인공지능(Artificial Intelligence) : {iScore}%<br />
                메이킹(Making) : {mScore}%<br />
                컴퓨팅(Computing) : {cScore}%
              </div>
              <div className="totalScore">종합 성취도 : {totalScore}%</div>

              {/* d section */}
              <div className="dimcType">
                <span className="d">➀</span> 디지털
                <span className="english">(Digital)</span>
              </div>
              <div className="tagDesc">
                <span className="d">디지털 윤리</span>
                <span className="d">디지털 발자국</span>
                <span className="d">개인정보 보호</span>
                <span className="d">저작권 준수</span>
                <span className="d">가상현실 적응력</span>
                <span className="d">디지털 협업</span>
              </div>
              <div className="dimcScoreBar">
                <div className="dimcSubTitle d">
                  당신의 디지털(Digital) 역량의 현재 위치는?
                </div>
                <div className="score d">{dScore}%</div>
              </div>
              <div className="scoreBarWrap">
                <div className="scoreBar d" />
              </div>
              <div className="dimcTypeText">{dTypeDescription}</div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 7 ------------- */}
          <div id="result-contents-7" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              {/* i section */}
              <>
                <div className="dimcType">
                  <span className="i">➁</span> 인공지능
                  <span className="english">(Artificial Intelligence)</span>
                </div>
                <div className="tagDesc">
                  <span className="i">머신러닝</span>
                  <span className="i">딥러닝</span>
                  <span className="i">자율주행 딜레마</span>
                  <span className="i">데이터 편향</span>
                  <span className="i">AI윤리</span>
                  <span className="i">인공지능 학습법</span>
                  <span className="i">튜링 테스트</span>
                </div>
                <div className="dimcScoreBar">
                  <div className="dimcSubTitle i">
                    당신의 인공지능(Artificial Intelligence) 역량의 현재 위치는?
                  </div>
                  <div className="score i">{iScore}%</div>
                </div>
                <div className="scoreBarWrap">
                  <div className="scoreBar i" />
                </div>
                <div className="dimcTypeText mar">{iTypeDescription}</div>
              </>
              {/* m section */}
              <>
                <div className="dimcType">
                  <span className="m">➂</span> 메이킹
                  <span className="english">(Making)</span>
                </div>
                <div className="tagDesc">
                  <span className="m">전자회로 구성</span>
                  <span className="m">기계적 고정 요소</span>
                  <span className="m">음향 증폭 원리</span>
                  <span className="m">공간 인식</span>
                  <span className="m">패턴 인식</span>
                  <span className="m">아두이노</span>
                  <span className="m">센서 제어</span>
                </div>
                <div className="dimcScoreBar">
                  <div className="dimcSubTitle m">
                    당신의 메이킹(Making) 역량의 현재 위치는?
                  </div>
                  <div className="score m">{mScore}%</div>
                </div>
                <div className="scoreBarWrap">
                  <div className="scoreBar m" />
                </div>
                <div className="dimcTypeText mar">{mTypeDescription}</div>
              </>
              {/* c section */}
              <>
                <div className="dimcType">
                  <span className="c">➃</span> 컴퓨팅
                  <span className="english">(Computing)</span>
                </div>
                <div className="tagDesc">
                  <span className="c">2진법</span>
                  <span className="c">블록코딩</span>
                  <span className="c">오류처리</span>
                  <span className="c">변수와 연산</span>
                  <span className="c">RGB 색상 모델</span>
                  <span className="c">암호화 및 복호화</span>
                  <span className="c">네트워크 구성</span>
                </div>
                <div className="dimcScoreBar">
                  <div className="dimcSubTitle c">
                    당신의 컴퓨팅(Computing) 역량의 현재 위치는?
                  </div>
                  <div className="score c">{cScore}%</div>
                </div>
                <div className="scoreBarWrap">
                  <div className="scoreBar c" />
                </div>
                <div className="dimcTypeText">{cTypeDescription}</div>
              </>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 8: 추천 커리큘럼 ------------- */}



  <div id="result-contents-8" style={{ pageBreakAfter: 'always' }}>
  <div className="header">
    {name} | {today}
  </div>

  <div className="mainContentSection">
  <div className="pageTitle">AI 기반 추천 커리큘럼</div>
    <div className="subTitle">테스트 결과에 따른 맞춤형 커리큘럼 추천</div>
    <div className="smallContent">
      DIMC 진단검사는 디지털, 인공지능, 메이킹, 컴퓨팅의 4가지 역량을 바탕으로
      학습자의 강점과 현재 수준을 평가합니다. 진단검사 결과에 따른 맞춤형
      커리큘럼을 확인해 보세요!
    </div>

    <div className="dimcScore">
      디지털(Digital) : {dScore}%<br />
      인공지능(Artificial Intelligence) : {iScore}%<br />
      메이킹(Making) : {mScore}%<br />
      컴퓨팅(Computing) : {cScore}%
    </div>
    <div className="totalScore">종합 성취도 : {totalScore}%</div>
    <div className="CurriculumIcon">
      <img src="/picture/computer.png" alt="커리큘럼 아이콘" />
    </div>
    <div className="CurriculumTitle">AI 기반 추천 커리큘럼</div>
    <div className="decorativeImage">
      <img src="/picture/긴점선.png" alt="커리큘럼 장식 이미지" />
    </div>

    <div className="process-wrapper">
      {filteredCurriculumData(dScore, iScore, mScore, cScore).map((process, index) => (
        <div key={index} className="process-container">
          {/* 과정 제목 박스 */}
          <div className="process-title-box">
            <div className="process-title">{process.type}</div>
          </div>

          {/* 트리 구조 박스 */}
          <div className="tree-box">
            <Tree data={process.children} />
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="footer">
    <div className="text">
      DIMC | Copyright © 2024[DORO] All rights reserved.
    </div>
    <div className="logoWrapper">
      <img src="/assets/logo/sharkLogo.png" alt="logo" className="shark" />
      <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
    </div>
  </div>
</div>





          {/* ------------- Page 9 ------------- */}
          <div id="result-contents-9" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">샤크계급도.</div>
              <div className="subTitle">DIMC진단검사의 필요성</div>
              <div className="smallContent">
                DIMC 진단검사는 디지털, 인공지능, 메이킹, 컴퓨팅의 4가지 역량을
                바탕으로 학습자의 강점과 현재 수준을 평가합니다. 테스트 결과에
                따라 당신만의 상징인 특별한 상어 계급이 부여됩니다! 각 상어는
                역량과 특성을 대표하며, 계급이 높을수록 역량의 깊이가 커집니다.
                자신의 결과를 바탕으로 어떤 상어와 연결되었는지 확인해 보세요!
              </div>
              <div className="sharkRankImg">
                <img src="/assets/result/pdf/sharkRank.png" alt="sharkRank" />
              </div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 10 ------------- */}
          <div id="result-contents-10" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">The role of academic achievement.</div>
              <div className="subTitle">교과 성취도의 연관성</div>
              <div className="largeContent">
                디지털 교육은 교과 성취도를 높이는 데 중요한 역할을 합니다.
                샤크에서 제공하는 디지털 교육은 아이들이 더 효과적으로 교과
                과정을 이해하고, 문제를 해결하는 능력을 기르는 데 기여합니다.
              </div>
              <img
                src="/assets/result/pdf/korean.jpg"
                alt="korean"
                className="subjects"
              />
              <div className="subjectRelativeSubDesc">
                디지털 교육을 통해 아이들은 정보 검색과 분석 능력을 키우고,
                온라인 커뮤니케이션을 통해 논리적으로 생각하고
                <br /> 표현하는 방법을 배웁니다. 이는 국어에서 요구하는 독해
                능력과 논리적 사고력, 글쓰기 능력을 강화하는 데 직접적인 도움을
                줍니다.
                <br /> 창의적인 프로젝트 기반 학습은 아이들이 다양한 주제를
                분석하고 표현하는 능력을 높여, 국어 성취도를 향상시키는 데
                기여합니다.
              </div>
              <img
                src="/assets/result/pdf/english.jpg"
                alt="korean"
                className="subjects"
              />
              <div className="subjectRelativeSubDesc">
                디지털 도구를 활용한 정보 검색과 글로벌 소통 능력은 영어 학습에
                큰 장점을 줍니다.
                <br /> 샤크는 영어 자료와 온라인 커뮤니케이션 활동을 통해
                아이들이 자연스럽게 영어에 노출되도록 합니다.
                <br /> 디지털 학습 자료와 콘텐츠는 영어 독해 및 듣기 능력 향상에
                기여하며, 실질적인 영어 능력 향상에 도움이 됩니다.
              </div>
              <img
                src="/assets/result/pdf/math.jpg"
                alt="korean"
                className="subjects"
              />
              <div className="subjectRelativeSubDesc">
                샤크의 컴퓨팅 역량 교육은 논리적 사고력과 문제 해결 능력을
                강조합니다.
                <br /> 알고리즘과 데이터 분석을 배우면서 학생들은 수학적 사고를
                자연스럽게 기르고,
                <br /> 복잡한 문제를 단계적으로 풀어나가는 능력을 향상시킵니다.
                이는 수학 문제 해결 과정에 직접적인 도움을 줄 뿐만 아니라,
                <br /> 데이터 해석과 분석 능력을 통해 수학 성적 향상에도
                기여합니다.
              </div>
              <img
                src="/assets/result/pdf/science.jpg"
                alt="korean"
                className="subjects"
              />
              <div className="subjectRelativeSubDesc">
                AI와 메이킹 교육을 통해 아이들은 과학의 기본 원리를 탐구하고
                실험적인 접근을 경험합니다.
                <br /> 3D 프린팅, 로봇 제작 등의 활동을 통해 과학적 사고력과
                창의력이 길러지며, 이는 과학 교과 성취도를 높이는 데 도움이
                됩니다.
                <br /> 프로젝트 기반 학습은 과학 실험과도 밀접하게 연결되어
                있어, 과학적 문제 해결 능력을 강화합니다.
              </div>
              <img
                src="/assets/result/pdf/subjectRelative.jpg"
                alt="subjectRelative"
                className="subjectRelative"
              />
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>

          {/* ------------- Page 11 ------------- */}
          <div id="result-contents-11" style={{ pageBreakAfter: 'always' }}>
            <div className="header">
              {name} | {today}
            </div>

            <div className="mainContentSection">
              <div className="pageTitle">
                Have you confirmed your potential?
              </div>
              <div className="subTitle">당신의 가능성을 확인하셨나요?</div>
              <div className="largeContent">
                DIMC 프로그램과 함께 그 가능성을 실력으로, 현실로 만들어 보세요.
                <br />
                디지털 시대의 핵심 역량을 갖추고 더 넓은 미래를 준비할 준비가
                되셨다면,
                <br /> 지금 바로 샤크와 함께하세요!
              </div>
              <div className="subTitle">샤크는 다릅니다.</div>
              <div className="sixDifference">
                <img
                  src="/assets/result/pdf/difference1.jpg"
                  alt="difference"
                  className="difference"
                />
                <img
                  src="/assets/result/pdf/difference2.jpg"
                  alt="difference"
                  className="difference"
                />
                <img
                  src="/assets/result/pdf/difference3.jpg"
                  alt="difference"
                  className="difference"
                />
                <img
                  src="/assets/result/pdf/difference4.jpg"
                  alt="difference"
                  className="difference"
                />
                <img
                  src="/assets/result/pdf/difference5.jpg"
                  alt="difference"
                  className="difference"
                />
                <img
                  src="/assets/result/pdf/difference6.jpg"
                  alt="difference"
                  className="difference"
                />
              </div>
              <img
                src="/assets/result/pdf/classApply.png"
                alt="classApply"
                className="classApply"
              />
              <div className="ticketWrapper">
                <img
                  src="/assets/result/pdf/ticket1.jpg"
                  alt="ticket"
                  className="ticket"
                />
                <img
                  src="/assets/result/pdf/ticket2.jpg"
                  alt="ticket"
                  className="ticket"
                />
              </div>
            </div>

            <div className="footer">
              <div className="text">
                DIMC | Copyright © 2024[DORO] All rights reserved.
              </div>
              <div className="logoWrapper">
                <img
                  src="/assets/logo/sharkLogo.png"
                  alt="logo"
                  className="shark"
                />
                <img src="/assets/logo/logo.png" alt="logo" className="dimc" />
              </div>
            </div>
          </div>
        </div>
      </PDFDownloadStyled>
    </>
  );
};

export default PDFDownload;
