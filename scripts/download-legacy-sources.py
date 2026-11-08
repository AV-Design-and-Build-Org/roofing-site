"""Recover the inventoried legacy sources using existing Vercel authentication."""
import base64, concurrent.futures, hashlib, json, pathlib, subprocess

root = pathlib.Path(__file__).resolve().parents[1] / 'archive-source'
rows = json.loads((root / 'manifest.json').read_text())
files = {f['uid']: (r['id'], f['path']) for r in rows for f in r['files']}
(root / 'blobs').mkdir(exist_ok=True)

def recover(item):
    uid, (deployment, path) = item
    target = root / 'blobs' / uid
    if target.exists() and hashlib.sha1(target.read_bytes()).hexdigest() == uid:
        return None
    response = subprocess.run(['vercel', 'api', f'/v8/deployments/{deployment}/files/{uid}?teamId=team_RoXSQAXbn66dqjzf41vx7VBN'], capture_output=True)
    if response.returncode:
        return {'path': path, 'error': response.stderr.decode()[-200:]}
    try:
        data = base64.b64decode(json.loads(response.stdout)['data'])
        assert hashlib.sha1(data).hexdigest() == uid, 'Checksum mismatch'
        target.write_bytes(data)
    except Exception as error:
        return {'path': path, 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    errors = [result for result in pool.map(recover, files.items()) if result]
print(json.dumps({'files': len(files), 'errors': errors}))
if errors:
    raise SystemExit(1)
