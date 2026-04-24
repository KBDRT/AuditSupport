import { useAuthStore } from '@/stores/AuthStore';
import { Navigate, Outlet } from 'react-router-dom';
import PageLoading from '@/components/common/PageLoading';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute = ({ allowedRoles = [] }: PrivateRouteProps) => {
    const { user, loading } = useAuthStore();

    if (loading) {
      return (
        <PageLoading />
      );
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;