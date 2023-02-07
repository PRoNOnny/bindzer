// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'bindzer',
    appId: '1:414938506685:web:50ba485e729b6b00429ed4',
    databaseURL: 'https://bindzer-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'bindzer.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyDsp3LTS_zpbLpdSU89aIYmv6N6M6DVj_g',
    authDomain: 'bindzer.firebaseapp.com',
    messagingSenderId: '414938506685',
    measurementId: 'G-QJH1LELNZ7',
  },
  sweetClass: {
    title: 'title-sweet',
    htmlContainer: 'html-sweet',
    confirmButton: 'confirm-sweet',
    cancelButton: 'cancel-sweet',
    popup: 'popup-sweet',
    closeButton: 'close-sweet',
    icon: 'icon-sweet',
    actions: 'action-sweet'
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
