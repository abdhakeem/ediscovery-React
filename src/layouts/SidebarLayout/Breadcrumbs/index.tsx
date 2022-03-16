import { useContext } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import Logo from 'src/components/Logo';
import 'src/style.css';
import { Grid } from 'ag-grid-community';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: 150px;
        color: ${theme.header.textColor};
        right: 0;
        z-index: 5;
        box-shadow: ${theme.header.boxShadow};
        justify-content: space-between;
        width: 100%;
        padding: 50px 40px 0px 40px;
        background: #f5f5f5;
        color: #000;
        
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            
        }
`
);

function Breadcrumbs() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

  return (
    <HeaderWrapper display="block" alignItems="center" className='Breadcrumbs-body'>
      <div>
      <Box> <h2 className="Breadcrumb-heading">[CASE NAME]</h2> </Box>
      <Box> <p className="Breadcrumb-link"> Cases &gt; 1 </p> </Box>
      </div>
    </HeaderWrapper> 
  );
}

export default Breadcrumbs;
