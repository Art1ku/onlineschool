import React from 'react';
import PageHeader from "@/components/layout/PageHeader/PageHeader";

const Page = () => {
    return (
        <div className='container'>
            <PageHeader text='logs' icon='/logs.svg' icon2='/logs_grey.svg' bc='#3AD7B5' />
        </div>
    );
};

export default Page;