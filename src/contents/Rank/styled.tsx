import styled from 'styled-components';

export const RankPageStyled = styled.div`
.imgDesktop{
    margin:auto;
    width: 100%;
    max-width: 100vw;
}
.imgMobile{
    display: none;
}

@media (max-width: 480px) {
    .imgDesktop{
        display: none;
    }
    .imgMobile{
        margin:auto;
        display: block;
        width: 100%;
    }
}
`;
