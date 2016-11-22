import { Inject } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { Subject } from 'rxjs/Rx'

import { appConfig } from '../../../app'
import { Url, createCookie, getCookie } from '../../../helpers'

export class NxtApiService {
    private http: Http
    private cache: any[]
    private queue: string[]
    private queue$: Subject<string[]>

    constructor (@Inject(Http) http: Http) {
        this.http = http
        this.queue = []
        this.queue$ = new Subject<string[]>()

        try {
            this.cache = JSON.parse(localStorage.getItem('nxtApiCache')) || []
        } catch (e) {
            this.cache = []
        }
    }

    public get (url: Url, cache: boolean = false, cacheDuration: number = 3600): Promise<any> {
        let cachedData = this.cache.filter(c => c.url === url.getUrl())

        if (cachedData.length > 0) {
            let expires = new Date(cachedData[0].expires)
            let now = new Date()

            if (expires.getTime() > now.getTime()) {
                return new Promise((resolve, reject) => resolve(cachedData[0].data))
            } else {
                try {
                    this.cache = this.cache.filter(c => c.url !== url.getUrl())
                    localStorage.setItem('nxtApiCache', JSON.stringify(cachedData))
                } catch (e) {
                    this.cache = this.cache.filter(c => c.url !== url.getUrl())
                }
            }
        }

        if (cache && this.queue.filter(q => q === url.getUrl()).length > 0) {
            return new Promise((resolve, reject) => {
                let subsciption = this.queue$.subscribe(queue => {
                    if (queue.filter(q => q === url.getUrl()).length === 0) {
                        resolve(this.get(url, cache))

                        subsciption.unsubscribe()
                    }
                })
            })
        } else {
            return this.authorizationHeader()
                .then(headersObj => {
                    this.queue.push(url.getUrl())

                    let headers = new Headers(Object.assign({}, headersObj))
                    let options = new RequestOptions({ headers })

                    return this.http.get(url.getUrl(), options)
                        .toPromise()
                        .then(this.extractData)
                        .then(data => {
                            if (cache) {
                                let date = new Date()
                                date.setTime(date.getTime() + (cacheDuration * 1000))

                                let dataToCache = { data, expires: date.toUTCString(), url: url.getUrl() }

                                try {
                                    this.cache.push(dataToCache)
                                    localStorage.setItem('nxtApiCache', JSON.stringify(this.cache))
                                } catch (e) {
                                    this.cache.push(dataToCache)
                                }
                            }

                            this.queue = this.queue.filter(q => q !== url.getUrl())
                            this.queue$.next(this.queue)

                            return data
                        })
                })
        }
    }

    public post (url: Url, body: any): Promise<any> {
        return this.authorizationHeader()
            .then(headersObj => {
                let headers = new Headers(Object.assign({}, headersObj, { 'Content-Type': 'application/json' }))
                let options = new RequestOptions({ headers })

                return this.http
                    .post(url.getUrl(), JSON.stringify(body), options)
                    .toPromise()
                    .then(this.extractData)
            })
    }

    public put (url: Url, body: any): Promise<any> {
        return this.authorizationHeader()
            .then(headersObj => {
                let headers = new Headers(Object.assign({}, headersObj, { 'Content-Type': 'application/json' }))
                let options = new RequestOptions({ headers })

                return this.http
                    .put(url.getUrl(), JSON.stringify(body), options)
                    .toPromise()
                    .then(this.extractData)
            })
    }

    public uploadFile (url: Url, formData: FormData) {
        return this.authorizationHeader()
            .then(headersObj => {
                return new Promise((resolve, reject) => {
                    let xhr: XMLHttpRequest = new XMLHttpRequest()

                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            let response = null

                            try {
                                response = JSON.parse(xhr.response)
                            } catch (e) {
                                response = {}
                            }

                            if (xhr.status === 200) {
                                resolve(response)
                            } else {
                                reject(response)
                            }
                        }
                    }

                    xhr.open('POST', url.getUrl(), true)

                    for (let header in headersObj) {
                        if (headersObj[header] !== undefined) {
                            xhr.setRequestHeader(header, headersObj[header])
                        }
                    }

                    xhr.send(formData)
                })
            })
    }

    public oauth (username: string, password: string): Promise<any> {
        let body = {
            client_id: appConfig.oauth.clientId,
            client_secret: appConfig.oauth.clientSecret,
            grant_type: 'password',
            password,
            username,
        }

        return this.oauthRequest(body)
    }

    public oauthRefreshToken (refreshToken: string): Promise<any> {
        let body = {
            client_id: appConfig.oauth.clientId,
            client_secret: appConfig.oauth.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }

        return this.oauthRequest(body)
    }

    public handleError (error: any) {
        return Promise.reject(error)
    }

    public isLogged (): boolean {
        let accessToken = getCookie('oauth')

        if (accessToken !== false) {
            let now = new Date()
            let expires = new Date(accessToken.token_expires)
            let refreshExpires = new Date(accessToken.refresh_expires)

            return expires > now || refreshExpires > now
        }

        return false
    }

    private oauthRequest (body: any): Promise<any> {
        let url = new Url(appConfig.api.protocol, appConfig.api.domain, appConfig.api.oauthPath)

        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({ headers })

        return this.http
            .post(url.getUrl(), JSON.stringify(body), options)
            .toPromise()
            .then(this.extractData)
            .then(this.extractAccessToken)
    }

    private extractAccessToken (response): any {
        let tokenExpires = new Date()
        tokenExpires.setTime(tokenExpires.getTime() + (response.expires_in * 1000))

        let refreshExpires = new Date()
        refreshExpires.setTime(refreshExpires.getTime() + (1000 * 24 * 14))

        let accessToken = {
            access_token: response.access_token,
            refresh_expires: refreshExpires,
            refresh_token: response.refresh_token,
            scope: response.scope,
            token_expires: tokenExpires,
            token_type: response.token_type,
        }

        createCookie('oauth', accessToken, 14)

        return accessToken
    }

    private authorizationHeader (): Promise<any> {
        let accessToken = getCookie('oauth')

        if (accessToken !== false) {
            let now = new Date()
            let expires = new Date(accessToken.token_expires)
            let refreshExpires = new Date(accessToken.refresh_expires)

            if (expires > now) {
                return new Promise((resolve, reject) => {
                    resolve({ Authorization: `Bearer ${accessToken.access_token}` })
                })
            } else if (refreshExpires > now) {
                return this.oauthRefreshToken(accessToken.refresh_token)
                    .then(this.extractAccessToken)
                    .then(response => {
                        return { Authorization: `Bearer ${response.access_token}` }
                    })
            }
        }

        return new Promise((resolve, reject) => {
            resolve({})
        })
    }

    private extractData (res: Response) {
        let body = res.json()

        return body || {}
    }
}
