# DaFishieSG

Mobile-first Singapore fishing directory using Leaflet 1.9.4 and OpenStreetMap. Static HTML, CSS and JavaScript; no API keys, build step or runtime dependencies.

## Develop

Use Node 24 for `npm test`. Run `npm start` with Python 3 installed to serve on port 8000. Geolocation requires HTTPS or localhost and user permission. Position stays in device memory; it is not stored or sent to an application server. OpenStreetMap receives tile requests and normal request metadata. Distances are straight-line distances to approximate pins.

## Publish

In repository Settings → Pages, select **GitHub Actions** as the source. Push to `main` or run the Deploy GitHub Pages workflow. It runs tests and publishes public assets only. Relative asset URLs support the `/dafishiesg/` project path. Local development does not publish the site.

## Data and legal accuracy

`locations.js` contains a small starter set of known designated PUB/NParks fishing locations. All coordinates are approximate navigation references. Reservoir pins are general reference points, not permitted fishing positions. No verified legal-zone polygons or shoreline permissions are claimed.

Live verification of official pages was blocked by the development environment network policy. Records have `sourceVerifiedAt: null`; the UI shows source recheck pending. Review official sources and current signs before relying on a location. This is not a comprehensive directory. Do not infer every beach, park or reservoir is open for fishing.

Before marking a future zone verified, record its exact official source, review date, boundary provenance and current restrictions. Never derive a legal zone from a pin, radius, park extent or reservoir outline. Keep approximate pins and verified boundaries visually distinct. Recheck closures and links regularly.

## Validation and credits

`npm test` covers record constraints, search, combined filters, empty results and distance sorting. Browser checks cover narrow screens, popups, geolocation outcomes and tile failure. The directory remains usable without tiles.

Leaflet assets are vendored from `leaflet@1.9.4`; license: `vendor/LICENSE`. OpenStreetMap attribution remains visible. Follow the OpenStreetMap tile usage policy; no bulk download or offline tile prefetching.
