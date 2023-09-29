import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from './layouts/AppLayout';
import Home from './sections/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
    ]
  },
]);

function App() {
  return (
    <div className="full-w full-h text-center text-gray-700">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
