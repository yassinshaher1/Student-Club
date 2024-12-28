import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function AdminProtected({ children }) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    let timeoutId;
    
    if (!isLoading) {
      if (!isAuthenticated) {
        timeoutId = setTimeout(() => router.push('/login'), 100);
      } else if (user?.role !== 'admin') {
        timeoutId = setTimeout(() => router.push('/'), 100);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAuthenticated, user, router, isLoading]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}