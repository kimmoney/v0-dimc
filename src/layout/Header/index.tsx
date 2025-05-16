import { useRouter } from 'next/router';

import CustomButton from '@/components/Button';

// import CustomButton from '@/components/Button';
import { HeaderStyle } from './styled';

const Header = () => {
  const router = useRouter();

  return (
    <HeaderStyle>
      <div className="logo">
        <CustomButton
          btnImg={`/assets/logo/sharkLogo.png`}
          imgWidth={130}
          onClick={() => {
            router.push('/');
          }}
        />
        <CustomButton
          btnImg={`/assets/logo/logo.png`}
          imgWidth={100}
          onClick={() => {
            router.push('/');
          }}
        />
      </div>

      <div className="menuWrapper">
        <CustomButton
          btnText="계급도"
          textColor="#7D7D7D"
          fontSize="16px"
          className="menu"
          onClick={() => {
            router.push('/rank');
          }}
        />
      </div>
    </HeaderStyle>
  );
};

export default Header;
