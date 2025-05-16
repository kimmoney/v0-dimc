import { useEffect, useRef } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { BeforeResultPageStyled } from './styled';

const BeforeResultPage = () => {
  // sharkImg 애니메이션이 끝나면, /result 페이지로 이동합니다.
  const router = useRouter();
  const sharkImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleAnimationEnd = () => {
      // router.push('/result');
      
      if (sharkImgRef.current) {
        // 애니메이션이 끝나면 페이드 아웃 클래스를 추가
        sharkImgRef.current.classList.add('fadeOut');
      }

      // 페이드 아웃 애니메이션이 끝나고 나서 /result 페이지로 이동
      setTimeout(() => {
        router.push('/result');
      }, 1000); // 페이드 아웃 애니메이션의 길이와 일치
    };

    const sharkImgElement = sharkImgRef.current;
    if (sharkImgElement) {
      sharkImgElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (sharkImgElement) {
        sharkImgElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [router]);

  return (
    <BeforeResultPageStyled>
      <div className="textWrapper">나는 어떤 상어일까?</div>
      <Image
        src={`/assets/result/before/questionShark.png`}
        alt="main"
        width={1000}
        height={1000}
        className="sharkImg"
        ref={sharkImgRef}
      />
    </BeforeResultPageStyled>
  );
};

export default BeforeResultPage;
