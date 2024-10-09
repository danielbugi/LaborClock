'use client';

import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

export default function ProfileForm({ initialData, onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(new FormData(e.target));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Handle error, maybe show an error message to the user
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isEditing) {
    return (
      <>
        <p>
          <strong>First Name:</strong> {formData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {formData.lastName}
        </p>
        <p>
          <strong>Hour Rate:</strong> {formData.perHour}
        </p>
        <Button color="primary" onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <Input
        label="Hour Rate"
        name="perHour"
        value={formData.perHour}
        onChange={handleInputChange}
      />
      <div className="flex justify-between gap-2">
        <Button color="primary" type="submit" className="w-full">
          Save Profile
        </Button>
        <Button
          color="secondary"
          className="w-full"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
