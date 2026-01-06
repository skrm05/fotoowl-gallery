import React from "react";

const Navbar = ({ user }) => {
  return (
    <>
      <header className="bg-white border-b sticky top-0 z-40 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
              F
            </div>
            <h1 className="text-xl font-bold tracking-tight">FotoOwl</h1>
          </div>

          {user && (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: user.color }}
              />
              <span className="text-sm font-medium hidden sm:inline">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
