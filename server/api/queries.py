import logging
from typing import Optional
from sqlalchemy import desc, func
from ariadne import convert_kwargs_to_snake_case
from api.models import Posts
from api import db
import base64

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


def _encode_cursor(a: int) -> str:
    return base64.b64encode(str(a).encode()).decode()


def _decode_cursor(cursor: str) -> int:
    return int(base64.b64decode(cursor).decode())


def listPosts_resolver(obj, info, cursor: Optional[str], limit: int = 10):
    max_index = db.session.query(func.max(Posts.id)).scalar()
    if max_index is None:
        max_index = 0
    start_ind = _decode_cursor(cursor) if cursor is not None else max_index
    first_page = start_ind > (max_index - limit)

    end_ind = start_ind - limit
    records = (
        Posts.query.where(Posts.id <= start_ind)
        .where(Posts.id > end_ind)
        .order_by(desc(Posts.id))
    )
    posts = [post.to_dict() for post in records]
    payload = dict(
        edges=[
            dict(
                node=post,
                cursor=_encode_cursor(post["id"]),
            )
            for post in posts
        ],
        pageInfo=dict(
            hasNextPage=(end_ind >= 0),
            hasPreviousPage=(not first_page),
            startCursor=_encode_cursor(start_ind),
            endCursor=_encode_cursor(max(0, end_ind)),
        ),
    )
    return payload


@convert_kwargs_to_snake_case
def getPost_resolver(obj, info, id):
    try:
        post = Posts.query.get(id)
        payload = {"success": True, "post": post.to_dict()}
    except AttributeError:  # todo not found
        payload = {"success": False, "errors": [f"Post item matching {id} not found"]}
    return payload
