import React from 'react';
import { Link } from 'react-router';

const Forbiden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
      <p className="mb-6 text-gray-600">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbiden;
