import { ConfigInterface } from '../interfaces/config.interface';
import { LocalStorageUtil } from '../utils/localStorage.util';
import { SessionStorageUtil } from '../utils/sessionStorage.util';

export class ConfigService {
    private _baseUrl: string;
    private _apiUrl: string;
    private _token: string;
    private _configKey = 'app-conf-git';
    private _session: SessionStorageUtil;
    private _local: LocalStorageUtil;

    constructor(private window: Window) {
        this._session = new SessionStorageUtil(this.window);
        this._local = new LocalStorageUtil(this.window);
        const hasConfigSession = this._session.get<ConfigInterface>(this._configKey);
        const hasConfigLocal = this._local.get<ConfigInterface>(this._configKey);

        if (hasConfigLocal) this.setConfig(hasConfigLocal);
        if (hasConfigSession) this.setConfig(hasConfigSession);
    }

    public get baseUrl(): string {
        return this._baseUrl;
    }

    public get apiUrl(): string {
        return this._apiUrl;
    }

    public get token(): string {
        return this._token;
    }

    public setConfig({ baseUrl, token }: ConfigInterface, isLocal = false) {
        this._baseUrl = baseUrl;
        this._apiUrl = `${baseUrl}/api/v4/`;
        this._token = token;

        isLocal ? this._local.store(this._configKey, { baseUrl, token }) : this._session.store(this._configKey, { baseUrl, token });
    }
}
