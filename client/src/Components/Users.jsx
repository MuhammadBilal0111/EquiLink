import React, { useEffect, useState } from 'react'
import UserCard from './elements/UserCard'
import AdminSidebar from './adminSidebar'
import { axiosInstance } from '@/lib/axios'

const Users = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const users = await axiosInstance.get('/users/get-all')
    setUsers(users.data.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex text-white">
      <AdminSidebar />

      <div className="w-4/5 p-8 ml-[18%]">
        <h2 className="text-2xl">Welcome, Admin!</h2>
        <p className="mt-2 text-sm text-[#C5C5C5]">
          Let's check out the users.
        </p>

        <div className="mt-6 flex-col justify-between border-t border-t-[#3F3F3F] py-4">
          <UserCard users={users} refreshUsers={getUsers} />
        </div>
      </div>
    </div>
  )
}

export default Users
