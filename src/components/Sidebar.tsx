import React from 'react'
import { File, LogOut, UserRound, Sun, Search } from "lucide-react";
import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { ModeToggle } from './ModeToggle';

const Sidebar = () => {
  return (
    <div className='max-md:hidden flex flex-col justify-between w-64 lg:min-w-72 min-h-screen bg-black p-4 lg:p-6 border-r-2 border-r-gray-800'>
      <div>
        <Link href={"/"}>
          <h2 className='text-3xl text-center'>
            TechFix Shop
          </h2>
        </Link>
        <div className='my-12 text-gray-200 text-xl flex flex-col gap-4'>
          <Link href={"/tickets"} className='flex p-2 gap-2 items-center rounded-xl hover:bg-gray-800 duration-100'>
            <File className='w-5 h-5' /> Tickets
          </Link>
          <Link href={"/customers/form"} className='flex p-2 gap-2 items-center rounded-xl hover:bg-gray-800 duration-100'>
            <UserRound className='w-5 h-5' /> New Customer
          </Link>
          <Link href={"/customers"} className='flex gap-2 p-2 items-center rounded-xl hover:bg-gray-800 duration-100'>
            <Search className='w-5 h-5' /> Search Customers
          </Link>
          <ModeToggle />
        </div>
      </div>

      <LogoutLink className='bottom-12 flex justify-center gap-2 items-center text-xl bg-indigo-600 rounded-xl text-center py-2 hover:bg-indigo-800'>
        Logout <LogOut />
      </LogoutLink>

    </div>
  )
}

export default Sidebar
