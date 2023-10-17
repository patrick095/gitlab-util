import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const projectTitle = 'Gitlab Util';
    const routes = [
        {
            label: 'Início',
            route: '/',
        },
        {
            label: 'Configuração',
            route: '/config',
        },
        {
            label: 'ações',
            drop: [
                {
                    label: 'Mover Projetos entre grupos',
                    route: '/mover-projetos-entre-grupos',
                },
            ],
        },
    ];

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand link-nav" href="/">
                    {projectTitle}
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {routes.map((route, index) => {
                            if (route.route) {
                                return (
                                    <li className="nav-item" key={'nav-item-' + index}>
                                        <Link className={`nav-link link-nav ${pathname == route.route ? 'active' : ''}`} href={route.route}>
                                            {route.label}
                                        </Link>
                                    </li>
                                );
                            }
                            if (route.drop) {
                                return (
                                    <li className="nav-item dropdown" key={'nav-item-' + index}>
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            {route.label}
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                {route.drop.map((drop, i) => (
                                                    <Link className="dropdown-item" key={'drop-' + index + '-link-' + i} href={drop.route}>
                                                        {drop.label}
                                                    </Link>
                                                ))}
                                            </li>
                                        </ul>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
