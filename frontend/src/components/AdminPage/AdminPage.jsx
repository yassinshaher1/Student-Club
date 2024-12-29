import { useState } from 'react';
import { AdminNav } from './layout/admin-nav';
import { Dashboard } from './dashboard/Dashboard';
import { UserManagement } from './users/UserManagement';
import { EventManagement } from './events/EventManagement';

export function AdminPage() {
  const [activeView, setActiveView] = useState('dashboard');

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <AdminNav onNavigate={handleNavigate} activeView={activeView} />
        </div>
      </header>
      <main className="container px-4 py-8">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'users' && <UserManagement />}
        {activeView === 'events' && <EventManagement />}
      </main>
    </div>
  );
} 