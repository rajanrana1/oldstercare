import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';
const baseUrl = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Request[]> {
    return this.http.get<Request[]>(baseUrl);
  }
  get(id: any): Observable<Request> {
    return this.http.get<Request>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByRegistrationId(id: any): Observable<Request[]> {
    return this.http.get<Request[]>(`${baseUrl}?registrationId=${id}`);
  }
}
