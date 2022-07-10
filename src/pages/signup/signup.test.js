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

const handleInput = (fieldName, value) => {
  const selector = screen.getByLabelText(fieldName);
  fireEvent.change(selector, {
    target: {
      value,
    },
  });
};

const fireSubmit = () => {
  fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
};

describe('Sign up functionality', () => {
  beforeAll(() => {
    localStorage.setItem('users', JSON.stringify(userData));
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<SignUp isTest />);
  });

  describe('Invalid fields', () => {
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

    test.each(invalidCases)(
      `Render invalid $field error message`,
      async ({ field, data, error }) => {
        handleInput(field, data);
        fireSubmit();

        await waitFor(() => {
          expect(screen.getByText(error)).toBeInTheDocument();
        });
      }
    );

    test("Render passwords don't match error message", async () => {
      handleInput('password1', 'tory123');
      handleInput('password2', 'tory124');
      fireSubmit();

      await waitFor(() => {
        expect(
          screen.getByText("Passwords don't match")
        ).toBeInTheDocument();
      });
    });
  });

  describe('Existing fields', () => {
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

    test.each(existingCases)(
      `Render existing $field error message`,
      async ({ field, data, error }) => {
        handleInput(field, data);
        fireSubmit();

        await waitFor(() => {
          expect(screen.getByText(error)).toBeInTheDocument();
        });
      }
    );
  });

  describe('Signup successfully', () => {
    test('Return new account record in localStorage', async () => {
      const newUser = {
        email: 'justtory@gmail.com',
        username: 'justtory',
        phone: '0123456789',
        password1: 'heheboi123',
        password2: 'heheboi123',
      };

      handleInput('email', newUser.email);
      handleInput('username', newUser.username);
      handleInput('phone', newUser.phone);
      handleInput('password1', newUser.password1);
      handleInput('password2', newUser.password2);

      fireSubmit();

      const newDB = JSON.parse(localStorage.getItem('users'));
      const expectedNewRecord = newDB[newDB.length - 1];
      const isValidHash = await bcrypt.compare(
        newUser.password1,
        expectedNewRecord.password
      );

      await waitFor(async () => {
        expect(isValidHash).toBe(true);
      });
      expect(expectedNewRecord.id).toBe(newDB.length - 1);
      expect(expectedNewRecord.email).toBe(newUser.email);
      expect(expectedNewRecord.username).toBe(newUser.username);
      expect(expectedNewRecord.phone).toBe(newUser.phone);
    });
  });
});
