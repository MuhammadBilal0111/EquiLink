import React from 'react';

const UserCard = ({ name = 'John Doe', email = 'johndoe@email.com', onRemove }) => {
  return (
    <div className="relative flex items-center justify-between bg-[#2C2C2C] text-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow w-full">
      
      {/* Profile Info */}
      <div className="flex items-center gap-4">
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLblq47eY8CIvAJKjbVbfRF9py8bsTYKL1jA&s'
          alt="profile"
          className="w-13 h-13 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{email}</p>
        </div>
      </div>

      {/* Apply Button */}
      <button className="bg-gray-200 text-black font-semibold text-sm px-4 py-1.5 cursor-pointer rounded-lg hover:bg-gray-300 transition">
        Remove
      </button>
    </div>
  );
};

export default UserCard;
