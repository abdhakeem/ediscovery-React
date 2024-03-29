import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';


interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            
        }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  return (
    <>
      {/* <Sidebar /> */}
      <MainWrapper>
        <Header />
        <MainContent>
          <Breadcrumbs />
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
