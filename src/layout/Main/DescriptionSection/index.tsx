import Image from 'next/image';

import { DescriptionSectionStyled } from './styled';

const DescriptionSection = () => {
  return (
    <DescriptionSectionStyled>
      <div className='mainSection'>
      <div className="leftContainer">
        <div className="title">DIMC</div>
        <div className="subTitle">Digital Literacy Education</div>
        <div className="description">
          나만의 역량을 진단하고, 맞춤형 학습 프로그램을 만나보세요.
          <br />더 나은 미래를 위한 첫 걸음을 DIMC와 함께하세요!
        </div>
      </div>
      <div className="rightContainer">
        <Image
          className="mainShark"
          src="/assets/main/mainShark.png"
          alt="main shark"
          width={440}
          height={400}
        />
      </div>
      </div>
    </DescriptionSectionStyled>
  );
};

export default DescriptionSection;
