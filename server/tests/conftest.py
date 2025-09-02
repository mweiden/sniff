import os
import sys
import pytest
from datetime import datetime
import pytz

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
sys.path.append(BASE_DIR)

os.environ["DATABASE_URI"] = "sqlite:///:memory:"
os.chdir(BASE_DIR)

from api import db
import app as app_module

app = app_module.app


@pytest.fixture
def client():
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()


@pytest.fixture
def add_post():
    def _add(title="title", body="body"):
        from api.models import Posts
        post = Posts(title=title, body=body, created_at=datetime.now(pytz.timezone("America/Los_Angeles")))
        db.session.add(post)
        db.session.commit()
        return post
    return _add
