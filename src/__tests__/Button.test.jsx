import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';

describe('Button Component', () => {
  // Phase 1: Unit Test - Component mounts and renders
  describe('Phase 1: Unit Testing', () => {
    test('should render without crashing', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('should render button with correct text payload', () => {
      const testText = 'Submit Form';
      render(<Button>{testText}</Button>);
      expect(screen.getByText(testText)).toBeInTheDocument();
    });

    test('should have button element in the DOM', () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('should apply primary variant styling by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600');
    });

    test('should support custom variant styling', () => {
      render(<Button variant='danger'>Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600');
    });
  });

  // Phase 2: Interaction Testing - User Events
  describe('Phase 2: Interaction Testing', () => {
    test('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Here</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should call onClick handler multiple times on multiple clicks', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Count Clicks</Button>);

      const button = screen.getByRole('button');
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    test('should not call onClick when button is disabled', async () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    test('should have disabled attribute when disabled prop is true', () => {
      render(<Button disabled>Cannot Click</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('should support secondary variant interaction', async () => {
      const handleClick = jest.fn();
      render(
        <Button variant='secondary' onClick={handleClick}>
          Secondary Action
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-200');

      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Phase 3: Advanced Testing with Props
  describe('Phase 3: Advanced Props Handling', () => {
    test('should render with custom className via spread props', () => {
      render(
        <Button data-testid='custom-button' aria-label='Custom Button'>
          Custom
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('aria-label', 'Custom Button');
    });

    test('should support different button types', () => {
      render(<Button type='submit'>Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    test('should handle form submission with submit type', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Button type='submit'>Submit Form</Button>
        </form>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
