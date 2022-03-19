import { Container, Breadcrumbs, Link } from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import { eDiscoveryUrl } from 'src/common/routes';
import { Link as RouterLink } from 'react-router-dom';

export default function MyCasesBc(props) {
  return (
    <Container sx={{ mb: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          component={RouterLink}
          to={eDiscoveryUrl.MyCases}
        >
          <WorkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          My Cases
        </Link>
        {props.children}
      </Breadcrumbs>
    </Container>
  );
}
