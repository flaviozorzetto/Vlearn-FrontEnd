import Link from 'next/link';

export default function Notfound() {
	return (
		<main className="h-full  flex flex-col justify-center items-center">
			<h2>404 - Página não encontrada</h2>
			<Link href="/">Voltar para home</Link>
		</main>
	);
}
