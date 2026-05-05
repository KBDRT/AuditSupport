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
import WordRulesPage from './pages/wordRules/WordRulesPage';
import SectionRulesPage from './pages/sectionRules/SectionRulesPage';
import EduYearsPage from './pages/eduYears/EduYearsPage';
import './index.css'; 
import EduProgram from './pages/program/EduProgram';
import { Box } from '@chakra-ui/react';
import ProgramsPage from './pages/programs/ProgramsPage';
import ReviewPage from './pages/review/ReviewPage';


function App() {
 const { checkAuth, loading } = useAuthStore()

  useEffect(() => {
    //  if (!user) {
      checkAuth();
    // }
  }, []); 

  if (loading) {
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      
      <PageLoading />
    </Box>
  }

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
        
          <Route element={<PrivateRoute allowedRoles={['Head']} />}>
            <Route element={<MainLayout />}> 
              <Route path="/Directions" element={<DirectionPage />} />
              <Route path="/Years" element={<YearsPage />} />
              <Route path="/Rules/Words" element={<WordRulesPage />} />
              <Route path="/Rules/Sections" element={<SectionRulesPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
            <Route element={<MainLayout />}> 
              <Route path="/Users" element={<UsersPage />} />
            </Route> 
          </Route>

          <Route element={<PrivateRoute allowedRoles={['Teacher']} />}>
            <Route element={<MainLayout />}> 
              <Route path="/EduYears" element={<EduYearsPage />} />
               {/* <Route path="/Test" element={<Test />} /> */}
              <Route path="/EduProgram/:id" element={<EduProgram />} />
            </Route> 
          </Route>

           <Route element={<PrivateRoute allowedRoles={['Methodist']} />}>
            <Route element={<MainLayout />}> 
              <Route path="/Programs" element={<ProgramsPage />} />
              <Route path="/Review/:reviewId" element={<ReviewPage />} />
            </Route> 
          </Route>
                
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;