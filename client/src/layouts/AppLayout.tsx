import React from 'react';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
