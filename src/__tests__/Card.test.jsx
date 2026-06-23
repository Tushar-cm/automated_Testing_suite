import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';

describe('Card Component', () => {
  // Phase 1: Unit Tests - Component renders correctly
  describe('Phase 1: Unit Testing', () => {
    test('should render without crashing', () => {
      render(
        <Card title='Test Card' description='Test Description'>
          Test Content
        </Card>
      );
      expect(screen.getByText('Test Card')).toBeInTheDocument();
    });

    test('should render title text payload correctly', () => {
      const cardTitle = 'Product Card';
      render(<Card title={cardTitle}>Content</Card>);
      expect(screen.getByText(cardTitle)).toBeInTheDocument();
    });

    test('should render description text payload correctly', () => {
      const cardDescription = 'This is a card description';
      render(<Card description={cardDescription}>Content</Card>);
      expect(screen.getByText(cardDescription)).toBeInTheDocument();
    });

    test('should render children content inside card', () => {
      const childText = 'Custom child content';
      render(
        <Card title='Card'>
          <p>{childText}</p>
        </Card>
      );
      expect(screen.getByText(childText)).toBeInTheDocument();
    });

    test('should exist in the DOM with correct container', () => {
      render(<Card title='Exists Test'>Content</Card>);
      const container = screen.getByTestId('card-container');
      expect(container).toBeInTheDocument();
    });

    test('should render footer text when provided', () => {
      const footerText = 'Card Footer';
      render(
        <Card title='Card With Footer' footer={<div>{footerText}</div>}>
          Content
        </Card>
      );
      expect(screen.getByText(footerText)).toBeInTheDocument();
    });

    test('should not render footer when not provided', () => {
      render(<Card title='No Footer'>Content</Card>);
      const container = screen.getByTestId('card-container');
      // Verify footer section doesn't exist by checking parent structure
      expect(container.querySelector('div[class*="border-t"]')).not.toBeInTheDocument();
    });
  });

  // Phase 2: Component Structure and Complex Props
  describe('Phase 2: Component Structure Testing', () => {
    test('should render card with title and description together', () => {
      render(
        <Card
          title='Product Name'
          description='High quality product with excellent features'
        >
          Additional info
        </Card>
      );

      expect(screen.getByText('Product Name')).toBeInTheDocument();
      expect(
        screen.getByText('High quality product with excellent features')
      ).toBeInTheDocument();
    });

    test('should render image when image prop is provided', () => {
      render(
        <Card
          title='Card with Image'
          image='https://example.com/image.jpg'
        >
          Content
        </Card>
      );

      const image = screen.getByAltText('Card visual');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    test('should render card with all props combined', () => {
      render(
        <Card
          title='Complete Card'
          description='Full featured card'
          image='https://example.com/full.jpg'
          footer={<button>View More</button>}
        >
          <span>Main Content Area</span>
        </Card>
      );

      expect(screen.getByText('Complete Card')).toBeInTheDocument();
      expect(screen.getByText('Full featured card')).toBeInTheDocument();
      expect(screen.getByText('Main Content Area')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'View More' })).toBeInTheDocument();
    });

    test('should handle complex children elements', () => {
      render(
        <Card title='Complex Content'>
          <div>
            <h4>Nested Header</h4>
            <p>Nested paragraph</p>
          </div>
        </Card>
      );

      expect(screen.getByText('Nested Header')).toBeInTheDocument();
      expect(screen.getByText('Nested paragraph')).toBeInTheDocument();
    });

    test('should apply data-testid for container identification', () => {
      render(<Card title='Testable Card'>Content</Card>);
      const container = screen.getByTestId('card-container');
      expect(container).toHaveClass('rounded-lg', 'border', 'bg-white');
    });
  });

  // Phase 3: Integration Testing
  describe('Phase 3: Integration Testing', () => {
    test('should support custom attributes via spread props', () => {
      render(
        <Card
          title='Custom Attrs'
          data-qa='card-qa'
          id='unique-card'
        >
          Content
        </Card>
      );

      const container = screen.getByTestId('card-container');
      expect(container).toHaveAttribute('data-qa', 'card-qa');
      expect(container).toHaveAttribute('id', 'unique-card');
    });

    test('should render multiple cards independently', () => {
      const { rerender } = render(
        <>
          <Card title='Card One'>Content One</Card>
          <Card title='Card Two'>Content Two</Card>
        </>
      );

      expect(screen.getByText('Card One')).toBeInTheDocument();
      expect(screen.getByText('Card Two')).toBeInTheDocument();
      expect(screen.getByText('Content One')).toBeInTheDocument();
      expect(screen.getByText('Content Two')).toBeInTheDocument();
    });

    test('should handle optional title and description', () => {
      render(
        <Card>
          <p>Just content, no title or description</p>
        </Card>
      );

      expect(screen.getByText('Just content, no title or description')).toBeInTheDocument();
      const container = screen.getByTestId('card-container');
      expect(container).toBeInTheDocument();
    });
  });
});
