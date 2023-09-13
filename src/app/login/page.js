'use client';
import Cookies from 'js-cookies';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../contexts/UserContext';

export default function Login() {
	const router = useRouter();
	const currentUser = useContext(CurrentUserContext);

	const [messageObj, setMessageObj] = useState({
		message: '',
		ok: false,
		show: false,
	});

	async function submitHandler(formData) {
		setMessageObj({ ...messageObj, ok: false, show: false });

		try {
			const res = await fetch(
				'https://vlearn-api.azurewebsites.net/vlearn/login',
				{ method: 'GET' }
			);
			const data = await res.json();
			const user = Object.fromEntries(formData);
			let found = false;

			data.forEach(e => {
				if (user.email == e.email && user.senha == e.senha) {
					found = true;
					setMessageObj({
						...messageObj,
						message: 'Logado com sucesso! atualizando em 3 segundos',
						ok: true,
					});
					Cookies.setItem('user', JSON.stringify(e), 86400);
					currentUser.setUser(e);
					setTimeout(() => {
						router.replace('/');
					}, 3000);
				}
			});

			if (!found) {
				setMessageObj(messageObj => ({
					...messageObj,
					message: 'Login não encontrado',
				}));
			}
		} catch (e) {
			setMessageObj(messageObj => ({
				...messageObj,
				message: e.message,
			}));
		}

		setMessageObj(messageObj => ({
			...messageObj,
			show: true,
		}));
	}

	return (
		<main className="pt-10 flex flex-col items-center gap-4">
			<h2>Tela de login</h2>

			<form
				action={submitHandler}
				className="bg-slate-600 w-fit p-2 flex flex-col gap-4"
			>
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						name="email"
						required={true}
						className="text-black outline-none focus:ring-black focus:ring-2"
					></input>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="senha">Senha</label>
					<input
						type="text"
						id="senha"
						name="senha"
						required={true}
						className="text-black outline-none focus:ring-black focus:ring-2"
					></input>
				</div>
				{messageObj.show && (
					<p
						className={
							messageObj.ok
								? 'text-green-600 font-bold'
								: 'text-red-800 font-bold'
						}
					>
						{messageObj.message}
					</p>
				)}
				<button type="submit" className="bg-slate-800 w-fit p-2 self-center">
					Logar
				</button>
			</form>
		</main>
	);
}
