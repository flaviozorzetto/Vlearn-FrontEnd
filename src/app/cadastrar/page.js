'use client';

import { useState } from 'react';

export default function Cadastrar() {
	const [messageObj, setMessageObj] = useState({
		message: '',
		ok: false,
		show: false,
	});
	async function submitHandler(formData) {
		setMessageObj({ ...messageObj, ok: false, show: false });
		const res = await fetch(
			'https://vlearn-api.azurewebsites.net/vlearn/login',
			{
				method: 'POST',
				body: JSON.stringify(Object.fromEntries(formData)),
				headers: { 'Content-Type': 'application/json' },
			}
		);
		if (res.status == 201) {
			setMessageObj(messageObj => ({
				...messageObj,
				message: 'Cadastrado com sucesso',
				ok: true,
			}));
		}

		setMessageObj(messageObj => ({
			...messageObj,
			show: true,
		}));
	}

	return (
		<main className="pt-10 flex justify-center flex-col items-center gap-4">
			<h2>Tela de Cadastro</h2>
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
					<p className={messageObj.ok ? 'text-green-600 font-bold' : 'text-red-800 font-bold'}>
						{messageObj.ok
							? messageObj.message
							: 'Não foi possivel realizar o cadastro'}
					</p>
				)}
				<button type="submit" className="bg-slate-800 w-fit p-2 self-center">
					Cadastrar
				</button>
			</form>
		</main>
	);
}
