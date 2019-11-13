import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GenericRequestService {
  constructor(private pHttpClient: HttpClient) { }

  execPost(pURL: string, pData: any): Observable<any> {
    return this.pHttpClient.post(pURL, pData);
  }

  execGet(pURL: string): Observable<any> {
    return this.pHttpClient.get(pURL);
  }
  
}
