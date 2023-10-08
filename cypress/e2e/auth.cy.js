describe('Funcionalidad de login', () => {
  it('Mi aplicación carga leyendo Home en /', () => {
    // 1). Arrange: Setup del estado de mi aplicación
    cy.visit('/')
    // 2). Act: Interactuar con la aplicación
    cy.get('h1').contains('Home') // 3). Assert: Espero un resultado
  })

  it('Probar el login como CUSTOMER', () => {
    // INTERCEPTOR LO USO PARA SABER CUANDO UNA LLAMADA A LA API ES RESUELTA
    // Y PUEDO ESPERARLA EN OTRO MOMENTO USANDO AWAIT ('@login')

    cy.intercept('POST', 'https://ecommerce-json-jwt.onrender.com/login').as('login') // le damos un nombre o sobrenombre

    // 1). Arrange: Setup del estado de mi aplicación
    cy.visit('/login')
    // 2). Act: Interactuar con la aplicación
    // cy.get('input[name="email"]').type('drstrange@marvel.com')
    // cy.get('input[name="password"]').type('multiverso')
    // cy.get('button[type="submit"]').click()

    cy.doLogin('drstrange@marvel.com', 'multiverso')

    cy.wait('@login')
    cy.get('h1').contains('Home') // 3). Assert: Espero un resultado

    // SI EL TIEMPO DE RESPUESTA ES SUPERIOR A LOS 4000 MILISEGUNDOS, PODEMOS TENER UN ERROR
    // CYPRESS TENEMOS ALGO QUE SE LLAMA INTERCEPTORS
  })

  it('Cuando haga Logout como Admin me lleve a la página de Home', () => {
    cy.intercept('POST', 'https://ecommerce-json-jwt.onrender.com/login').as('login')
    // 1). Arrange: Setup del estado de mi aplicación
    cy.visit('/login')
    // 2). Act: Interactuar con la aplicación
    // cy.get('input[name="email"]').type('superman@dc.com')
    // cy.get('input[name="password"]').type('superman')
    // cy.get('button[type="submit"]').click()
    cy.doLogin('drstrange@marvel.com', 'multiverso')

    cy.wait('@login')
    cy.get('h1').contains('Home') // 3). Assert: Espero un resultado
  })
})
