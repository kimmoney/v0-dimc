import Image from 'next/image';

import { getSharkLabelByValue } from '@/util/getSharkTypeByScore';

import { SharkSectionStyled } from './styled';

interface SharkSectionProps {
  sharkType: string;
}

const SharkSection = ({ sharkType }: SharkSectionProps) => {
  const sharkText = getSharkLabelByValue(sharkType);
  console.log(sharkText)

  return (
    <SharkSectionStyled>
      <div className="sharkNameText">내 이름은 {sharkText}야!</div>
      <Image
        src={`/assets/result/shark/${sharkType}.png`}
        alt="main"
        width={550}
        height={550}
        className="curriculumImg fadeIn"
      />
    </SharkSectionStyled>
  );
};

export default SharkSection;
