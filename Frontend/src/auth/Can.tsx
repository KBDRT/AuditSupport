import { useAuthStore } from '@/stores/AuthStore';
import type { ReactNode } from 'react';

interface CanProps {
    roles: string[];
    children: ReactNode;
}

const Can = ({ roles, children }: CanProps) => {
    const { user } = useAuthStore();
    
    if (!user) return null;
    
    const hasRole = roles.includes(user.role);
    
    return hasRole ? <>{children}</> : null;
};

export default Can;