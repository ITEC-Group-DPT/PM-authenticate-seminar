/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SignIn from 'pages/signin';
import validator from 'utils/validator';
import userData from 'users.json';

describe('Sign in functionality', () => {
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(userData));
  });
  describe('inputs are all valid', () => {
    const onLogin = jest.fn((userDTO) => {
      expect(userDTO.username).toMatch(validator.email);
      expect(userDTO.password).toMatch(validator.password);
    });
    beforeEach(() => {
      render(<SignIn onTestSubmit={onLogin} />);
    });

    describe('authenticated account', () => {
      test('sign in successfully', async () => {
        const usernameInp = screen.getByLabelText('Email address');
        const passwordInp = screen.getByLabelText('Password');

        handleInput(usernameInp, 'tranngminhdao@gmail.com');
        handleInput(passwordInp, 'kurozemi');

        fireSubmit();

        await waitFor(() => {
          expect(onLogin).toBeCalled();
        });
      });
    });
    describe('un-existed account', () => {
      test('cannot login with unknow email', async () => {
        const usernameInp = screen.getByLabelText('Email address');
        const passwordInp = screen.getByLabelText('Password');

        handleInput(usernameInp, 'noaccount@gmail.com');
        handleInput(passwordInp, 'passwordrandom');

        fireSubmit();

        await waitFor(() => {
          expect(onLogin).toBeCalledTimes(0);
        });
      });

      test('cannot login with wrong password', async () => {
        const usernameInp = screen.getByLabelText('Email address');
        const passwordInp = screen.getByLabelText('Password');

        handleInput(usernameInp, 'tranngminh@gmail.com');
        handleInput(passwordInp, 'hehewrongpassword');

        fireSubmit();

        await waitFor(() => {
          expect(onLogin).toBeCalledTimes(0);
        });
      });
    });
  });

  describe('invalid input', () => {
    test('render email error', async () => {
      const onLogin = jest.fn();
      render(<SignIn onTestSubmit={onLogin} />);

      const usernameInp = screen.getByLabelText('Email address');
      handleInput(usernameInp, 'invalid');

      fireSubmit();

      await waitFor(() => {
        expect(onLogin).toBeCalledTimes(0);
      });
      expect(
        screen.getByText('Email is invalid')
      ).toBeInTheDocument();
    });

    test('render password error', async () => {
      const onLogin = jest.fn();
      render(<SignIn onTestSubmit={onLogin} />);

      const passwordInp = screen.getByLabelText('Password');
      handleInput(passwordInp, '0000');

      fireSubmit();

      await waitFor(() => {
        expect(onLogin).toBeCalledTimes(0);
      });
      expect(
        screen.getByText(/at least 6 characters/i)
      ).toBeInTheDocument();
    });
  });
});

const fireSubmit = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
};

const handleInput = (selector, value) => {
  fireEvent.change(selector, {
    target: {
      value,
    },
  });
};
