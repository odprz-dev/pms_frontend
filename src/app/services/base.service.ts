import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

    private headers: HttpHeaders;

    constructor(
        private httpClient: HttpClient,
        private configuration: ConfigurationService
    ) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Accept', 'application/json');
    }

    get<T>(requestUrl: string, httpParams: any = {}): Observable<any> {
        return this.httpClient
            .get<T>(this.configuration.UrlServer + requestUrl, { headers: this.headers, params: httpParams });
    }


    post<T>(requestUrl: string, bodyRequest: any): Observable<any> {
        return this.httpClient
        .post<T>(this.configuration.UrlServer + requestUrl, bodyRequest, { headers: this.headers });
    }

    put<T>(requestUrl: string, bodyRequest: any): Observable<any> {
        return this.httpClient
        .put<T>(this.configuration.UrlServer + requestUrl, bodyRequest, { headers: this.headers });
    }

    delete<T>(requestUrl: string): Observable<any> {
        return this.httpClient
        .delete<T>(this.configuration.UrlServer + requestUrl, { headers: this.headers });
    }
}
