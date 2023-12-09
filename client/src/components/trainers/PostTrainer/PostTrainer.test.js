const { assert } = require('chai');
const { describe, it } = require('mocha');
const React = require('react');
const { render, fireEvent } = require('@testing-library/react');
const { PostTrainer } = require('./PostTrainer.jsx'); 


describe('PostTrainer Component', () => {
 
  it('renders the component without errors', () => {
    const { container } = render(<PostTrainer />);
    assert.isNotNull(container);
  });

 
  it('updates the file input value when a file is selected using the fake button', () => {
    const { getByText, getByLabelText } = render(<PostTrainer />);

    const fakeButton = getByText('Choose a file');
    const fileInput = getByLabelText('image');

    assert.strictEqual(fileInput.files.length, 0);

    fireEvent.click(fakeButton);

    fireEvent.change(fileInput, { target: { files: [{ name: 'test-image.jpg', type: 'image/jpeg' }] } });

    assert.strictEqual(fileInput.files.length, 1);
    assert.strictEqual(fileInput.files[0].name, 'test-image.jpg');
  });

 
  it('submits the form with valid data', () => {
    const { getByLabelText, getByText } = render(<PostTrainer />);
    
    const nameInput = getByLabelText('Name');
    const emailInput = getByLabelText('Email');
    const phoneNumberInput = getByLabelText('Phone number');
    const submitButton = getByText('Post');

    fireEvent.change(nameInput, { target: { value: 'Jeff Nippard' } });
    fireEvent.change(emailInput, { target: { value: 'info@jeffnippard.com' } });
    fireEvent.change(phoneNumberInput, { target: { value: '+359 2 XXX XXXX' } });

    assert.strictEqual(nameInput.value, 'Jeff Nippard');
    assert.strictEqual(emailInput.value, 'info@jeffnippard.com');
    assert.strictEqual(phoneNumberInput.value, '+359 2 XXX XXXX');

    fireEvent.click(submitButton);

     });

  
     it('displays error messages when form is submitted with invalid data', () => {
        const { getByLabelText, getByText } = render(<PostTrainer />);
      
        const submitButton = getByText('Post');
      
        fireEvent.click(submitButton);
      
        const nameError = getByText('Name is not valid!');
        const emailError = getByText('Email is not valid!');
        const phoneNumberError = getByText('Phone number is not valid!');
      
        assert.isNotNull(nameError);
        assert.isNotNull(emailError);
        assert.isNotNull(phoneNumberError);
      });
      
    
      it('hides error messages when valid data is entered after a submission with invalid data', () => {
        const { getByLabelText, getByText, queryByText } = render(<PostTrainer />);
      
        const submitButton = getByText('Post');
      
        fireEvent.click(submitButton);
      
        const nameError = getByText('Name is not valid!');
        const emailError = getByText('Email is not valid!');
        const phoneNumberError = getByText('Phone number is not valid!');
      
        assert.isNotNull(nameError);
        assert.isNotNull(emailError);
        assert.isNotNull(phoneNumberError);
      
        const nameInput = getByLabelText('Name');
        const emailInput = getByLabelText('Email');
        const phoneNumberInput = getByLabelText('Phone number');
      
        fireEvent.change(nameInput, { target: { value: 'Valid Name' } });
        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.change(phoneNumberInput, { target: { value: '+1234567890' } });
      
        assert.isNull(queryByText('Name is not valid!'));
        assert.isNull(queryByText('Email is not valid!'));
        assert.isNull(queryByText('Phone number is not valid!'));
      });   
});
