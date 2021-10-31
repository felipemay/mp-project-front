import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../orders/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/orders`);
    }

    addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/orders`, order);
    }
}