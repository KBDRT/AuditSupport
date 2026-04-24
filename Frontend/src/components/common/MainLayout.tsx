// components/Layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;