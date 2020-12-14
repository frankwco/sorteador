import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

timea=0;
timeb=0;
  constructor(public alertController: AlertController, private storage: Storage,) {

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



async zerar(){

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
          this.timea=0
          this.timeb=0
          this.storage.set('timea', this.timea);
          this.storage.set('timeb', this.timeb);
        }
      }
    ]
  });

  await alert.present();

}

adicionar(time){
  if(time=='a'){
    this.timea++;
    this.storage.set('timea', this.timea);
  }else{
    this.timeb++;
    this.storage.set('timeb', this.timeb);
  }
}

  async remover(time){
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
           if(time=='a'){
             this.timea--;
             this.storage.set('timea', this.timea);
           }else{
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
