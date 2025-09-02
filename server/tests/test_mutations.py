
def test_create_post(client):
    mutation = """
      mutation($title: String!, $body: String!){
        createPost(title: $title, body: $body){
          success
          post { id title body }
        }
      }
    """
    response = client.post("/graphql", json={"query": mutation, "variables": {"title": "New", "body": "Entry"}})
    assert response.status_code == 200
    payload = response.get_json()["data"]["createPost"]
    assert payload["success"] is True
    assert payload["post"]["title"] == "New"


def test_update_post(client, add_post):
    post = add_post("Old", "Body")
    mutation = """
      mutation($id: ID!, $title: String, $body: String){
        updatePost(id: $id, title: $title, body: $body){
          success
          post { id title body }
        }
      }
    """
    variables = {"id": post.id, "title": "Updated", "body": "New body"}
    response = client.post("/graphql", json={"query": mutation, "variables": variables})
    assert response.status_code == 200
    payload = response.get_json()["data"]["updatePost"]
    assert payload["success"] is True
    assert payload["post"]["title"] == "Updated"


def test_delete_post(client, add_post):
    post = add_post("Title", "Body")
    mutation = """
      mutation($id: ID!){
        deletePost(id: $id){
          success
          post { id }
        }
      }
    """
    response = client.post("/graphql", json={"query": mutation, "variables": {"id": post.id}})
    assert response.status_code == 200
    payload = response.get_json()["data"]["deletePost"]
    assert payload["success"] is True
    query = """
      query($id: ID!){
        getPost(id: $id){
          success
        }
      }
    """
    verify = client.post("/graphql", json={"query": query, "variables": {"id": post.id}})
    assert verify.get_json()["data"]["getPost"]["success"] is False
