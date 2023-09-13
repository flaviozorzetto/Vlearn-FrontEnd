'use client';

import { useContext } from 'react';
import { CurrentUserContext } from './contexts/UserContext';

export default function Home() {
	const currentUser = useContext(CurrentUserContext);
	return (
		<main className="h-full flex justify-center">
			<p className="mt-10">
				{currentUser.user
					? `Ola ${currentUser.user.email} com id ${currentUser.user.id}`
					: `Voce ainda não está logado, acesse a aba de login ou cadastro para
				entrar no site`}
			</p>
		</main>
	);
}
