'use client';
import { useEffect, useState } from 'react';
import { ConfigService } from '../core/services/config.service';
import { GitlabService } from '../core/services/gitlab.service';
import { GitlabGroupsInterface } from '../core/interfaces/gitlab.interfaces';
import { Button } from '../core/components/button';

export default function MoverProjetosEntreGrupos() {
    const [gitlabService, setGitlabService] = useState<GitlabService>();
    const [isGitlabConfig, setIsGitlabConfig] = useState(false);
    const [groups, setGroups] = useState<Array<GitlabGroupsInterface>>([]);
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (window) {
            setGitlabService(new GitlabService(window));
            const { apiUrl, token } = new ConfigService(window);
            setIsGitlabConfig(!!apiUrl && !!token);
        }
    }, []);

    function listarGrupos() {
        if (!isGitlabConfig) return alert('Gitlab não configurado, volte a tela incial e clique em configurar conexão com Gitlab');
        setLoading({ ...loading, listarGrupos: true });
        gitlabService
            .getAllGroups()
            .then((groups) => {
                if (groups) {
                    setGroups(groups);
                }
            })
            .finally(() => setLoading({ ...loading, listarGrupos: false }));
    }

    return (
        <>
            <div className="my-3 container">
                <div id="list-groups" className={`my-3 card p-5 col-8 ${!groups.length ? 'd-none' : ''}`}>
                    <div className="mb-3 col-12">
                        <label htmlFor="group-from-select" className="form-label">
                            Selecione o Grupo que irá ceder os Projetos
                        </label>
                        <select className="form-select" id="group-from-select">
                            <option value="">selecione</option>
                            {groups.map((group, index) => (
                                <option key={'group-from-' + index} value={group.id}>
                                    {group.full_path}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="group-to-select" className="form-label">
                            Selecione o Grupo que irá receber os Projetos
                        </label>
                        <select className="form-select" id="group-to-select">
                            <option value="">selecione</option>
                            {groups.map((group, index) => (
                                <option key={'group-to-' + index} value={group.id}>
                                    {group.full_path}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex col-12 justify-content-end">
                        <button className="btn btn-primary" id="transferir-projetos" data-bs-toggle="modal" data-bs-target="#modal-confirm-projects">
                            Transferir Projetos
                        </button>
                    </div>
                </div>
                <div className="d-flex mt-5 justify-content-end col-8">
                    <Button enfase="secondary" className="me-2">
                        Voltar
                    </Button>
                    <Button loading={loading?.listarGrupos} onClick={listarGrupos}>
                        Pesquisar Grupos
                    </Button>
                </div>
            </div>

            <div
                className="modal"
                id="modal-confirm-projects"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar Transferencia de Projetos?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Selecione os projetos que deseja tranferir para o grupo:
                                <strong id="group-to-name"></strong>
                            </p>
                            <ul id="projects-to-transfer" className="list-group"></ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" id="confirmar-transferencia-projetos">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
