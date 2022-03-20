import { eDiscoveryUrl } from 'src/common/routes';
import { Navigate } from 'react-router-dom';
import useToken from 'src/common/useToken';

export default function ProtectedRoute(props) {
  const { token } = useToken();

  if (!token) {
    return <Navigate to={eDiscoveryUrl.Login} replace />;
  }

  return props.children;
}
