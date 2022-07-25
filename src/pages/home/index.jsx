import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col justify-center	items-center">
      <h1 className="mt-6 text-center text-4xl text-gray-800">
        Home Page
      </h1>
      <div className="mt-12">
        <Link
          className="mr-5 border-2 border-white px-4 py-2 text-white bg-black"
          to="/signIn">
          Sign In
        </Link>
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
