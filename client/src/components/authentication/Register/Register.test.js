const { assert } = require('chai');
const { describe, it } = require('mocha');
const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const { Register } = require('./Register.jsx');


describe('Register Component', () => {
  
  it('renders the component without errors', async () => {
    const { container } = render(<Register />);
    await waitFor(() => assert.isNotNull(container));
  });

  
  it('displays error messages when form is submitted with invalid data', async () => {
    const { getByLabelText, getByText } = render(<Register />);
    const submitButton = getByText('Register');

    fireEvent.click(submitButton);

    const emailError = getByText('Email is not valid!');
    const usernameError = getByText('Username is not valid!');
    const passwordError = getByText('Password is not valid!');
    const repeatPasswordError = getByText("Re-Password doesn't match!");

    assert.isNotNull(emailError);
    assert.isNotNull(usernameError);
    assert.isNotNull(passwordError);
    assert.isNotNull(repeatPasswordError);
  });

  
  it('hides error messages when valid data is entered after a submission with invalid data', async () => {
    const { getByLabelText, getByText, queryByText } = render(<Register />);
    const submitButton = getByText('Register');

    fireEvent.click(submitButton);

    const emailError = getByText('Email is not valid!');
    const usernameError = getByText('Username is not valid!');
    const passwordError = getByText('Password is not valid!');
    const repeatPasswordError = getByText("Re-Password doesn't match!");

    assert.isNotNull(emailError);
    assert.isNotNull(usernameError);
    assert.isNotNull(passwordError);
    assert.isNotNull(repeatPasswordError);

    const emailInput = getByLabelText('Email');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const repeatPasswordInput = getByLabelText('Repeat Password');

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.change(usernameInput, { target: { value: 'validUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'validpassword' } });

    assert.isNull(queryByText('Email is not valid!'));
    assert.isNull(queryByText('Username is not valid!'));
    assert.isNull(queryByText('Password is not valid!'));
    assert.isNull(queryByText("Re-Password doesn't match!"));
  });

  
  it('calls registerSubmitHandler with the correct data when the form is submitted', async () => {
    const registerSubmitHandlerMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <Register registerSubmitHandler={registerSubmitHandlerMock} />
    );

    const emailInput = getByLabelText('Email');
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const repeatPasswordInput = getByLabelText('Repeat Password');
    const submitButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'validUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.change(repeatPasswordInput, { target: { value: 'validpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => assert.isTrue(registerSubmitHandlerMock.calledOnceWithMatch({
      email: 'user@example.com',
      username: 'validUsername',
      password: 'validpassword',
      repeatPassword: 'validpassword',
    })));
  });

});
