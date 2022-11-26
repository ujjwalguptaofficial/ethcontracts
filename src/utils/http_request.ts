// const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

const fetchApi: (input: RequestInfo, init?: RequestInit) => Promise<Response> = (() => {
    if (typeof window === 'undefined' || !window.fetch) {
        return require('node-fetch').default;
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