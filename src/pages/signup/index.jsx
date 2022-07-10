import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import validator from 'utils/validator';

const InputField = ({
  label,
  type,
  value,
  autoComplete,
  placeholder,
  onChange,
  error,
}) => (
  <>
    <label htmlFor={label} className="sr-only">
      {label}
    </label>
    <input
      id={label}
      name={label}
      type={type}
      autoComplete={autoComplete}
      className="input-form"
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
    />
    <p className="error-msg">{error}</p>
  </>
);

const SignUp = () => {
  const [formVals, setFormVals] = useState({
    email: '',
    username: '',
    phone: '',
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});

  const isValid = (inp, regex) => {
    return inp.match(regex);
  };

  const isExist = (inp, type) => {
    const users = JSON.parse(localStorage.getItem('users'));
    return users.some((user) => user[type] === inp);
  };

  const isError = (data) => {
    const err = {};

    if (!isValid(data.email, validator.email))
      err.email = 'Email is invalid';
    else if (isExist(data.email, 'email'))
      err.email = 'Email is already taken';

    if (!isValid(data.username, validator.username))
      err.username =
        'Username must be between 6-20 length with no special character';
    else if (isExist(data.username, 'username'))
      err.username = 'Username is already taken';

    if (!isValid(data.phone, validator.phone))
      err.phone = 'Phone number must be 10-digits';

    if (!isValid(data.password1, validator.password))
      err.password1 = 'Password must be at least 6 characters';

    if (data.password2 !== data.password1)
      err.password2 = "Passwords don't match";

    return err;
  };

  const createAccount = (vals) => {
    const hash = bcrypt.hashSync(vals.password1, 8);

    const users = JSON.parse(localStorage.getItem('users'));
    const newUser = {
      id: users.length,
      email: vals.email,
      username: vals.username,
      password: hash,
      phone: vals.phone,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: formVals.email,
      username: formVals.username,
      phone: formVals.phone,
      password1: formVals.password1,
      password2: formVals.password2,
    };
    const err = isError(data);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      createAccount(formVals);
    }
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
            <InputField
              label="email"
              type="email"
              value={formVals.email}
              autoComplete="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormVals({
                  ...formVals,
                  email: e.target.value,
                })
              }
              error={errors.email}
            />

            <InputField
              label="username"
              type="text"
              value={formVals.username}
              autoComplete="username"
              placeholder="Username"
              onChange={(e) =>
                setFormVals({
                  ...formVals,
                  username: e.target.value,
                })
              }
              error={errors.username}
            />

            <InputField
              label="phone"
              type="tel"
              value={formVals.phone}
              autoComplete="phone"
              placeholder="Phone number"
              onChange={(e) =>
                setFormVals({
                  ...formVals,
                  phone: e.target.value,
                })
              }
              error={errors.phone}
            />

            <InputField
              label="password1"
              type="password"
              value={formVals.password}
              autoComplete="current-password"
              placeholder="Password"
              onChange={(e) =>
                setFormVals({
                  ...formVals,
                  password1: e.target.value,
                })
              }
              error={errors.password1}
            />

            <InputField
              label="password2"
              type="password"
              value={formVals.password}
              autoComplete="current-password"
              placeholder="Confirm password"
              onChange={(e) =>
                setFormVals({
                  ...formVals,
                  password2: e.target.value,
                })
              }
              error={errors.password2}
            />
          </div>
          <div>
            <button
              className="submit-btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
