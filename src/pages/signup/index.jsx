import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState({
    value: '',
    error: '',
  });
  const [username, setUsername] = useState({
    value: '',
    error: '',
  });
  const [phone, setPhone] = useState({
    value: '',
    error: '',
  });
  const [password1, setPassword1] = useState({
    value: '',
    error: '',
  });
  const [password2, setPassword2] = useState({
    value: '',
    error: '',
  });

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
    // email
    if (isValid(emailInp, emailRegex))
      if (isExist(emailInp, 'email')) setEmail({ ...email, error: 'Email is already taken' });
      else setEmail({ ...email, error: '' });
    else setEmail({ ...email, error: 'Email is invalid' });

    // username
    if (isValid(usernameInp, usernameRegex))
      if (isExist(usernameInp, 'username'))
        setUsername({ ...username, error: 'Username is already taken' });
      else setUsername({ ...username, error: '' });
    else
      setUsername({
        ...username,
        error: 'Username must be between 6-20 length with no special character',
      });

    // phone
    if (!isValid(phoneInp, phoneRegex))
      setPhone({ ...phone, error: 'Phone number must be 10-digits' });
    else setPhone({ ...phone, error: '' });

    // password1
    if (!isValid(pw1, passwordRegex))
      setPassword1({
        ...password1,
        error: 'Password must be between 6-25 length with no special character',
      });
    else setPassword1({ ...password1, error: '' });

    // password2
    if (pw2 !== pw1) setPassword2({ ...password2, error: "Passwords don't match" });
    else setPassword2({ ...password2, error: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validation(email.value, username.value, phone.value, password1.value, password2.value);
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
                value={email.value}
                onChange={(e) => setEmail({ ...email, value: e.target.value })}
              />
            </div>
            <p className="error-msg">{email.error}</p>

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
                value={username.value}
                onChange={(e) => setUsername({ ...username, value: e.target.value })}
              />
            </div>
            <p className="error-msg">{username.error}</p>

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
                value={phone.value}
                onChange={(e) => setPhone({ ...phone, value: e.target.value })}
              />
            </div>
            <p className="error-msg">{phone.error}</p>

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
                value={password1.value}
                onChange={(e) => setPassword1({ ...password1, value: e.target.value })}
              />
            </div>
            <p className="error-msg">{password1.error}</p>

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
                value={password2.value}
                onChange={(e) => setPassword2({ ...password2, value: e.target.value })}
              />
            </div>
            <p className="error-msg">{password2.error}</p>
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
