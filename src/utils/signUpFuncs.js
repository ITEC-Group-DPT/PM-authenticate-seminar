const emailRegex = /^[\w]+@[a-z]+\.[a-z]{2,3}$/;
const usernameRegex = /^[\w]{6,20}$/;
const phoneRegex = /^[\d]{10}$/;
const passwordRegex = /^[\w]{6,}$/;

const isValid = (inp, regex) => {
  if (inp.match(regex)) return true;
  return false;
};

const isExist = (inp, type) => {
  const users = JSON.parse(localStorage.getItem('users'));
  return users.some((user) => user[type] === inp);
};

const isError = (emailInp, usernameInp, phoneInp, pw1, pw2) => {
  const err = {};

  if (!isValid(emailInp, emailRegex)) err.email = 'Email is invalid';
  else if (isExist(emailInp, 'email'))
    err.email = 'Email is already taken';

  if (!isValid(usernameInp, usernameRegex))
    err.username =
      'Username must be between 6-20 length with no special character';
  else if (isExist(usernameInp, 'username'))
    err.username = 'Username is already taken';

  if (!isValid(phoneInp, phoneRegex))
    err.phone = 'Phone number must be 10-digits';

  if (!isValid(pw1, passwordRegex))
    err.password1 = 'Password must be at least 6 characters';

  if (pw2 !== pw1) err.password2 = "Passwords don't match";

  return err;
};

export { isValid, isExist, isError };
