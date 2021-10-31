import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {
  form: FormGroup;

  constructor(private ordersService: OrdersService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.form = new FormGroup({
      product_name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });
  }
  async submitOrder() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando ... ',
    });
    loading.present();

    this.ordersService
      .addOrder(this.form.value)
      .pipe(take(1))
      .subscribe(() => {
        this.form.reset();
        loading.dismiss();
      });
  }
}
