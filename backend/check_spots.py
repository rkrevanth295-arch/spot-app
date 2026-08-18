from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
try:
    res = client.get('/spots/')
    print('STATUS', res.status_code)
    print('BODY', res.text)
except Exception as e:
    import traceback
    traceback.print_exc()
