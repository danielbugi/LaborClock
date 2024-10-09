'use client';

import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useLaborContext } from '@/context/labor-context';

function LoginForm() {
  const router = useRouter();
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);

  const { selectedMonth, selectedYear } = useLaborContext();

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!info.email || !info.password) {
      setError(true);
      setMessage('Please fill in all the fields');
      return;
    }
    try {
      setPending(true);
      const res = await signIn('credentials', {
        email: info.email,
        password: info.password,
        redirect: false,
      });
      // console.log(res);
      if (!res.ok) {
        if (res.status === 401) {
          setError(true);
          setMessage(`${res.error.split(':')[1]}`);
          setPending(false);
          return;
        } else {
          setError(true);
          setMessage(`Error: ${res.error} (${res.status})`);
          setPending(false);
          return;
        }
      }
      setPending(false);
      setSuccess(true);
      setMessage('Success! Redirecting...');
      setTimeout(() => {
        setMessage(null);
        setSuccess(false);
        router.replace(`/counter/${selectedYear}/${selectedMonth}`);
      }, 1000);
    } catch (error) {
      setPending(false);
      console.error('Error during Login:', error);
      setError(true);
      setMessage('Something went wrong.');
    }
  }
  // Clear message after 5 seconds
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
          label="Email"
          id="email"
          type="text"
          value={info.email}
          onChange={(e) => handleInput(e)}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          value={info.password}
          onChange={(e) => handleInput(e)}
        />
        {message && (
          <p className={error ? 'text-red-600' : 'text-green-600'}>{message}</p>
        )}
        <Button auto color="primary" type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
}
export default LoginForm;
