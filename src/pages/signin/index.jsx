/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { compareSync } from 'bcryptjs';
import validator from 'utils/validator';

const SignIn = ({ onTestSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState();

  const onSubmit = () => {
    const isValid = validateForm();
    if (isValid === false) return;

    const authenAccount = authenticateAccount();
    if (authenAccount === false) {
      if (!onTestSubmit) alert('username or password is incorrect');
      return;
    }

    if (onTestSubmit) {
      onTestSubmit({ username, password });
      return;
    }
    alert('login successfully');
    resetForm();
  };

  const authenticateAccount = () => {
    const userList = JSON.parse(localStorage.getItem('users'));
    const userRecord = userList.filter(
      (user) => user.email === username
    )[0];

    if (userRecord != null) {
      const result = compareSync(password, userRecord.password);
      return result;
    }

    return false;
  };

  const validateForm = () => {
    const newError = {};
    if (!username.match(validator.email)) {
      newError.username = 'Email is invalid';
    }
    if (password.length < 6) {
      newError.password = 'Password must be at least 6 characters';
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setErrors();
  };

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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form className="mt-8 bg-white py-8 px-11 rounded-md shadow-md">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">
            <div className="mb-8">
              <label
                className="text-gray-600 text-sm"
                htmlFor="email-address">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="email"
                required
                className="appearance-none shadow-sm relative block w-full mt-1 px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors?.username && (
                <p className="absolute text-red-600 text-sm">
                  {errors.username}
                </p>
              )}
            </div>
            <div>
              <label
                className="text-gray-600 text-sm"
                htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none shadow-sm relative block w-full mt-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors?.password && (
                <p className="absolute text-red-600 text-sm">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex user-none items-center my-8 justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 user-none block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={onSubmit}
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
