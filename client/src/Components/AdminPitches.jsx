import React from 'react'
import AdminSidebar from './AdminSidebar'

const AdminPitches = () => {
  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex text-white">
      <AdminSidebar />

      <div className="w-4/5 p-8 ml-[18%]">
        <h2 className="text-2xl">Welcome, Admin!</h2>
        <p className="mt-2 text-sm text-[#C5C5C5]">
          Let's check out what users have posted.
        </p>

        <div className="mt-6 flex-col justify-between border-t border-t-[#3F3F3F] py-4">
          
        </div>

      </div>
    </div>
  )
}

export default AdminPitches