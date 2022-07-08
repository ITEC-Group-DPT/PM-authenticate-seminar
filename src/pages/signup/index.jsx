import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const [showNoti, setShowNoti] = useState(false);

  const emailRegex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  const usernameRegex = /^[a-zA-Z0-9]{6,20}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^[a-zA-Z0-9]{6,25}$/;

  const isValid = (inp, regex) => {
    if (inp.match(regex)) return true;
    return false;
  };

  const isExist = (inp, type) => {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.some((user) => user[type] === inp);
  };

  const validation = (emailInp, usernameInp, phoneInp, pw1, pw2) => {
    const err = {};

    if (!isValid(emailInp, emailRegex)) err.email = 'Email is invalid';
    else if (isExist(emailInp, 'email')) err.email = 'Email is already taken';

    if (!isValid(usernameInp, usernameRegex))
      err.username = 'Username must be between 6-20 length with no special character';
    else if (isExist(usernameInp, 'username')) err.username = 'Username is already taken';

    if (!isValid(phoneInp, phoneRegex)) err.phone = 'Phone number must be 10-digits';

    if (!isValid(pw1, passwordRegex))
      err.password1 = 'Password must be between 6-25 length with no special character';

    if (pw2 !== pw1) err.password2 = "Passwords don't match";

    setErrors(err);
    if (Object.keys(err).length === 0) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validation(email, username, phone, password1, password2)) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password1, salt);

      const users = JSON.parse(localStorage.getItem('users'));
      const newUser = {
        id: users.length,
        email,
        username,
        password: hash,
        phone,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setShowNoti(true);
    } else setShowNoti(false);
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {showNoti ? (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert">
            <span className="font-medium">Sign up sucessfully!</span> Refresh localStorage to see
            new account.
          </div>
        ) : (
          ''
        )}
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
            <p className="error-msg">{errors.email}</p>

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
            <p className="error-msg">{errors.username}</p>

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
            <p className="error-msg">{errors.phone}</p>

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
            <p className="error-msg">{errors.password1}</p>

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
            <p className="error-msg">{errors.password2}</p>
          </div>
          <div>
            <button className="submit-btn" type="submit" onClick={(e) => handleSubmit(e)}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
