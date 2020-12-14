import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pessoa;
  listaPessoa = [];
  times = [];
  selecionar = false;
  quantidade: number = 2;
  sortearPor = "pessoas";

  constructor(private socialSharing: SocialSharing, private storage: Storage, public alertController: AlertController) {
    //console.log("construtor")

    this.buscarTodos();

  }

  compartilhar() {
    let m='';

  for(let x=0; x<this.times.length;x++){
    if(m.length>1){
      m+="\n\n";
    }
    m+=this.times[x].nome+": ";
    for(let y=0;y<this.listaPessoa.length;y++){
      if(this.times[x].id == this.listaPessoa[y].time){
        m+=this.listaPessoa[y].nome+" - ";
      }
    }
    if(m[m.length-2]=='-'){
      m=m.substring(0, m.length-2);
    }
    //console.log("asd "+m[m.length-2]);
    //console.log(m);
  }


  // Share via email
  this.socialSharing.share(m, null, null, null).then((err) => {
    // Success!
  }).catch((err) => {
    // Error!
  });
  }

  buscarTodos() {

    this.storage.get('listaTime').then((val) => {
      if (val != null) {
        this.times = val;
        //console.log(this.times.length)
      }
      this.storage.get('listaPessoa').then((vall) => {
        if (vall != null) {
          this.listaPessoa = vall;
        }
      });
    });

  }

  getId(ii) {
    let dt = new Date();
    let i = ii + "" + dt.getDate() + "" + dt.getDay() + "" + dt.getMonth() + "" + dt.getFullYear() + "" + dt.getHours() + "" + dt.getSeconds() + "" + dt.getMilliseconds();
    return i;
  }

  async realizarSorteio() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmação',
      message: 'Vamos realizar o <strong>sorteio</strong>?!',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Boraaa',
          handler: () => {
            this.listaPessoa = [];
            this.storage.get('listaPessoa').then((vall) => {
              if (vall != null) {
                for (let x = 0; x < vall.length; x++) {
                  if (vall[x].selecionado == true) {
                    //console.log(vall[x].id);
                    this.listaPessoa.push(vall[x]);
                  }
                }
                this.sortear();
              }
            });
          }
        }
      ]
    });

    await alert.present();




  }

  sortear() {
    this.listaPessoa = this.shuffle(this.listaPessoa);
    //console.log("asd " + this.listaPessoa.length);
    if (this.sortearPor == 'pessoas') {
      let quantidadeTimes = 1;
      //console.log(quantidadeTimes);
      let times = [];
      let pessoasTime = [];
      let listaTime = [];

      let time = { id: '', nome: '' };
      time.id = this.getId(quantidadeTimes);
      time.nome = "Time " + quantidadeTimes;

      for (let x = 0; x < this.listaPessoa.length; x++) {
        if (pessoasTime.length < this.quantidade && this.listaPessoa[x].selecionado == true) {
          pessoasTime.push(this.listaPessoa[x]);
          this.listaPessoa[x].time = time.id;
          if (pessoasTime.length == this.quantidade) {
            listaTime.push(time);
            quantidadeTimes++;
            time = { id: '', nome: '' };
            time.id = this.getId(quantidadeTimes);
            time.nome = "Time " + quantidadeTimes;
            pessoasTime = [];
          }
        } else {
          listaTime.push(time);
          quantidadeTimes++;
          time = { id: '', nome: '' };
          time.id = this.getId(quantidadeTimes);
          time.nome = "Time " + quantidadeTimes;
          pessoasTime = [];
        }
      }
      if (pessoasTime.length > 0) {
        listaTime.push(time);
        pessoasTime = [];
      }

      this.storage.set('listaTime', listaTime).then((val) => {
        this.storage.set('listaPessoa', this.listaPessoa).then((val) => {
          this.buscarTodos();
        });
      });


    } else {
      let listaTime = [];
      let time;
      let quantidadeTimes = 1;
      for (let x = 0; x < this.quantidade; x++) {
        quantidadeTimes = x + 1
        time = { id: '', nome: '' };
        time.id = this.getId(quantidadeTimes);
        time.nome = "Time " + quantidadeTimes;
        listaTime.push(time);
      }
      //  console.log("times :"+ listaTime[0].id)
      let t = -1;
      for (let x = 0; x < this.listaPessoa.length; x++) {
        if (t == this.quantidade - 1) {
          t = 0;
        } else {
          t++;
        }
        //  console.log("t: "+t);
        this.listaPessoa[x].time = listaTime[t].id;

      }
      this.storage.set('listaTime', listaTime).then((val) => {
        this.storage.set('listaPessoa', this.listaPessoa).then((val) => {
          this.buscarTodos();
        });
      });
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
