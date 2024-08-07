import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LaborClock - Time tracking made easy',
  description:
    'LaborClock is a time tracking app that helps you keep track of your work hours.',
  keywords:
    'time tracking, productivity, work hours, time management, LaborClock',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="w-full min-h-screen bg-lin background">
          <div className="container max-w-screen-lg min-h-screen mx-auto">
            <Providers>
              <Header />
              {children}
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
