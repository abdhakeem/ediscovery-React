import { Container, Link, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import WorkIcon from '@mui/icons-material/Work';
import styles from './breadcrumbs.module.scss';

function BreadcrumbComp() {
  return (
    <Container className={styles.container}>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <WorkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            My Cases
          </Link>
          {/*<Link
            underline="hover"
            color="inherit"
            href="/getting-started/installation/"
          >
            Core
    </Link>*/}
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>
    </Container>
  );
}

export default BreadcrumbComp;
