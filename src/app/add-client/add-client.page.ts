import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Client } from '../clients/client.model';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.page.html',
  styleUrls: ['./add-client.page.scss'],
})
export class AddClientPage implements OnInit {
  @Input() client: Client;
  isEditMode = false;
  form: FormGroup;
  constructor(
    private clientsService: ClientsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initAddClientForm();

    if (this.client) {
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddClientForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      address_number: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  setFormValues() {
    this.form.setValue({
      name: this.client.name,
      cnpj: this.client.cnpj,
      address: this.client.address,
      address_number: this.client.address_number,
      city: this.client.city,
      state: this.client.state,
      phone: this.client.phone,
    });

    this.form.updateValueAndValidity();
  }

  closeModal(data = null) {
    this.modalCtrl.dismiss(data);
  }

  async submitClient() {
    const loading = await this.loadingCtrl.create({ message: 'Carregando ... '});
    loading.present();

    let response: Observable<Client>;

    if (this.isEditMode) {
      response = this.clientsService.updateClient(
        this.client.id,
        this.form.value
      );
    } else {
      response = this.clientsService.addClient(this.form.value);
    }

    response.pipe(take(1)).subscribe((client) => {
      this.form.reset();
      loading.dismiss();

      if (this.isEditMode) {
        this.closeModal(client);
      }
    });
  }
}
