import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
    public UrlServer = 'https://localhost:44394/api/v1/';
}
