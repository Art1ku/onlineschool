import React from 'react';
import PageHeader from "@/components/layout/PageHeader/PageHeader";
import UserTable from "@/components/tables/UserTable/UserTable";
import classes from './users.module.scss'

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const UsersPage: React.FC = () => {
    const data: User[] = [
        { id: 0, name: 'Aziret', email: 'azifwefwwifl@gmail.com', role: 'USER' },
        { id: 1, name: 'Nurdin', email: 'vgyiuvoqbivwefwwifl@gmail.com', role: 'TEACHER' },
        { id: 3, name: 'Daur', email: 'azifwefwwifl@gmail.com', role: 'ADMIN' },
        { id: 4, name: 'Alikhan', email: 'wogibowfwefwwifl@gmail.com', role: 'DIRECTOR' },
        { id: 5, name: 'Bonwiboitn', email: 'azifwefwwifl@gmail.com', role: 'TEACHER' },
        { id: 6, name: 'DAVGAN', email: 'davgan_brat@gmail.com', role: 'ADMIN' },
        { id: 7, name: 'Aziret', email: 'azifwefwwifl@gmail.com', role: 'USER' },
        { id: 8, name: 'Aziret', email: 'azifwefwwifl@gmail.com', role: 'USER' }
    ];

    return (
        <div className='container'>
            <PageHeader text="Users" icon2="/user_grey.svg" icon="/user.svg" bc="#FF5074" />
            <UserTable data={data} />
        </div>
    );
};

export default UsersPage;
