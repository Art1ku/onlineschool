'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader/PageHeader';
import UserTable from '@/components/tables/UserTable/UserTable';
import UserFilters from '@/components/ui/UserFilters/UserFilters';
import UserModal from '@/components/ui/UserModal/UserModal';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([
        { id: 0, name: 'Aziret', email: 'azifwefwwifl@gmail.com', role: 'USER' },
        { id: 1, name: 'Nurdin', email: 'vgyiuvoqbivwefwwifl@gmail.com', role: 'TEACHER' },
        { id: 3, name: 'Daur', email: 'azifwefwwifl@gmail.com', role: 'ADMIN' },
        { id: 4, name: 'Alikhan', email: 'wogibowfwefwwifl@gmail.com', role: 'DIRECTOR' },
        { id: 5, name: 'Bonwiboitn', email: 'azifwefwwifl@gmail.com', role: 'TEACHER' },
        { id: 6, name: 'DAVGAN', email: 'davgan_brat@gmail.com', role: 'ADMIN' },
        { id: 7, name: 'Aziret', email: 'azifwefwwifl@gmail.com', role: 'USER' },
        { id: 8, name: 'Aziret', email: 'azifwefwwifl@gmail.com', role: 'USER' }
    ]);

    const [searchEmail, setSearchEmail] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
        setSelectedUser(null);
    };

    const handleChangeRole = (id: number, newRole: string) => {
        setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
        setSelectedUser(null);
    };

    return (
        <div className='container'>
                <PageHeader text="Users" icon2="/user_grey.svg" icon="/user.svg" bc="#FF5074" />
                <UserFilters email={searchEmail} role={filterRole} setEmail={setSearchEmail} setRole={setFilterRole} />
                <UserTable data={users} searchEmail={searchEmail} filterRole={filterRole} onOpenModal={setSelectedUser} />
                <UserModal
                    isOpen={!!selectedUser}
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onDelete={handleDeleteUser}
                    onChangeRole={handleChangeRole}
                />
        </div>
    );
};

export default UsersPage;
