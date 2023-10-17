import { RequestMethodEnum } from '../enums/request.enum';
import { ConfigService } from './config.service';

export class BaseService {
    public config: ConfigService;

    constructor(private window: Window) {
        this.config = new ConfigService(this.window);
    }

    public async get<T>(path: string): Promise<T> {
        return await this._sendRequest(RequestMethodEnum.GET, path);
    }

    public async post<T>(path: string): Promise<T> {
        return await this._sendRequest(RequestMethodEnum.POST, path);
    }

    public async put<T>(path: string): Promise<T> {
        return await this._sendRequest(RequestMethodEnum.PUT, path);
    }

    public async patch<T>(path: string): Promise<T> {
        return await this._sendRequest(RequestMethodEnum.PATCH, path);
    }

    public async delete<T>(path: string): Promise<T> {
        return await this._sendRequest(RequestMethodEnum.DELETE, path);
    }

    private async _sendRequest(method: RequestMethodEnum, path: string) {
        const url = `${this.config.apiUrl}${path}`;
        return fetch(url, {
            headers: this._getHeadersAuthenticated(),
            method: method,
        }).then(async (res) => await res.json());
    }

    private _getHeadersAuthenticated() {
        const headers = new Headers();
        headers.append('PRIVATE-TOKEN', this.config.token);
        return headers;
    }

    private _handleError(method: string, url: string) {
        alert(`Erro na Requisição:Method: ${method}URL: ${url}`);
        return null;
    }
}
