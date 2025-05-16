import styled from 'styled-components';

export const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 88px;
  padding: 0 32px;
  background-color: #fff;
  .logo {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .menuWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 150px; */
    .menu {
      font-family: 'PyeongtaegAnbocheRegular';
    }
  }
  @media (max-width: 480px) {
    height: 44px;
    .logo {
      width: 120px;
    }
    .menuWrapper {
      .menu{
        font-size: 15px;
      }
    }
  }
`;
