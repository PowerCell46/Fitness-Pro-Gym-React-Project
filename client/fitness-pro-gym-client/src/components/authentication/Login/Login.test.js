const { assert } = require('chai');
const { describe, it } = require('mocha');
const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const { Login } = require('./Login.jsx');


describe('Login Component', () => {
  
  it('renders the component without errors', async () => {
    const { container } = render(<Login />);
    await waitFor(() => assert.isNotNull(container));
  });

 
  it('displays error messages when form is submitted with invalid data', async () => {
    const { getByLabelText, getByText } = render(<Login />);
    const submitButton = getByText('Login');

    fireEvent.click(submitButton);

    const emailError = getByText('Email is not valid!');
    const passwordError = getByText('Password is not valid!');

    assert.isNotNull(emailError);
    assert.isNotNull(passwordError);
  });

 
  it('hides error messages when valid data is entered after a submission with invalid data', async () => {
    const { getByLabelText, getByText, queryByText } = render(<Login />);
    const submitButton = getByText('Login');

    fireEvent.click(submitButton);

    const emailError = getByText('Email is not valid!');
    const passwordError = getByText('Password is not valid!');

    assert.isNotNull(emailError);
    assert.isNotNull(passwordError);

    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    assert.isNull(queryByText('Email is not valid!'));
    assert.isNull(queryByText('Password is not valid!'));
  });

  
  it('calls loginSubmitHandler with the correct data when the form is submitted', async () => {
    const loginSubmitHandlerMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <Login loginSubmitHandler={loginSubmitHandlerMock} />
    );

    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => assert.isTrue(loginSubmitHandlerMock.calledOnceWithMatch({
      email: 'user@example.com',
      password: 'password123',
    })));
  });

  
});
