import { useRouter } from 'next/router';

import CustomButton from '@/components/Button';

import { StartPageStyled } from './styled';

const StartPage = () => {
  const router = useRouter();
  return (
    <StartPageStyled>
      <div className="topWrapper">이제 항해를 시작해 볼까요?</div>
        <CustomButton
          btnText={'시작하기!'}
          textColor="#fff"
          onClick={() => {
            router.push('/question/0');
          }}
          className='startBtn'
        />
    </StartPageStyled>
  );
};

export default StartPage;
