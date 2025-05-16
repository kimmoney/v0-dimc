import { useState, useEffect } from 'react';
import Image from 'next/image';

import CustomButton from '../Button';
import { SharkBannerStyled } from './styled';

const SharkBanner = () => {
  // 화면 너비 상태를 관리
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 초기 화면 너비 설정
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth <= 480); // 480px 이하일 때 모바일로 간주
    };

    // 윈도우 사이즈 변경 시 업데이트
    window.addEventListener('resize', updateWindowSize);

    // 초기 렌더링 시 한 번 실행
    updateWindowSize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return (
    <SharkBannerStyled>
      <div className="sharkBanner">
        <div className="leftWrapper">
          <Image
            src={`/assets/logo/bannerImg.png`}
            alt="main"
            width={500}
            height={50}
            className="sharkLogo"
          />
        </div>
        <CustomButton
          btnText={isMobile ? '신청하기' : '상담 신청하기'} // 모바일 화면일 때 텍스트 변경
          textColor="#fff"
          onClick={() => {
            window.open('https://sharkkorea.com/35');
          }}
          className="sharkBannerButton"
        />
      </div>
    </SharkBannerStyled>
  );
};

export default SharkBanner;
