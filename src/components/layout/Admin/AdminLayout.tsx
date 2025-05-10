'use client'
import classes from '@/styles/Admin.module.scss'

import { useState } from "react";
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import AdminComponent from './component/AdminComponent';
import { Logs, User } from 'lucide-react';
import Loader from '@/components/ui/Loader/Loader';

const AdminLayout = () => {
  
  const [isOpen, setIsOpen] = useState(true);

  const component = 'ADMIN'

   const roleComponents = {
      ADMIN: <AdminComponent />,
      USER: <User />, 
      LOGS:<Logs />,
    };

  return (
    <div className={classes.admin}>
            <Sidebar isOpen={isOpen}/>
            <div style={{flex: 1, transition: "margin-left 0.3s", marginLeft: isOpen ? "250px" : "0px"}}>
                <Navbar toggleSidebar={() => setIsOpen(!isOpen)}/>
                <div className='container' style={{padding: "20px"}}>
                {roleComponents[component] || <Loader/>}
                </div>
                <div className={classes.end}>
                    <p>Made with ❤ by Красавчики</p>
                </div>
            </div>
        </div>
  )
}

export default AdminLayout