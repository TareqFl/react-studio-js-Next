import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SettingsContext } from '@/context/settingsContext';
import '@/styles.scss';
import '@/styles/fontawesome/css/all.css';
const inter = Montserrat({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'react-studio-js-Next',
  description: 'react-studio-js-Next',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsContext>{children}</SettingsContext>
      </body>
    </html>
  );
}
