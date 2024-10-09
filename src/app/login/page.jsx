import LoginForm from '@/components/login-form';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

function LoginPage() {
  return (
    <div className="flex flex-col gap-4 w-4/5 mx-auto my-24">
      <h1 className="font-bold text-3xl">Login</h1>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        <LoginForm />
        <div className="flex flex-col items-start gap-2 pl-0 md:pl-28">
          <p>Don&apos;t have an account?</p>
          <Link href="/register">
            <Button auto variant="flat">
              Sign Up!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
