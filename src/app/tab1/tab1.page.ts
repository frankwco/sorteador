import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdmobService } from '../services/admob.service';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('nome') myInput;
  pessoa;
  listaPessoa = [];
  selecionar = false;
  selecionados = 0;

  constructor(private admobFree: AdMobFree, private admobService: AdmobService, private router: Router, private storage: Storage, public alertController: AlertController) {
    this.pessoa = { id: '', nome: '', selecionado: true };

    // set a key/value
    //storage.set('name', 'Max');

    // Or to get a key/value pair
    //storage.get('age').then((val) => {
    //  console.log('Your age is', val);
    //});
    this.buscarTodos();

  }
  ionViewDidEnter() {
    //alert("HERRE");
    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      id:"ca-app-pub-2148105901377599/6535052751"
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
      // success
    }).catch(e => alert(e));
    //this.admobService.showBanner();
  }

  chamarTab2() {

    this.router.navigate(['tabs/tab2'])

  }

  buscarTodos() {
    this.storage.get('listaPessoa').then((val) => {
      if (val != null) {
        this.listaPessoa = val;
        //console.log(this.listaPessoa.length);
        this.selecionados = 0;
        for (let x = 0; x < this.listaPessoa.length; x++) {
          if (this.listaPessoa[x].selecionado) {
            this.selecionados++;
          }
        }
      }
    });
  }

  inserirPessoa() {
    let dt = new Date();
    let i = dt.getDate() + "" + dt.getDay() + "" + dt.getMonth() + "" + dt.getFullYear() + "" + dt.getHours() + "" + dt.getSeconds() + "" + dt.getMilliseconds() + "" + this.pessoa.nome;
    //console.log(i);
    this.pessoa.id = i;
    this.listaPessoa.push(this.pessoa);
    this.storage.set('listaPessoa', this.listaPessoa);
    this.pessoa = { id: '', nome: '', selecionado: true };
    this.myInput.setFocus();
  }

  excluirPessoa(id) {
    let listaAntiga = this.listaPessoa;
    this.listaPessoa = [];
    for (let x = 0; x < listaAntiga.length; x++) {
      if (listaAntiga[x].id != id) {
        this.listaPessoa.push(listaAntiga[x]);
      }
    }
    this.storage.set('listaPessoa', this.listaPessoa);
  }

  selecionarTodos() {

    let listaAntiga = this.listaPessoa;
    this.listaPessoa = [];
    for (let x = 0; x < listaAntiga.length; x++) {
      listaAntiga[x].selecionado = !this.selecionar;
      this.listaPessoa.push(listaAntiga[x]);

    }
    this.storage.set('listaPessoa', this.listaPessoa).then((val) => {
      this.buscarTodos();
    });

  }

  marcarDesmarcar(id) {

    let listaAntiga = this.listaPessoa;
    this.listaPessoa = [];
    for (let x = 0; x < listaAntiga.length; x++) {
      if (listaAntiga[x].id == id) {
        //console.log("asd "+id)
        listaAntiga[x].selecionado = !listaAntiga[x].selecionado;
      }
      this.listaPessoa.push(listaAntiga[x]);
    }



    this.storage.set('listaPessoa', this.listaPessoa).then((val) => {
      this.buscarTodos();
    });

  }

}
