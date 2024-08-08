import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Bg from '@/components/bg';

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
        <Providers>
          <main className="w-full min-h-screen z-1 ">
            <div className="container max-w-screen-lg min-h-[90vh] mx-auto">
              {/* <Bg display="absolute" /> */}
              <Header />
              {children}
            </div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
