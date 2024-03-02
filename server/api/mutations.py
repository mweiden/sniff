from datetime import datetime
import pytz
from ariadne import convert_kwargs_to_snake_case
from api import db
from api.models import Posts

LA_TIMEZONE = pytz.timezone("America/Los_Angeles")


@convert_kwargs_to_snake_case
def createPost_resolver(obj, info, title, body):
    post = Posts(title=title, body=body, created_at=datetime.now(tz=LA_TIMEZONE))
    db.session.add(post)
    db.session.commit()
    payload = {"success": True, "post": post.to_dict()}
    return payload


@convert_kwargs_to_snake_case
def updatePost_resolver(obj, info, id, title, body):
    try:
        post = Posts.query.get(id)
        if post:
            post.title = title
            post.body = body
        db.session.add(post)
        db.session.commit()
        payload = {"success": True, "post": post.to_dict()}
    except AttributeError:  # todo not found
        payload = {"success": False, "errors": ["item matching id {id} not found"]}
    return payload


@convert_kwargs_to_snake_case
def deletePost_resolver(obj, info, id):
    try:
        post = Posts.query.get(id)
        db.session.delete(post)
        db.session.commit()
        payload = {"success": True, "post": post.to_dict()}
    except AttributeError:
        payload = {"success": False, "errors": ["Not found"]}
    return payload
