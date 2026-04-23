import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import PrivateRoute from './auth/PrivateRoute';
import UsersPage from './pages/admin/UsersPage';
import LoginPage from './pages/auth/LoginPage';
import DirectionPage from './pages/direction/DirectionsPage';
import { useAuthStore } from './stores/AuthStore';
import { useEffect } from 'react';
import MainLayout from './components/common/MainLayout';
import YearsPage from './pages/year/YearsPage';
import PageLoading from './components/common/PageLoading';

function App() {
 const { checkAuth, loading, user } = useAuthStore()

  useEffect(() => {
     if (!user) {
      checkAuth();
    }
  }, []); 

  if (loading) {
    <PageLoading />
  }

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
        
          <Route element={<PrivateRoute allowedRoles={['Head']} />}>
            <Route element={<MainLayout />}> 
              <Route path="/directions" element={<DirectionPage />} />
              <Route path="/years" element={<YearsPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
            <Route element={<MainLayout />}> 
              <Route path="/users" element={<UsersPage />} />
            </Route> 
          </Route>
                
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;