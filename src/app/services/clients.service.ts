import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../clients/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  updateClient(clientId: number, client: Client): Observable<Client> {
    return this.http.put<Client>(
        `${this.apiUrl}/clients/${clientId}`,
        client
    );
  }

  deleteClient(clientId: number): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/clients/${clientId}`);
    
  }
}
