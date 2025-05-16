import Image from 'next/image';

import baseImagePath from '@/api/baseImagePath';

import { RankPageStyled } from './styled';

const Rankpage = () => {
  return (
    <RankPageStyled>
      <Image
        src={`${baseImagePath}/assets/main/rankDesktop.png`}
        alt="rank"
        width={1880}
        height={1880}
        className="imgDesktop"
      />
      <Image
        src={`${baseImagePath}/assets/main/rankMobile.png`}
        alt="rank"
        width={1880}
        height={1880}
        className="imgMobile"
      />
    </RankPageStyled>
  );
};

export default Rankpage;
