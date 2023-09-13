import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/UserContext';
import Link from 'next/link';
import Cookie from 'js-cookies';

export default function Header() {
	const currentUser = useContext(CurrentUserContext);

	return (
		<header className="flex justify-between items-center border-slate-400 border-solid border-b-2 p-6">
			<h1 className="text-3xl">Vlearn</h1>
			<div>
				{currentUser.user ? (
					<button
						onClick={() => {
							Cookie.removeItem('user');
							window.location.reload();
						}}
						className="border mr-4 rounded-md bg-white p-2 text-black hover:scale-110 transition-all"
					>
						Deslogar
					</button>
				) : (
					<>
						<button className="border mr-4 rounded-md bg-white text-black hover:scale-110 transition-all">
							<Link className="p-2 inline-block" href={'/cadastrar'}>
								Cadastrar
							</Link>
						</button>
						<button className="border rounded-md bg-white text-black hover:scale-110 transition-all">
							<Link className="p-2 inline-block" href={'/login'}>
								Login
							</Link>
						</button>
					</>
				)}
			</div>
		</header>
	);
}
