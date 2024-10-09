'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/header';
import Footer from '@/components/footer';

import { useEffect, useState } from 'react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function initializeTheme() {
    // Get the stored theme from localStorage
    const storedTheme = localStorage.getItem('theme');

    // If there's a stored theme, apply it
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  useEffect(() => {
    initializeTheme(); // Initialize the theme on component mount
  }, [isDarkMode]);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LaborClock App',
    url: 'https://labor-clock.vercel.app/',
    description: 'Trakc your labor working days and hours with',
  };

  return (
    <html lang="en">
      <Head>
        <script>{schemaData}</script>
      </Head>
      <body className={`${inter.className} ${isDarkMode ? 'dark' : ''}`}>
        <Providers>
          <main>
            <div className="w-full min-h-screen z-1 pt-4 dark:bg-gray-950">
              <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              <div className="container max-w-screen-lg min-h-[90vh] mx-auto dark:text-white ">
                {/* <Bg display="absolute" /> */}
                {children}
              </div>
              <Footer />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
