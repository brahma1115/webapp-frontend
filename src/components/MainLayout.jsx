import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
