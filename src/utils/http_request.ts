// const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
const fetchApi: (input: RequestInfo, init?: RequestInit) => Promise<Response> = (() => {
    if (typeof window === 'undefined' || !window.fetch) {
        return (url: string, option?: RequestInit) => {
            const http = require('https');
            const URL = require('url');
            const parsedURL = URL.parse(url);
            return new Promise<any>((resolve, rej) => {
                http.request({
                    method: option.method,
                    host: parsedURL.host,
                    path: parsedURL.path
                }, (response) => {
                    let data = '';

                    response.on('data', (chunk) => {
                        data += chunk;
                    });

                    // Ending the response 
                    response.on('end', () => {
                        resolve({
                            json() {
                                return JSON.parse(data);
                            }
                        });
                    });

                    response.on('error', rej);

                }).on("error", rej).end();
            });
        };
    }
    return window.fetch;
})();


export class HttpRequest {
    baseUrl = "";

    constructor(option: { baseUrl: string } | string = {} as any) {
        option = typeof option === "string" ? {
            baseUrl: option
        } : option;

        if (option.baseUrl) {
            this.baseUrl = option.baseUrl;
        }
    }

    get<T>(url = "", query = {}): Promise<T> {
        url = this.baseUrl + url + Object.keys(query).
            map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');

        return fetchApi(url, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json'
            // }
        }).then(res => {
            return res.json();
        });
    }
}