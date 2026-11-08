# Rise Roofing legacy preservation

Existing Vercel project: `roofing-site` (`prj_1B5LmepShGdtvnovvgVLHyi9DcLa`), team `team_RoXSQAXbn66dqjzf41vx7VBN`.

The archive is a separate preview deployment in this same project. Do not promote it or point production domains to it. The current production deployment and the live marketing/attendance application are deliberately unchanged. Merging this PR can trigger the connected production Git integration; it therefore remains open until a separately approved production release.

## Preserved versions

- `riseroofingav`: `dpl_BScWjLP9Zw1grUqHMiJ9VbbJVF5X`. Its old URL returns 404; all 60 recoverable application/config/public source files were retrieved through the authorized Vercel API and checked against their SHA-1 file IDs.
- `riseroofingav-deploy`: `dpl_HTjjqgXd1yQso9qj2gRWTFXnToFd`. Its 60 application/config/public source files are byte-for-byte identical to the first project's files.

The ten public pages rendered by the second deployment are retained for both source-identical versions, together with their original compiled CSS, fonts, and public images. These are recovered historical pages, not a new interpretation of their design. The old 404 deployment's gallery rendering comes from the source-identical working deployment; it is not claimed as a recovered HTTP response from the failed URL.

Environment files, attendance records, temporary design files, credentials, and provider settings are not copied into the public gallery. Recovered application source stays in `archive-source/` in this private repository. Only the generated static archive is uploaded for the gallery deployment.

Original Next.js hydration and server actions are intentionally omitted from historical public pages. Ordinary internal navigation and native details controls remain; phone/external links, forms, and access to attendance/admin are disabled inside sandboxed frames. This gallery does not run the old backend or contact customers.

## Rebuild and validation

```
node scripts/build-legacy-gallery.mjs
node --test scripts/legacy-gallery.test.mjs
```

`scripts/download-legacy-sources.py` can recover the source blobs while the old deployments still exist, using existing Vercel CLI authentication. All blobs are retained so rebuilding the gallery will continue to work after the old projects are removed.

Use the separate `legacy-preview.vercel.json` only for the archive preview. Do not modify the root `vercel.json`, live source, production project settings, or domain aliases as part of this cleanup.
