// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/use-auth';
//
// export default function AdminProtected({ children }) {
//   const router = useRouter();
//   const { isAuthenticated, user, isLoading } = useAuth();
//
//   useEffect(() => {
//     if (!isLoading) {  // Only redirect after initial auth check
//       if (!isAuthenticated) {
//         router.push('/admin');
//       } else if (user?.role !== 'admin') {
//         router.push('/');
//       }
//     }
//   }, [isAuthenticated, user, router, isLoading]);
//
//   // Show nothing while checking authentication
//   if (isLoading) {
//     return null;
//   }
//
//   // Don't render children until we verify authentication
//   if (!isAuthenticated || user?.role !== 'admin') {
//     return null;
//   }
//
//   return <>{children}</>;
// }