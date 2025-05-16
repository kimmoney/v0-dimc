/*
  [CustomRadio 컴포넌트]
  - 라디오 버튼 컴포넌트
  - options: 라디오 버튼 옵션
  - value: 라디오 버튼 값
  - setValue: 라디오 버튼 값 변경 함수
  - className: 라디오 버튼 스타일링을 위한 클래스
  
  - options.map을 통해 라디오 버튼을 생성
  - 라디오 버튼 클릭 시, setValue를 통해 value 변경
  - value === item.value일 때, checked 상태로 변경
 */
import Image from 'next/image';

import baseImagePath from '@/api/baseImagePath';

import { CustomRadioStyled } from './styled';

interface CustomInputProps {
  options?: Array<{
    label: string;
    value: string | number;
    id?: string | number;
    score: number;
    image?: string;
  }>;
  value?: any;
  setValue?: any;
  parentClassName?: string;
  className?: string;
}

const CustomRadio = ({
  options,
  value,
  setValue,
  parentClassName,
  className,
}: CustomInputProps) => {
  return (
    <div className={parentClassName}>
      {!!options &&
        options.map(item => {
          return (
            <div key={item.id} className={className}>
              <input
                type="radio"
                name={item.label}
                value={item.value}
                checked={value === item.value}
                onChange={() => {
                  if (setValue) setValue(item.value);
                }}
              />
              <label
                style={{ fontFamily: 'PtBandocheRegular', cursor: 'pointer' }}
                onClick={() => {
                  if (setValue) setValue(item.value);
                }}
              >
                {item.label}
              </label>
              {item?.image && (
                <img
                  src={`${baseImagePath}/assets/dimcImg/options/${item.image}`}
                  alt="optionImage"
                  className="optionImage"
                  onClick={() => {
                    if (setValue) setValue(item.value);
                  }}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CustomRadio;
