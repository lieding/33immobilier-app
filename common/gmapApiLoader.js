import { Loader } from "@googlemaps/js-api-loader";

const gmapApiKey = process.env['IMMO_GOOGLE_MAPS_API_KEY'];

export function gmapApiLoader (language) {
  if (window.google?.maps?.places || !process.client) return Promise.resolve();
  const loader = new Loader({
    apiKey: gmapApiKey,
    language,
    libraries: ["places"],
    authReferrerPolicy: "origin",
  });
  return loader.importLibrary('places')
  //  .then(lib => sdk.set(AsyncData.Done(lib)))
  //  .catch(console.error)
}
