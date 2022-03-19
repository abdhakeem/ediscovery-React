import MyCasesBc from '../Cases/breadcrumb';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function DocumentBc(props) {
  return (
    <MyCasesBc>
      <Link
        underline="hover"
        color="inherit"
        component={RouterLink}
        to={props.caseUrl}
      >
        {props.caseName}
      </Link>
      {props.children}
    </MyCasesBc>
  );
}
