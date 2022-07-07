import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  console.log(email);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="input-form"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="content-none">error</p>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="input-form"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p>error</p>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="phone"
                className="input-form"
                placeholder="Phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <p>error</p>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="input-form"
                placeholder="Password"
                required
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <p>error</p>
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="current-password"
                className="input-form"
                placeholder="Confirm password"
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <p>error</p>
          </div>
          <div>
            <button type="submit" className="submit-btn">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
