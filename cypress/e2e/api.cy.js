describe('api flow', () => {

  const username = "macedo.araujo"
  const password = "Accenture0!"
  let userID = ""
  let books = []
  let token = ""

  it('create user', () => {
    cy.request({
      method: "post",
      url: "https://demoqa.com/Account/v1/User",
      body: {
        "userName": username,
        "password": password
      }
    }).then((response) => {
      userID = response.body.userID;
      expect(response.status).to.equals(201);
      expect(response.body).to.have.property('userID');
    })
  })

  it('generate access token', () => {
    cy.request({
      method: "post",
      url: "https://demoqa.com/Account/v1/GenerateToken",
      body: {
        "userName": username,
        "password": password
      }
    }).then((response) => {
      token = response.body.token;
      expect(response.status).to.equals(200);
    })
  })

  it('verify authorized user', () => {
    cy.request({
      method: "post",
      url: "https://demoqa.com/Account/v1/Authorized",
      body: {
        "userName": username,
        "password": password
      }
    }).then((response) => {
      expect(response.status).to.equals(200);
    })
  })

  it('List avaliable books', () => {
    cy.request({
      method: "get",
      url: "https://demoqa.com/BookStore/v1/Books",
    }).then((response) => {
      books = response.body.books
      expect(response.status).to.equals(200);
      expect(response.body).to.have.property('books');
    })
  })

  it('rent first book', () => {
    cy.request({
      method: "post",
      url: "https://demoqa.com/BookStore/v1/Books",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: {
        "userId": userID,
        "collectionOfIsbns": [
          {
            "isbn": "9781449331818"
          }
        ]
      }
    }).then((response) => {
      expect(response.status).to.equals(201);
      expect(response.body).to.have.property('books');
    })
  })

  it('rent another book', () => {
    cy.request({
      method: "post",
      url: "https://demoqa.com/BookStore/v1/Books",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token // Não documentado a necessidade nem a sintaxe do token, verificar documentação da api pra possivel atualização
      },
      body: {
        "userId": userID,
        "collectionOfIsbns": [
          {
            "isbn": "9781449365035"
          }
        ]
      }
    }).then((response) => {
      expect(response.status).to.equals(201);
      expect(response.body).to.have.property('books');
    })
  })

  it('show user data', () => {
    cy.request({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      url: "https://demoqa.com/Account/v1/User/" + userID,
    }).then((response) => {
      expect(response.status).to.equals(200);
      expect(response.body).to.have.property('books');
    })
  })
})