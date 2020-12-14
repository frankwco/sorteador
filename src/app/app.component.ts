import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  lastTimeBackPress = 0;
timePeriodToExit = 2000;

@ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
  ) {
    this.statusBar.backgroundColorByHexString('#FF8800');
    this.initializeApp();

    this.backButtonEvent();
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url != '/tabs/tab1') {
          await this.router.navigate(['/tabs/tab1']);
        } else if (this.router.url === '/tabs/tab1') {
          //  alert(new Date().getTime() - this.lastTimeBackPress + " - " + this.timePeriodToExit);
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp(); //Exit from app
          } else {
            navigator['app'].exitApp();
            //ESTE CÓDIGO ABAIXO EXIGE QUE O USUÁRIO APERTE DUAS VEZES NO BACKBUTTON PARA SAIR DO APP.
            //É NECESSÁRIO RETIRAR A LINHA ACIMA TAMBÉM
            /*let toast = await this.toastCtrl.create({
                     message: 'Precione novamente para sair do APP',
                     duration: 3000,
                     position: 'bottom'
                   });
                   toast.present();
            this.lastTimeBackPress = new Date().getTime();*/
          }
        }
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
