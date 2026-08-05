# factory.syrava.com Deployment

## Build

```bash
npm ci
npm test
npm run validate
npm run build
```

Publish `apps/website/dist`.

## DNS

Create:

```text
Type: CNAME
Name: factory
Target: the selected hosting provider target
```

Keep the record DNS-only until the provider verifies the hostname and provisions TLS.

## Environment

The public static website requires no secrets.

`GH_TOKEN` is required only for the catalog synchronization command and must never be exposed to the browser build.
