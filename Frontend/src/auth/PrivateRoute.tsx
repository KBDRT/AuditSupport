import { useAuthStore } from '@/stores/AuthStore';
import { Navigate, Outlet } from 'react-router-dom';
import PageLoading from '@/components/common/PageLoading';
import { Box } from '@chakra-ui/react';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute = ({ allowedRoles = [] }: PrivateRouteProps) => {
    const { user, loading } = useAuthStore();

    if (loading) {
      return (
        <Box 
          minH="100vh" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <PageLoading />
        </Box>
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