import { UserTable } from './user-table';

export function UserManagement() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      <UserTable />
    </div>
  );
}
