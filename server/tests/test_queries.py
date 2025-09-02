def test_list_posts(client, add_post):
    add_post("First", "Body1")
    add_post("Second", "Body2")
    query = """
        query {
          listPosts(cursor: null, limit: 10) {
            edges { node { id title body } }
            pageInfo { hasNextPage hasPreviousPage }
          }
        }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    data = response.get_json()["data"]["listPosts"]["edges"]
    assert len(data) == 2
    titles = [edge["node"]["title"] for edge in data]
    assert titles == ["Second", "First"]


def test_get_post(client, add_post):
    post = add_post("Single", "Body")
    query = """
      query($id: ID!){
        getPost(id: $id){
          success
          post { id title body }
        }
      }
    """
    response = client.post("/graphql", json={"query": query, "variables": {"id": post.id}})
    assert response.status_code == 200
    payload = response.get_json()["data"]["getPost"]
    assert payload["success"] is True
    assert payload["post"]["title"] == "Single"
