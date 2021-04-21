import { Injectable } from '@angular/core';
//IMPORT PLATFORM SO WE CAN START ADMOB AS SOON AS IT'S READY.
import { Platform } from '@ionic/angular';
//IMPORT WHAT WE NEED FROM ADMOBFREE PLUGIN.
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
@Injectable({
    providedIn: 'root'
})
export class AdmobService {

    bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true, // Mantenha como true durante os testes.
        autoShow: false,
        id:"ca-app-pub-2148105901377599/6535052751"
        //id: "gerado pelo admob, utilize em produção - para todos os tipos de anúncio é necessário o ID"
    };

    interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: true,
        autoShow: false,
        id:"ca-app-pub-2148105901377599/6571413440"
    };


    RewardVideoConfig: AdMobFreeRewardVideoConfig = {
        isTesting: true,
        autoShow: false
    };

    constructor(
        public platform: Platform,
        private admobFree: AdMobFree
    ) {

        //carregar o anúncio quando a plataforma estiver pronta
        platform.ready().then(() => {
            //BANNER
            this.admobFree.banner.config(this.bannerConfig);
            //INTERSTITIAL
            this.admobFree.interstitial.config(this.interstitialConfig);
            this.admobFree.interstitial.prepare().then(() => {
                console.log('INTERSTIAL LOADED')
            }).catch(e =>
                console.log('PROBLEM LOADING INTERSTITIAL: ', e)
            );
            //REWARD VIDEO
            this.admobFree.rewardVideo.config(this.RewardVideoConfig);
            this.admobFree.rewardVideo.prepare().then(() => {
                console.log('REWARD VIDEO LOADED')
            }).catch(e =>
                console.log('PROBLEM LOADING REWARDVIDEO: ', e)
            );
        });
    }
    showBanner() {
        //verifica e mostra o banner
        this.admobFree.banner.prepare().then(() => {
            console.log('BANNER LOADED')
        }).catch(e =>
            console.log('PROBLEM LOADING BANNER: ', e)
        );
    }
    showInterstitial() {
        //verifica e mostra o interstitial
        this.admobFree.interstitial.isReady().then(() => {

            this.admobFree.interstitial.show().then(() => {
                console.log('INTERSTITIAL LOADED')
            })
                .catch(e => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
        })
            .catch(e => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
    }

    showRewardVideo() {
        //verifica e mostra o vídeo
        this.admobFree.rewardVideo.isReady().then(() => {

            this.admobFree.rewardVideo.show().then(() => {
                console.log('BANNER LOADED')
            })
                .catch(e => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
        })
            .catch(e => console.log('PROBLEM LOADING REWARD VIDEO: ', e));
    }
}
