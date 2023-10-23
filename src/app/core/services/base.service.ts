import { RequestMethodEnum } from '../enums/request.enum';
import { ConfigService } from './config.service';

export class BaseService {
    public config: ConfigService;

    constructor(private window: Window) {
        this.config = new ConfigService(this.window);
    }

    public async get<T>(path: string): Promise<T> {
        const res = await this._sendRequest<T>(RequestMethodEnum.GET, path);
        if (res instanceof Response) {
            let allResponse = [];
            const perPage = 100;
            const total = +res.headers.get('x-total');
            const totalPages = Math.ceil(total / perPage);
            let page = +res.headers.get('x-page');
            for (let index = 0; page <= totalPages; page++) {
                const res = (await this._sendRequest<T>(RequestMethodEnum.GET, `${path}?&per_page=${perPage}&page=${page}`, true)) as Array<any>;
                allResponse = allResponse.concat(res);
            }
            return allResponse as T;
        } else {
            return res;
        }
    }

    public async post<T>(path: string): Promise<T> {
        const res = await this._sendRequest<T>(RequestMethodEnum.POST, path);
        if (res instanceof Response) {
        } else {
            return res;
        }
    }

    public async put<T>(path: string): Promise<T> {
        const res = await this._sendRequest<T>(RequestMethodEnum.PUT, path);
        if (res instanceof Response) {
        } else {
            return res;
        }
    }

    public async patch<T>(path: string): Promise<T> {
        const res = await this._sendRequest<T>(RequestMethodEnum.PATCH, path);
        if (res instanceof Response) {
        } else {
            return res;
        }
    }

    public async delete<T>(path: string): Promise<T> {
        const res = await this._sendRequest<T>(RequestMethodEnum.DELETE, path);
        if (res instanceof Response) {
        } else {
            return res;
        }
    }

    private async _sendRequest<T>(method: RequestMethodEnum, path: string, force = false): Promise<T | Response> {
        const url = `${this.config.apiUrl}${path}`;
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: this._getHeadersAuthenticated(),
                method: method,
            })
                .then(async (res) => {
                    const totalPages = res.headers.get('x-total-pages');
                    if (totalPages && !force) {
                        const page = +res.headers.get('x-page');
                        if (+totalPages > page) {
                            return resolve(res);
                        }
                    }
                    resolve(await res.json());
                })
                .catch((error) => {
                    this._handleError(method, url);
                    reject(error);
                });
        });
    }

    private _getHeadersAuthenticated() {
        const headers = new Headers();
        headers.append('PRIVATE-TOKEN', this.config.token);
        return headers;
    }

    private _handleError(method: string, url: string) {
        alert(`Erro ao consumir API do Gitlab. \nMethod: ${method}\nUrl: ${url}`);
        return null;
    }
}
