import React from 'react';
import PageHeader from "@/components/layout/PageHeader/PageHeader";

const UsersPage = () => {
    return (
        <div className='container'>
            <PageHeader text='users' icon2='/user_grey.svg' icon='/user.svg' bc='#FF5074' />
        </div>
    );
};

export default UsersPage;