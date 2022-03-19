import { useContext, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box, Hidden, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';

import HeaderMenu from './Menu';
import Logo from 'src/components/Logo';

import styles from './header.module.scss';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: center;
        width: 100%;
`
);

function Header() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const theme = useTheme();
  const handleChange = (_event: React.SyntheticEvent, value: number) => {
    setSelectedTab(value);
  };
  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          minWidth: theme.breakpoints.values.sm,
          maxWidth: theme.breakpoints.values.lg,
          width: '100%'
        }}
      >
        <Box display="flex">
          <Hidden mdUp>
            <Logo />
          </Hidden>
          <Hidden mdDown>
            <HeaderMenu />
          </Hidden>
        </Box>
        <Box display="flex" alignItems="center">
          <Tabs
            className={styles.tabs}
            value={selectedTab}
            onChange={handleChange}
          >
            <Tab className={styles.tab} id="1" label="My Cases" />
            <Tab className={styles.tab} id="2" label="Settings" />
            <Tab className={styles.tab} id="3" label="Logout" />
          </Tabs>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
