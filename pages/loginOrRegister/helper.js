// import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "@firebase/auth";
// import { initializeApp } from '@firebase/app'

// let isInited = false;

// function _initializeApp () {
//   if (isInited) return;
//   initializeApp({
//     apiKey: 'AIzaSyAAPs6M1L5-wxHlsmyZomRdfuGG6LQT3EE',
//     authDomain: window.location.origin,
//     projectId: 'mystical-button-393414'
//   })
// }

// export function signInWithGoogle () {
//   _initializeApp();
//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result)
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log(token, user);
//       // IdP data available using getAdditionalUserInfo(result)
//       getAdditionalUserInfo(result);
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(error);
//     });
// }

function decode (credential, cbk) {
  if (!credential) throw new Error("the credential is empty");
  const splits = credential.split('.');
  if (splits.length != 3) throw new Error("the credential is invalid");
  const userInfo = JSON.parse(atob(splits[1]));
  const {
    picture = '',
    email = '',
    email_verified: emailVerified = false,
    name = '',
    locale = '',
    family_name: lastName = '',
    given_name: firstName = '',
    sub: googleUniId,
  } = userInfo;
  cbk({ picture, email, emailVerified, name, locale, firstName, lastName, googleUniId });
}

export function initialize (cbk) {
  google.accounts.id.initialize({
    client_id: '480538163833-nuee3720kph3o681njfgjd2ahhj59hkk.apps.googleusercontent.com',
    callback: (credential) => decode(credential?.credential, cbk),
  })
}

export function renderButton (containerEl) {
  google.accounts.id.renderButton(
    containerEl,
    { theme: 'outline', size: 'large' }
  )
} 
