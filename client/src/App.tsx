import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, Link, Navigate, RouterProvider, } from "react-router-dom";

import Spinner from './sections/components/Spinner';

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
    <div className={"full-w full-h text-center text-gray-700 " + (isLoading ? "cursor-wait" : "")}>
      {isLoading && <Spinner />}
      {!isLoading && <RouterProvider router={router} fallbackElement={<Spinner />} />}
    </div>
  );
}

export default App;
