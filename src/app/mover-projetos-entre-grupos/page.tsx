'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { GitlabService } from '@core/services/gitlab.service';
import { GitlabGroupsInterface, GitlabProjectInterface } from '@core/interfaces/gitlab.interfaces';
import { ConfigService } from '@core/services/config.service';
import { Button } from '@core/components/button';
import Modal from '../core/components/modal';

export default function MoverProjetosEntreGrupos() {
    const [gitlabService, setGitlabService] = useState<GitlabService>();
    const [isGitlabConfig, setIsGitlabConfig] = useState(false);
    const [groups, setGroups] = useState<Array<GitlabGroupsInterface>>([]);
    const [loading, setLoading] = useState<Record<string, boolean>>({});
    const [groupFrom, setGroupFrom] = useState<GitlabGroupsInterface>(null);
    const [groupTo, setGroupTo] = useState<GitlabGroupsInterface>(null);
    const [listProjectsGroupFrom, setListProjectsGroupFrom] = useState<Array<GitlabProjectInterface>>([]);
    const [listProjectsToTransfer, setListProjectsGroupToTransfer] = useState<Array<GitlabProjectInterface>>([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const [projectTransfering, setProjectTransfering] = useState(null);
    const [filterProject, setFilterProject] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (window) {
            setGitlabService(new GitlabService(window));
            const { apiUrl, token } = new ConfigService(window);
            setIsGitlabConfig(!!apiUrl && !!token);
            require('bootstrap/dist/js/bootstrap');
        }
    }, []);

    function getGroupById(id: string) {
        return groups.find((group) => group.id === +id);
    }

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

    function initTransferProjects() {
        if (!groupFrom || !groupTo) return alert('Você precisa selecionar os projetos corretamente!');
        setLoading({ ...loading, initTransferProjects: true });
        gitlabService
            .getProjectsFromGroupId(groupFrom.id)
            .then((projects) => {
                if (projects && Array.isArray(projects)) setListProjectsGroupFrom(projects);
                console.log(projects.length, projects);
                setOpenModal(true);
            })
            .finally(() => setLoading({ ...loading, initTransferProjects: false }));
    }

    function selectProjectToTransfer(id: number, selected: boolean) {
        const newList = listProjectsToTransfer;
        if (selected) {
            const project = listProjectsGroupFrom.find((project) => project.id === id);
            newList.push(project);
        } else {
            const index = newList.findIndex((project) => project.id === id);
            newList.splice(index, 1);
        }
        setListProjectsGroupToTransfer(newList);
    }

    async function confirmTransferProjects() {
        setLoading({ ...loading, confirmTransferProjects: true });
        const isConfirmed = confirm(`Confirme os projetos Selecionados:\n${listProjectsToTransfer.map((p) => p.name).join('\n')}`);

        // if (isConfirmed) {
        //     for (const project of listProjectsToTransfer) {
        //         setProjectTransfering(project.name);
        //         await gitlabService.transferProjectToGroup(project.id, groupTo.id);
        //     }
        //     setProjectTransfering('Todos os projetos foram transferidos.');
        // }
        setLoading({ ...loading, confirmTransferProjects: false });
    }

    return (
        <>
            <div className="my-3 container">
                <div id="list-groups" className={`my-3 card p-5 col-8 ${!groups.length ? 'd-none' : ''}`}>
                    <div className="mb-3 col-12">
                        <label htmlFor="group-from-select" className="form-label">
                            Selecione o Grupo que irá ceder os Projetos
                        </label>
                        <select className="form-select" id="group-from-select" onChange={(e) => setGroupFrom(getGroupById(e.target.value))}>
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
                        <select className="form-select" id="group-to-select" onChange={(e) => setGroupTo(getGroupById(e.target.value))}>
                            <option value="">selecione</option>
                            {groups.map((group, index) => (
                                <option key={'group-to-' + index} value={group.id}>
                                    {group.full_path}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex col-12 justify-content-end">
                        <Button onClick={initTransferProjects} loading={loading?.initTransferProjects}>
                            Selecionar Projetos
                        </Button>
                    </div>
                </div>
                <div className="d-flex mt-5 justify-content-end col-8">
                    <Button enfase="secondary" className="me-2" onClick={() => router.push('/')}>
                        Voltar
                    </Button>
                    <Button loading={loading?.listarGrupos} onClick={listarGrupos}>
                        Pesquisar Grupos
                    </Button>
                </div>
            </div>
            <Modal
                title="Confirmar Transferencia de Projetos?"
                open={isOpenModal}
                setOpen={setOpenModal}
                onConfirm={confirmTransferProjects}
                loadingConfirm={loading.confirmTransferProjects}>
                {projectTransfering ? (
                    <p> Trnasferindo Projeto: {projectTransfering} </p>
                ) : (
                    <>
                        <p>
                            Selecione os projetos que deseja tranferir para o grupo:
                            <strong>{groupTo ? groupTo.full_path : ''}</strong>
                        </p>
                        <div className="my-3 input-group">
                            <input
                                type="text"
                                value={filterProject}
                                onChange={(e) => setFilterProject(e.target.value)}
                                className="form-control"
                                placeholder="Filtrar"
                            />
                            <span className="input-group-text">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>
                        <ul className="list-group">
                            {listProjectsGroupFrom.length ? (
                                listProjectsGroupFrom.map((project, index) => {
                                    return (
                                        <li
                                            className={`list-group-item ${
                                                filterProject && !project.name.toLowerCase().includes(filterProject.toLowerCase()) ? 'hidden' : ''
                                            }`}
                                            key={'project-from-' + index}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input project-to-transfer"
                                                    type="checkbox"
                                                    onChange={(e) => selectProjectToTransfer(project.id, e.target.checked)}
                                                    id={project.id.toString()}
                                                />
                                                <label className="form-check-label" htmlFor={project.id.toString()}>
                                                    {project.name}
                                                </label>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <>
                                    <li className="list-group-item d-flex">
                                        <span>Carregando...</span>
                                        <div className="spinner-border"></div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </>
                )}
            </Modal>
        </>
    );
}
