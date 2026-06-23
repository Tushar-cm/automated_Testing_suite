import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../components/Input';

describe('Input Component', () => {
  // Phase 1: Unit Tests - Component mounts and renders
  describe('Phase 1: Unit Testing', () => {
    test('should render without crashing', () => {
      render(<Input placeholder='Enter text' />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    test('should render input with correct placeholder text', () => {
      const placeholderText = 'Enter your name';
      render(<Input placeholder={placeholderText} />);
      expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    });

    test('should render label when provided', () => {
      const labelText = 'Email Address';
      render(<Input label={labelText} />);
      expect(screen.getByText(labelText)).toBeInTheDocument();
    });

    test('should mark label as required when required prop is true', () => {
      render(<Input label='Password' required />);
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
    });

    test('should have disabled attribute when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    test('should have correct input type', () => {
      render(<Input type='email' />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    test('should support password type input', () => {
      const { container } = render(<Input type='password' />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });
  });

  // Phase 2: Interaction Testing - User Events
  describe('Phase 2: Interaction Testing', () => {
    test('should update input value on user keystroke', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState('');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type here'
          />
        );
      };

      render(<TestComponent />);
      const input = screen.getByPlaceholderText('Type here');

      await act(async () => {
        await userEvent.type(input, 'Hello World');
      });

      expect(input).toHaveValue('Hello World');
    });

    test('should handle multiple keystrokes and update state correctly', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState('');
        return (
          <div>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Input'
            />
            <span data-testid='display'>{value}</span>
          </div>
        );
      };

      render(<TestComponent />);
      const input = screen.getByPlaceholderText('Input');

      await act(async () => {
        await userEvent.type(input, 'A');
      });
      expect(screen.getByTestId('display')).toHaveTextContent('A');

      await act(async () => {
        await userEvent.type(input, 'BC');
      });
      expect(screen.getByTestId('display')).toHaveTextContent('ABC');
    });

    test('should call onChange handler when input changes', async () => {
      const handleChange = jest.fn();
      render(
        <Input
          placeholder='Change Test'
          onChange={handleChange}
        />
      );

      const input = screen.getByPlaceholderText('Change Test');
      await act(async () => {
        await userEvent.type(input, 'test');
      });

      expect(handleChange).toHaveBeenCalledTimes(4);
    });

    test('should call onBlur handler when input loses focus', async () => {
      const handleBlur = jest.fn();
      render(
        <Input
          placeholder='Blur Test'
          onBlur={handleBlur}
        />
      );

      const input = screen.getByPlaceholderText('Blur Test');
      await act(async () => {
        await userEvent.click(input);
        await userEvent.tab();
      });

      expect(handleBlur).toHaveBeenCalled();
    });

    test('should update border color on focus', async () => {
      const { container } = render(
        <Input placeholder='Focus Test' />
      );

      const input = screen.getByPlaceholderText('Focus Test');
      await act(async () => {
        await userEvent.click(input);
      });

      expect(input).toHaveClass('border-blue-500');
    });

    test('should not allow input when disabled', async () => {
      const handleChange = jest.fn();
      render(
        <Input
          disabled
          placeholder='Disabled Input'
          onChange={handleChange}
        />
      );

      const input = screen.getByPlaceholderText('Disabled Input');
      await userEvent.type(input, 'should not work');

      // Input should remain empty since disabled prevents typing
      expect(input).toHaveValue('');
    });

    test('should display error message when error prop is provided', () => {
      const errorMessage = 'This field is required';
      render(
        <Input
          label='Username'
          error={errorMessage}
        />
      );

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('should show error styling when error exists', () => {
      const { container } = render(
        <Input error='Invalid input' />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });
  });

  // Phase 3: Form Integration Testing
  describe('Phase 3: Form Integration Testing', () => {
    test('should handle form submission with controlled input', async () => {
      const TestForm = () => {
        const [formData, setFormData] = useState({ email: '' });

        const handleChange = (e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        };

        const handleSubmit = (e) => {
          e.preventDefault();
        };

        return (
          <form onSubmit={handleSubmit}>
            <Input
              label='Email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email'
            />
            <button type='submit'>Submit</button>
          </form>
        );
      };

      render(<TestForm />);
      const input = screen.getByPlaceholderText('Enter email');

      await act(async () => {
        await userEvent.type(input, 'test@example.com');
      });

      expect(input).toHaveValue('test@example.com');
    });

    test('should validate and display multiple input fields', async () => {
      const TestForm = () => {
        const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
        });

        const handleChange = (field) => (e) => {
          setFormData({
            ...formData,
            [field]: e.target.value,
          });
        };

        return (
          <div>
            <Input
              label='Name'
              value={formData.name}
              onChange={handleChange('name')}
              placeholder='John Doe'
            />
            <Input
              label='Email'
              type='email'
              value={formData.email}
              onChange={handleChange('email')}
              placeholder='john@example.com'
            />
            <Input
              label='Password'
              type='password'
              value={formData.password}
              onChange={handleChange('password')}
              placeholder='Password'
            />
          </div>
        );
      };

      render(<TestForm />);

      const nameInput = screen.getByPlaceholderText('John Doe');
      const emailInput = screen.getByPlaceholderText('john@example.com');

      await act(async () => {
        await userEvent.type(nameInput, 'Alice');
        await userEvent.type(emailInput, 'alice@test.com');
      });

      expect(nameInput).toHaveValue('Alice');
      expect(emailInput).toHaveValue('alice@test.com');
    });

    test('should handle clearing input value', async () => {
      const TestComponent = () => {
        const [value, setValue] = useState('Initial Value');

        return (
          <div>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => setValue('')}>Clear</button>
          </div>
        );
      };

      render(<TestComponent />);
      const input = screen.getByRole('textbox');
      const clearButton = screen.getByRole('button', { name: 'Clear' });

      expect(input).toHaveValue('Initial Value');

      await act(async () => {
        await userEvent.click(clearButton);
      });

      expect(input).toHaveValue('');
    });

    test('should support custom validation with error states', async () => {
      const TestForm = () => {
        const [email, setEmail] = useState('');
        const [error, setError] = useState('');

        const handleChange = (e) => {
          const value = e.target.value;
          setEmail(value);
          if (value && !value.includes('@')) {
            setError('Email must contain @');
          } else {
            setError('');
          }
        };

        return (
          <Input
            label='Email'
            value={email}
            onChange={handleChange}
            error={error}
            placeholder='Enter email'
          />
        );
      };

      render(<TestForm />);
      const input = screen.getByPlaceholderText('Enter email');

      await act(async () => {
        await userEvent.type(input, 'invalid');
      });
      expect(screen.getByText('Email must contain @')).toBeInTheDocument();

      await act(async () => {
        await userEvent.clear(input);
        await userEvent.type(input, 'valid@email.com');
      });
      expect(screen.queryByText('Email must contain @')).not.toBeInTheDocument();
    });

    test('should support attribute spread for additional props', () => {
      render(
        <Input
          placeholder='Test'
          data-testid='custom-input'
          aria-label='Custom Input'
          maxLength='10'
        />
      );

      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('aria-label', 'Custom Input');
      expect(input).toHaveAttribute('maxLength', '10');
    });
  });
});
