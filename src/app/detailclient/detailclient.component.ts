import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddClientPage } from '../add-client/add-client.page';
import { Client } from '../clients/client.model';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-detailclient',
  templateUrl: './detailclient.component.html',
  styleUrls: ['./detailclient.component.scss'],
})
export class DetailclientComponent implements OnInit {
  @Input() client: Client;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {}

  closeModal(role = 'edit') {
    this.modalCtrl.dismiss(this.client, role);
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: AddClientPage,
      componentProps: { client: this.client },
    });

    await modal.present();

    const { data: updatedClient } = await modal.onDidDismiss();
    if (updatedClient) {
      this.client = updatedClient;
    }
  }

  async onDeleteClient() {
    const loading = await this.loadingCtrl.create({
      message: 'Excluindo ... ',
    });
    loading.present();
    this.clientsService
      .deleteClient(this.client.id)
      .pipe(take(1))
      .subscribe(() => {
        loading.dismiss();
        this.closeModal('delete');
      });
  }
}
