import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrdersService } from '../services/orders.service';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
orders$: Observable<Order[]>;

  constructor(
    private ordersService: OrdersService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({message: 'Carregando ... '});
    loading.present();

    this.orders$ = this.ordersService.getOrders().pipe(
      tap((orders) => {
        loading.dismiss();
        return orders;
      })
    );
  }
}
