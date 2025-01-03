import { API_URL } from "../../src/constants/api.constant";

describe('Login Page', () => {
  const mockLoginResponse = {
    user: {
      _id: "676d0cec5085a443b857f9f3",
      username: "admin",
      email: "admin@example.com",
      fullName: "Admin",
      role: "admin",
    },
    access_token: "mock-access-token",
    message: "User logged in successfully",
  };
  const interceptLoginApi = () => {
    cy.intercept("POST", `${API_URL}/auth/login`, (req) => {
      const { username, password } = req.body;
      req.reply(
        username === "admin" && password === "admin"
          ? { statusCode: 201, body: mockLoginResponse }
          : { statusCode: 401, body: { message: "Invalid username or password" } }
      );
    }).as("loginRequest");
  };

  beforeEach(() => {
    interceptLoginApi();
  });

  // check render page
  it('should render the login page', () => {
    cy.visit('localhost:3000/login')
    cy.contains('Login').should('exist');
  });


  //checkrender usernae-input fields
  it('should render the input fields', () => {
    cy.visit('localhost:3000/login')
    cy.get('[data-testid="username"]').should('exist');
  })

  //check render password-input fields
  it('should render the input fields', () => {
    cy.visit('localhost:3000/login')
    cy.get('[data-testid="password"]').should('exist');
  })

  //check render login button
  it('should render the input fields', () => {
    cy.visit('localhost:3000/login')
    cy.get('[data-testid="login-button"]').should('exist');
  })

  // check render form
  it('should render the form', () => {
    cy.visit('localhost:3000/login')
    cy.get('form[data-testid="login-form"]').should("exist");
  })

  //check auto fill username
  it('should fill the username', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="username"]')
      .type('admin')
      .should('have.value', 'admin')
  })

  //check auto fill password
  it('should fill the password', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="password"]')
      .type('admin')
      .should('have.value', 'admin')
  })

  //check donot empty username
  it('should not empty the username', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="username"]')
      .type('admin')
      .should('have.value', 'admin')
  })

  //check donot empty password
  it('should not empty the password', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="password"]')
      .type('admin')
      .should('have.value', 'admin')
  })

  //check onBlur username/password
  it('should onBlur the username', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="username"]').focus().blur({ force: true })
    cy.get('input[name="password"]').focus().blur({ force: true })
  })

  // check login successfully
  it('check response with login api endpoint', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="username"]')
      .type('admin')
      .should('have.value', 'admin')
    cy.get('input[name="password"]')
      .type('admin')
      .should('have.value', 'admin')
    cy.get('form[data-testid="login-form"]').should("exist");
    cy.get('[data-testid="login-button"]').click()
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
    cy.url().should("eq", "http://localhost:3000/user-management");
  })

  //check login failed
  it('check response with login api endpoint', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="username"]')
      .type('admin')
      .should('have.value', 'admin')
    cy.get('input[name="password"]')
      .type('admin1')
      .should('have.value', 'admin1')
    cy.get('form[data-testid="login-form"]').should("exist");
    cy.get('[data-testid="login-button"]').click()
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  })
})