import React from 'react';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';

const UserCard = ({ users, refreshUsers }) => {
  const onRemove = async (userId) => {
    try {
      const res = await axiosInstance.delete('/users/delete-user', {
        data: { id: userId },
      });
      console.log('Deleted:', res.data);

      await refreshUsers(); // Refresh users list
      toast.success("User deleted successfully");
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user?.user?.id}
          className="relative flex items-center justify-between bg-[#2C2C2C] text-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow w-full"
        >
          <div className="flex items-center gap-4">
            <img
              src={
                user?.profileImage ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLblq47eY8CIvAJKjbVbfRF9py8bsTYKL1jA&s'
              }
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{user?.user?.name || 'No Name'}</p>
              <p className="text-gray-400 text-xs">{user?.user?.email || 'No Email'}</p>
            </div>
          </div>

          <button
            className="bg-gray-200 text-black font-semibold text-sm px-4 py-1.5 cursor-pointer rounded-lg hover:bg-gray-300 transition"
            onClick={() => onRemove(user?.user?.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
