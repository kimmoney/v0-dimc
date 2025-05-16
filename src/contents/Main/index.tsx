import DescriptionSection from '@/layout/Main/DescriptionSection';
import FeatureSection from '@/layout/Main/FeatureSection';

import { MainPageStyled } from './styled';

const MainPage = () => {
  return (
    <MainPageStyled>
      <DescriptionSection />
      <FeatureSection />
    </MainPageStyled>
  );
};

export default MainPage;
