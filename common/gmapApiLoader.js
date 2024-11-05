import { Loader } from "@googlemaps/js-api-loader";

export function gmapApiLoader (apiKey, language) {
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
