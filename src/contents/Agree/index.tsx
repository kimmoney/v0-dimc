import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { AgreePageStyled } from './styled';

const AgreePage = () => {
  const router = useRouter();

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [collectAgree, setCollectAgree] = useState('');

  const options = [
    { label: 'DIMC 이용약관', value: 'dimcuse' },
    { label: '개인정보 보호', value: 'privacy' },
    { label: '저작권 및 지적 재산권', value: 'copyright' },
    {
      label: '개인정보 수집 및 이용 동의',
      value: 'collect',
    },
  ];

  const collectOption = [
    { label: '동의함', value: 'agree' },
    { label: '동의하지 않음', value: 'disagree' },
  ];

  const handleCheckAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckedList(isChecked ? options.map(option => option.value) : []);
    setCheckAll(isChecked);
  };

  const handleCheckboxChange = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter(item => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
    setCheckAll(
      checkedList.length + (checkedList.includes(value) ? -1 : 1) ===
        options.length,
    );
  };

  return (
    <AgreePageStyled>
      <div className="agreeContainer">
        <Image
          src="/assets/logo/dimcLogoWhite.png"
          alt="logo"
          className="logo"
          width={150}
          height={42}
        />
        <div className="agreeContent">
          <div className="mainText">반가워요!</div>
          <div className="allAgreeWrapper">
            <input
              type="checkbox"
              className="checkbox"
              onChange={handleCheckAllChange}
              checked={checkAll}
            />
            <label className="mainDetailTitle">전체 동의하기</label>
          </div>
          {options.map(option => (
            <div key={option.value} className="agreeDetailWrapper">
              <div className="checkboxWrapper">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkedList.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                <label className="mainDetailTitle">{option.label}</label>
                <div className="essentialText">[필수]</div>
              </div>
              {option.value == 'dimcuse' && (
                <div className="detailWrapper dimcuse">
                  <div className="content">
                    <span className="detailTitle">목적</span>: 본 이용약관은
                    사용자가 서비스를 이용하는 데 필요한 규칙과 절차, 사용자와
                    회사 간의 권리, 의무 및 책임 사항을 명확히 하기 위해
                    설정됩니다.
                  </div>
                  <div className="content">
                    <span className="detailTitle">이용규정</span>: 사용자는 본
                    약관에 동의함으로써 서비스 이용에 필요한 규칙과 조건들을
                    준수하기로 동의합니다.
                  </div>
                </div>
              )}
              {option.value == 'privacy' && (
                <div className="detailWrapper privacy">
                  <div className="content">
                    <span className="detailTitle">개인정보의 수집 및 이용</span>
                    : 회사는 검사의 실시와 결과 분석을 위해 필요한 최소한의
                    개인정보(예: 이름, 연령 등)를 수집합니다. <br /> 사용자는
                    이용약관에 동의함으로써 개인정보 수집 및 이용에 동의하는
                    것으로 간주됩니다.
                  </div>
                  <div className="content">
                    <span className="detailTitle">정보 사용 목적</span>: 수집된
                    정보는 검사의 실시, 결과 분석, 통계 목적으로만 사용되며,
                    결과를 바탕으로 사용자에게 향후 추천할 수 있는 학습 경로나
                    활동을 제안하는 데 사용될 수 있습니다.
                  </div>
                  <div className="content">
                    <span className="detailTitle">정보 보안</span>: 회사는
                    개인정보 보호법을 준수하며, 사용자 정보의 안전한 보관과
                    비밀을 유지하기 위해 적절한 기술적, 관리적 대책을 마련하고
                    유지합니다.
                  </div>
                </div>
              )}
              {option.value == 'copyright' && (
                <div className="detailWrapper">
                  <div className="content">
                    <span className="detailTitle">저작권</span>: 서비스 내에서
                    제공되는 모든 자료와 컨텐츠의 저작권은 회사에 귀속 됩니다.
                    사용자는 회사의 명시적인 동의 없이 이를 복제, 배포, 수정,
                    전송하는 행위를 금합니다.
                  </div>
                </div>
              )}
              {option.value == 'collect' && (
                <div className="detailWrapper">
                  <div className="content">
                    <span className="detailTitle">
                      주식회사 도로의 개인정보 수집 이용 목적은 다음과 같습니다.
                      내용을 자세히 읽어 보신 후 동의 여부를 결정하여 주시기
                      바랍니다.
                    </span>
                  </div>
                  <div className="content">
                    <span className="detailTitle">
                      수집 항목: 이름, 생년월일, 성별, 이메일 주소, 전화번호
                    </span>
                  </div>
                  <div className="content">
                    <span className="detailTitle">이용 목적</span>: 검사 진행 및
                    관리, 맞춤형 결과 제공 및 추천 서비스 제공, 고객 문의 및
                    불만 처리
                  </div>
                  <div className="content">
                    <span className="detailTitle">보유 및 이용 기간</span>: 검사
                    결과 제공 후 6개월까지 보유하며, 이후 안전하게 파기
                  </div>
                  <div className="red">
                    귀하는 위와 같이 개인정보를 수집•이용하는데 동의를 거부할
                    권리가 있습니다. 필수 수집 항목에 대한 동의를 거절하는 경우
                    서비스 이용이 제한 될 수 있습니다.
                  </div>
                  <div className="lastAgree">
                    개인정보 수집 및 이용에 동의합니다.
                  </div>
                  <div className="agreeOption">
                    {collectOption.map(option => (
                      <div key={option.value} className="lastAgree check">
                        {option.label}
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={collectAgree === option.value}
                          onChange={() => setCollectAgree(option.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            className="nextBtn"
            disabled={
              checkedList.length !== options.length || collectAgree !== 'agree'
            }
            onClick={() => {
              router.push('/personal-info');
            }}
          >
            다음
          </button>
        </div>
      <div className="bg-bottom"></div>
      </div>
      </AgreePageStyled>
  );
};

export default AgreePage;
