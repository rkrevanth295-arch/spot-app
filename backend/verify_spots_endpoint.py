from starlette.testclient import TestClient
from app.main import app

client = TestClient(app)
response = client.get('/spots/')
print('status', response.status_code)
try:
    data = response.json()
    print('body length', len(data))
    if data:
        print('first spot keys', list(data[0].keys()))
except Exception as exc:
    print('json error', exc)
    print(response.text)
