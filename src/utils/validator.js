const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const email = /^[\w]+@[a-z]+\.[a-z]{2,3}$/;
const password = /^[\w]{6,}$/;
const username = /^[\w]{6,20}$/;
const phone = /^[\d]{10}$/;

const validator = { email, password, username, phone };

export default validator;
