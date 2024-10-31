import { Loader } from "@googlemaps/js-api-loader";

const apiKey = 'AIzaSyA3QgWpLKDZBdJfB5GAZHSPva1NGf1igGk';

export function gmapApiLoader (language) {
  if (window.google?.maps?.places) return;
  const loader = new Loader({
    apiKey,
    language,
    libraries: ["places"],
    authReferrerPolicy: "origin",
  });
  return loader.importLibrary('places')
  //  .then(lib => sdk.set(AsyncData.Done(lib)))
  //  .catch(console.error)
}
