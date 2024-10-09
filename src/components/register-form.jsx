'use client';

import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function RegisterForm() {
  const router = useRouter();
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    perHour: '',
  });
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !info.password ||
      !info.passwordConfirm ||
      !info.email ||
      !info.firstName ||
      !info.lastName ||
      !info.perHour
    ) {
      setError(true);
      setMessage('Please fill out all fields');
      return;
    }

    // console.log(info);

    try {
      setPending(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(true);
        setMessage(`Error: ${errorData.message} (${res.status})`);
        setPending(false);
        return;
      }

      const data = await res.json();
      if (data.status === 'error') {
        setError(true);
        setMessage(data.message);
        setPending(false);
        return;
      }
      e.target.reset();
      setSuccess(true);
      setMessage('Account created successfully');
      setPending(false);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(false);
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, success, error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b-2 md:border-r-2 pb-4 md:pb-0"
    >
      <div className="flex flex-col gap-4 pr-0 md:pr-28">
        <Input
          label="First Name"
          id="firstName"
          value={info.firstName}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Last Name"
          id="lastName"
          value={info.lastName}
          onChange={handleChange}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          value={info.email}
          onChange={handleChange}
        />
        <Input
          label="Your hourly rate"
          id="perHour"
          value={info.perHour}
          type="number"
          onChange={handleChange}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={info.password}
          onChange={handleChange}
        />
        <Input
          label="Confirm Password"
          id="passwordConfirm"
          type="password"
          value={info.passwordConfirm}
          onChange={handleChange}
        />

        {message && (
          <p className={error ? 'text-red-600' : 'text-green-600'}>{message}</p>
        )}
        <Button auto color="primary" type="submit">
          Register
        </Button>
      </div>
    </form>
  );
}
export default RegisterForm;
