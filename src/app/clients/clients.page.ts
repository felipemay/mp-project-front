import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Client } from './client.model';
import { DetailclientComponent } from '../detailclient/detailclient.component';
import { PopoverComponent } from '../components/popover/popover.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  clients$: Observable<Client[]>;

  constructor(
    private clientsService: ClientsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private popCtrl: PopoverController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando ... ',
    });
    loading.present();

    this.clients$ = this.clientsService.getClients().pipe(
      tap((clients) => {
        loading.dismiss();
        return clients;
      })
    );
  }

  async openClientDetailModal(client: Client) {
    const modal = await this.modalCtrl.create({
      component: DetailclientComponent,
      componentProps: { client },
    });

    await modal.present();

    const { data: updatedClient, role } = await modal.onDidDismiss();
    if (updatedClient && role === 'edit') {
      this.clients$ = this.clients$.pipe(
        map((client) => {
          client.forEach((clie) => {
            if (clie.id === updatedClient.id) {
              clie = updatedClient;
            }
            return clie;
          });
          return client;
        })
      );
    }

    if (role === 'delete') {
      this.clients$ = this.clients$.pipe(
        map((client) => {
          client.filter((clie) => clie.id !== updatedClient.id);
          return client;
        })
      );
    }
  }

  async _openPopover(ev: any) {
    const popover = await this.popCtrl.create({
      component: PopoverComponent,
      event: ev
    });

    popover.onDidDismiss();

    return await popover.present();
  }
}
