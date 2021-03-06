// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false
  ,name: 'Development'
  ,firebaseConfig: {
		apiKey: "AIzaSyAKgwMNzJIvYeNJEy99g9sbKint6DyCv_s",
		authDomain: "accounting-hub.firebaseapp.com",
		databaseURL: "https://accounting-hub.firebaseio.com",
		storageBucket: "",
		messagingSenderId: "981147796796",
		/*apiKey: "YOUR_DEV_API_KEY",
		 authDomain: "YOUR_DEV_PROJECT_ID.firebaseapp.com",
		 databaseURL: "https://YOUR_DEV_PROJECT_ID.firebaseio.com",
		 storageBucket: "YOUR_DEV_PROJECT_ID.appspot.com",
		 messagingSenderId: "YOUR_DEV_MESSAGE_ID"*/
  }
};
