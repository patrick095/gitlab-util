'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ConfigService } from '@core/services/config.service';
import { Button } from '@core/components/button';

export default function Config() {
    const [url, setUrl] = useState('');
    const [token, setToken] = useState('');
    const [saveStorage, setSaveStorage] = useState(false);
    const router = useRouter();

    function saveConfig() {
        if (!url || !token) return alert('Favor preencher todos os dados!');

        new ConfigService(window).setConfig({ baseUrl: url, token }, saveStorage);

        alert('Configuração salvar com sucesso. Agora ja pode acessar as funcionalidades corretamente.');
        setUrl('');
        setToken('');
    }

    return (
        <>
            <div className="col-6 card p-5 mt-5">
                <div className="mb-3">
                    <label htmlFor="url_gitlab" className="form-label">
                        Digite a url do Gitlab
                    </label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-control"
                        id="url_gitlab"
                        placeholder="Ex: https://gitlab.com"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="token_acesso" className="form-label">
                        Digite seu Token de acesso
                    </label>
                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="form-control"
                        id="token_acesso"
                        placeholder="Token de acesso"
                    />
                </div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input cursor-pointer"
                        checked={saveStorage}
                        onChange={(e) => setSaveStorage(e.target.checked)}
                        type="checkbox"
                        role="switch"
                        id="save_storage"
                    />
                    <label className="form-check-label cursor-pointer" htmlFor="save_storage">
                        Manter conectado?
                    </label>
                </div>
            </div>
            <div className="mt-5 d-flex justify-content-end col-6">
                <Button enfase="secondary" className="me-2" onClick={() => router.push('/')}>
                    Voltar
                </Button>
                <Button onClick={saveConfig}>Salvar Configuração</Button>
            </div>
        </>
    );
}
