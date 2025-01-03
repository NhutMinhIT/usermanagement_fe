import { API_URL } from "../../src/constants/api.constant";

describe('My First Test', () => {
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

  it('Gets, types and asserts', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[name="username"]')
      .type('admin')
      .should('have.value', 'admin')
    cy.get('input[name="password"]')
      .type('admin')
      .should('have.value', 'admin')
    cy.get('form[data-testid="login-form"]').should("exist");
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
  })

  // check login failed
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