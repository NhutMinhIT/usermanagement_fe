import { API_URL } from "../../src/constants/api.constant";

describe('User Management Page', () => {
    const mockUserList = {
        data: [
            {
                _id: "676d0cec5085a443b857f9f3",
                username: "admin",
                password: "$2b$10$52sGG4GyCZrklkf8sHf5wO4uGiayhM2u6fztC6c7fy8fMRrntkohe",
                role: "admin",
                email: "admin@example.com",
                fullName: "Admin",
                __v: 0,
            },
            {
                _id: "6776014c2f83f2ba90839284",
                username: "manager122",
                password: "Manager@123",
                role: "manager",
                email: "manager122@example.com",
                fullName: "Management",
                __v: 0,
            },
        ],
        total: 2,
        page: 1,
        limit: 10,
    };

    const setupMocks = () => {
        // Mock login to return an access token
        cy.intercept('POST', `${API_URL}/auth/login`, {
            statusCode: 201,
            body: { access_token: "mocked_access_token" },
        }).as('loginRequest');

        // Mock /users endpoint with mocked token
        cy.intercept('GET', `${API_URL}/users`, (req) => {
            if (req.headers.authorization === 'Bearer mocked_access_token') {
                req.reply({ statusCode: 200, body: mockUserList });
            }
        }).as('userListRequest');
    };

    beforeEach(() => {
        cy.session('user', () => {
            setupMocks();
            cy.visit('/login');
            cy.get('input[name="username"]')
                .type('admin')
                .should('have.value', 'admin')
            cy.get('input[name="password"]')
                .type('admin')
                .should('have.value', 'admin')
            cy.get('form[data-testid="login-form"]').should("exist");
            cy.get('[data-testid="login-button"]').click()
            cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
        });
    });
});
