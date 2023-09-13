'use client';
import UserContext from './contexts/UserContext';
import Header from './components/Header';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<UserContext>
				<body className={'bg-slate-950 min-h-full ' + inter.className}>
					<Header />
					{children}
				</body>
			</UserContext>
		</html>
	);
}
