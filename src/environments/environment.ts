// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseAPIKey: 'AIzaSyDfkpuKQNTuZTcY0K0uNApLwM7yxR56qWc'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/*
Deploy Angular App
1. use a server that will serve static content
2. npm install -g firebase-tools
3. firebase login
4. firebase init (select with space)
5. What do you want to use as your public directory? dist/recipe
6. ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
7. File dist/recipe/index.html already exists. Overwrite? No

https://console.firebase.google.com/project/github-fight-6a33a/overview
https://github-fight-6a33a.firebaseapp.com
Server Routing vs Browser Routing
https://academind.com/learn/angular/angular-q-a/#how-to-fix-broken-routes-after-deployment
*/
