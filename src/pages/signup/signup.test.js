import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SignUp from 'pages/signup';
import userData from 'users.json';
import bcrypt from 'bcryptjs';

const handleInput = (selector, value) => {
  fireEvent.change(selector, {
    target: {
      value,
    },
  });
};

const fireSubmit = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
};

const testCases = (type, dataCases) => {
  const title = `Render ${type} $field error message`;
  test.each(dataCases)(title, async ({ field, data, error }) => {
    render(<SignUp />);

    const inpField = screen.getByLabelText(field);
    const inpData = data;

    handleInput(inpField, inpData);
    fireSubmit();

    await waitFor(() => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });
};

describe('Sign up functionality', () => {
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(userData));
  });

  const invalidCases = [
    {
      field: 'email',
      data: 'toryemail',
      error: 'Email is invalid',
    },
    {
      field: 'username',
      data: 'tory',
      error:
        'Username must be between 6-20 length with no special character',
    },
    {
      field: 'phone',
      data: '012345678',
      error: 'Phone number must be 10-digits',
    },
    {
      field: 'password1',
      data: 'pass',
      error: 'Password must be at least 6 characters',
    },
  ];

  const existingCases = [
    {
      field: 'email',
      data: 'quantriminh@gmail.com',
      error: 'Email is already taken',
    },
    {
      field: 'username',
      data: 'minhtri',
      error: 'Username is already taken',
    },
  ];

  describe('Invalid fields', () => {
    testCases('invalid', invalidCases);

    test("Render passwords don't match error message", async () => {
      render(<SignUp />);

      const inpPW1 = screen.getByLabelText('password1');
      const inpPW2 = screen.getByLabelText('password2');

      handleInput(inpPW1, 'tory123');
      handleInput(inpPW2, 'tory124');
      fireSubmit();

      await waitFor(() => {
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });
    })
  });

  describe('Existing fields', () => {
    testCases('existing', existingCases);
  });

  describe('Signup successfully', () => {
    test('Return new account record in localStorage', async () => {
      render(<SignUp />);

      const newUser = {
        email: 'justtory@gmail.com',
        username: 'justtory',
        phone: '0123456789',
        password1: 'heheboi123',
        password2: 'heheboi123',
      };

      const emailField = screen.getByLabelText('email');
      const usernameField = screen.getByLabelText('username');
      const phoneField = screen.getByLabelText('phone');
      const pw1Field = screen.getByLabelText('password1');
      const pw2Field = screen.getByLabelText('password2');

      handleInput(emailField, newUser.email);
      handleInput(usernameField, newUser.username);
      handleInput(phoneField, newUser.phone);
      handleInput(pw1Field, newUser.password1);
      handleInput(pw2Field, newUser.password2);

      fireSubmit();

      await waitFor(async () => {
        const newDB = JSON.parse(localStorage.getItem('users'));
        const expectedNewRecord = newDB[newDB.length - 1];

        expect(expectedNewRecord.id).toBe(newDB.length - 1);
        expect(expectedNewRecord.email).toBe(newUser.email);
        expect(expectedNewRecord.username).toBe(newUser.username);
        expect(expectedNewRecord.phone).toBe(newUser.phone);

        const isValidHash = await bcrypt.compare(
          newUser.password1,
          expectedNewRecord.password
        );
        expect(isValidHash).toBe(true);
      });
    });
  });
});
