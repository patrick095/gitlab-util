import Link from 'next/link';

export default function Home() {
    return (
        <>
            <h1>Bem vindo ao Gitlab Util</h1>
            <p className="mt-5">
                Para poder utilizar as funcionalidades do projeto basta <Link href="/config">Configurar</Link> o projeto com suas credenciais e depois
                utilizar a ação desejada no menu acima
            </p>
        </>
    );
}
