import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AdmobService } from '../services/admob.service';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { ControleExibicao } from '../services/ControleExibicao';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  controleExibicao = ControleExibicao.getInstance();
  timea = 0;
  timeb = 0;
  constructor(private admobFree: AdMobFree, private admobService: AdmobService, public alertController: AlertController, private storage: Storage,) {

    this.storage.get('timea').then((vall) => {
      if (vall != null) {
        this.timea = vall;
      }
    });
    this.storage.get('timeb').then((vall) => {
      if (vall != null) {
        this.timeb = vall;
      }
    });
  }

  ionViewWillEnter() {
    // this.admobService.showInterstitial();
    this.controleExibicao.tela = 3;
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: false, // Remove in production
      autoShow: true,
      id:"ca-app-pub-2148105901377599/6571413440"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => alert(e));
  }

  async zerar() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Opaa',
      message: 'Tá certo disso? Zerar??',
      buttons: [
        {
          text: 'Deixa',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Claro',
          handler: () => {
            this.timea = 0
            this.timeb = 0
            this.storage.set('timea', this.timea);
            this.storage.set('timeb', this.timeb);
          }
        }
      ]
    });

    await alert.present();

  }

  adicionar(time) {
    if (time == 'a') {
      this.timea++;
      this.storage.set('timea', this.timea);
    } else {
      this.timeb++;
      this.storage.set('timeb', this.timeb);
    }
  }

  async remover(time) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirma aee',
      message: 'Quer realmente tirar um pontinho???',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Claro, time ruim!',
          handler: () => {
            if (time == 'a') {
              this.timea--;
              this.storage.set('timea', this.timea);
            } else {
              this.timeb--;
              this.storage.set('timeb', this.timeb);
            }
          }
        }
      ]
    });

    await alert.present();

  }
}
