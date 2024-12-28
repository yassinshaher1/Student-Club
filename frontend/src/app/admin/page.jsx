"use client"
import AdminProtected from '@/components/auth/AdminProtected';

export default function AdminPage() {
  return (
    <AdminProtected>
      <main className="min-h-screen flex items-center justify-center bg-[var(--color-secondary)]">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
      </main>
    </AdminProtected>
  );
} 