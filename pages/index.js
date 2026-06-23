import Button from '../src/components/Button';
import Card from '../src/components/Card';
import Input from '../src/components/Input';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Component Testing Suite</h1>
      <p>This page demonstrates the Button, Card, and Input components.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <Card
          title='User Registration'
          description='Fill in the form to register'
          footer={
            <Button onClick={handleSubmit} variant='primary'>
              Register
            </Button>
          }
        >
          <Input
            label='Full Name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='John Doe'
            required
          />
          <Input
            label='Email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='john@example.com'
            required
          />
        </Card>

        <Card
          title='Available Actions'
          description='Test different button variants'
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button variant='primary'>Primary Action</Button>
            <Button variant='secondary'>Secondary Action</Button>
            <Button variant='danger'>Delete</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
