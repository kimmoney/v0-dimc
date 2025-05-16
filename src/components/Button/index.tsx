import Image from 'next/image';

import baseImagePath from '@/api/baseImagePath';

import { CustomButtonStyled } from './styled';

interface CustomButtonProps {
  btnText?: any;
  btnImg?: any;
  onClick?: any;
  textColor?: string;
  fontSize?: string;
  className?: string;
  imgWidth?: number;
}

const CustomButton = ({
  btnText,
  btnImg,
  onClick,
  textColor,
  fontSize,
  className,
  imgWidth,
}: CustomButtonProps) => {
  return (
    <CustomButtonStyled
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      $textColor={textColor}
      $fontSize={fontSize}
      className={className}
    >
      {btnText ? (
        btnText
      ) : (
        <Image
          src={`${baseImagePath}${btnImg}`}
          alt="button"
          width={imgWidth? imgWidth : 100}
          height={100}
        />
      )}
    </CustomButtonStyled>
  );
};

export default CustomButton;
