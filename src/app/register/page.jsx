import RegisterForm from '@/components/register-form';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-4 w-4/5 mx-auto my-24">
      <h1 className="font-bold text-3xl">Register</h1>
      <p>Register now to start tracking your hours with ease.</p>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegisterForm />
        <div className="flex flex-col items-start gap-2 pl-0 md:pl-28">
          <p>Already have an account?</p>
          <Link href="/login">
            <Button auto variant="flat">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
