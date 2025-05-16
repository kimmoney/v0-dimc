import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import { PersonalInfoPageStyled } from './styled';

const PersonalInfoPage = () => {
  const router = useRouter();

  const [selectedGender, setSelectedGender] = useState('');
  const [englishNameFirst, setEnglishNameFirst] = useState('');
  const [englishNameLast, setEnglishNameLast] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneEnd, setPhoneEnd] = useState('');

  const handleGenderSelect = (gender: any) => {
    setSelectedGender(gender);
  };

  const savePersonalInfo = () => {
    // 생년월일 형식 검사 (YYMMDD)
    const birthRegex = /^\d{6}$/;
    if (!birthRegex.test(birth)) {
      Modal.error({
        title: '생년월일 형식이 올바르지 않습니다',
        content: '생년월일을 다시 입력해주세요',
      });
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Modal.error({
        title: '이메일 형식이 올바르지 않습니다',
        content: '이메일을 다시 입력해주세요',
      });
      return;
    }

    // 휴대폰 번호 형식 검사
    const phoneMiddleRegex = /^\d{4}$/;
    const phoneEndRegex = /^\d{4}$/;
    if (!phoneMiddleRegex.test(phoneMiddle) || !phoneEndRegex.test(phoneEnd)) {
      Modal.error({
        title: '휴대폰 번호 형식이 올바르지 않습니다',
        content: '휴대폰 번호를 다시 입력해주세요',
      });
      return;
    }

    const personalInfo = {
      name: name,
      englishname: `${englishNameFirst} ${englishNameLast}`,
      birth: birth,
      email: email,
      phone: `010-${phoneMiddle}-${phoneEnd}`,
      gender: selectedGender,
    };

    localStorage.setItem('personalinfo', JSON.stringify(personalInfo));

    router.push('/start');
  };

  // 생년월일 숫자만 입력하고 길이를 제한하는 함수
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value.length <= 6) { // 최대 6자리만 허용
      setBirth(value);
    }
  };

  // 숫자만 입력하고 길이를 제한하는 함수 (휴대폰 번호 변경 함수)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setPhone: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value.length <= 4) { // 최대 4자리만 허용
      setPhone(value);
    }
  };

  return (
    <PersonalInfoPageStyled>
      <div className="pInfoContainer">
        <Image
          src="/assets/logo/dimcLogoWhite.png"
          alt="logo"
          className="logo1"
          width={150}
          height={42}
        />
        <div className="pInfoContent">
          <Image
            src="/assets/logo/logo.png"
            alt="logo"
            className="logo2"
            width={150}
            height={42}
          />
          <div className="mainText">반가워요!</div>
          <div className="subText">Digital Literacy Education</div>
          <div className="item name">
            <div className="title">이름</div>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="item englishName">
            <div className="title">영문 이름</div>
            <div className="englishInputWrapper">
              <input
                type="text"
                placeholder="성"
                className="englishInput"
                onChange={e => setEnglishNameFirst(e.target.value)}
              />
              <input
                type="text"
                placeholder="이름"
                className="englishInput"
                onChange={e => setEnglishNameLast(e.target.value)}
              />
            </div>
          </div>
          <div className="item birth">
            <div className="title">생년월일</div>
            <input
              type="text"
              placeholder="생년월일 6자리를 입력해주세요"
              value={birth}
              onChange={handleBirthChange} // 생년월일 변경 함수 호출
            />
          </div>
          <div className="item gender">
            <div className="title">성별</div>
            <div className="genderOptions">
              <div
                className={`genderOption ${selectedGender === 'male' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('male')}
              >
                남자
              </div>
              <div
                className={`genderOption ${selectedGender === 'female' ? 'selected' : ''}`}
                onClick={() => handleGenderSelect('female')}
              >
                여자
              </div>
            </div>
          </div>

          <div className="item email">
            <div className="title">이메일</div>
            <input
              type="text"
              placeholder="ex) dimc2342@naver.com"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="item phone">
            <div className="title">휴대폰 번호</div>
            <div className="phoneInputWrapper">
              <input
                type="text"
                value={'010'}
                readOnly
                className="phoneInput"
              />
              <input
                type="text"
                placeholder="0000"
                className="phoneInput"
                value={phoneMiddle}
                onChange={e => handlePhoneChange(e, setPhoneMiddle)}
              />
              <input
                type="text"
                placeholder="0000"
                className="phoneInput"
                value={phoneEnd}
                onChange={e => handlePhoneChange(e, setPhoneEnd)}
              />
            </div>
          </div>
          <button
            className="nextBtn"
            disabled={
              selectedGender === '' ||
              name === '' ||
              englishNameFirst === '' ||
              englishNameLast === '' ||
              birth === '' ||
              email === '' ||
              phoneMiddle === '' ||
              phoneEnd === ''
            }
            onClick={() => {
              savePersonalInfo();
            }}
          >
            다음
          </button>
        </div>
      </div>
    </PersonalInfoPageStyled>
  );
};

export default PersonalInfoPage;
