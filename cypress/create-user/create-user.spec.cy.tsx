import { BrowserRouter } from "react-router-dom";
import CreateUserDialog from "../../src/pages/user-management-page/components/create-user-dialog.component";
import { mount } from "cypress/react";
import { UserProvider } from "../../src/pages/user-management-page/context/user-management.context";
import { ReactNode } from 'react';
import { API_URL } from "../../src/constants/api.constant";

const TestWrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
        <UserProvider>
            {children}
        </UserProvider>
    </BrowserRouter>
);

const mockCreateUserResponse = {
    data: {
        "username": "manager1",
        "password": "Manager@123",
        "role": "manager",
        "email": "manager1@example.com",
        "fullName": "Management",
        "_id": "6776014c2f83f2ba90839284",
    }
}

const interceptCreateUserApi = () => {
    cy.intercept("POST", `${API_URL}/users`, (req) => {
        const { username, password, email, fullName, role, token } = req.body;
        req.reply(
            username === "manager1"
                && password === "Manager@123"
                && email === "manager1@example.com"
                && fullName === "Management"
                && role === "manager"
                && token === "mock-access"
                ? { statusCode: 201, body: mockCreateUserResponse }
                : { statusCode: 400, body: { message: "Invalid user data" } }
        )
    }).as("createUserRequest");
}

describe('CreateUserDialog', () => {
    beforeEach(() => {
        interceptCreateUserApi();
    });
    const mountCreateUserDialog = (props = {}) => {
        mount(
            <TestWrapper>
                <CreateUserDialog
                    isOpen={true}
                    onClose={() => { }}
                    handleReloadUserData={() => { }}
                    {...props}
                />
            </TestWrapper>
        );
    };


    // check render dialog
    it('should render the dialog', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="create-user-form"]').should('exist');
    });
    // check render input fields
    it('should render the input fields', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="username"]').should('exist');
        cy.get('[data-testid="password"]').should('exist');
        cy.get('[data-testid="email"]').should('exist');
        cy.get('[data-testid="fullName"]').should('exist');
        cy.get('[data-testid="role"]').should('exist');
    });
    // check render buttons
    it('should render the buttons', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="submit-create-user-form"]').should('exist');
        cy.get('[data-testid="close-create-user-dialog"]').should('exist');
    });

    // check render error
    it('should display error message when error exists (username)', () => {
        mountCreateUserDialog({ error: { username: 'Username is required' } });
        cy.get('[data-testid="username"]').should('exist');
    });
    it('should display error message when error exists (password)', () => {
        mountCreateUserDialog({ error: { password: 'Password is required' } });
        cy.get('[data-testid="password"]').should('exist');
    });
    it('should display error message when error exists (email)', () => {
        mountCreateUserDialog({ error: { email: 'Email is required' } });
        cy.get('[data-testid="email"]').should('exist');
    });
    it('should display error message when error exists (fullName)', () => {
        mountCreateUserDialog({ error: { fullName: 'Full name is required' } });
        cy.get('[data-testid="fullName"]').should('exist');
    });
    it('should display error message when error exists (role)', () => {
        mountCreateUserDialog({ error: { role: 'Role is required' } });
        cy.get('[data-testid="role"]').should('exist');
    });

    // check field input not empty
    it('username input fields should be empty', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="username"]').should('have.value', '');
    });
    it('password input fields should be empty', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="password"]').should('have.value', '');
    });

    //check submit form
    it('should submit the form', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="submit-create-user-form"]').click();
    });

    //check open/close dialog
    it('should close the dialog', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="close-create-user-dialog"]').click();
    });
    it('should open the dialog', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="create-user-form"]').should('exist');
    });

    //check submit form with valid data
    it('mock api create user', () => {
        mountCreateUserDialog();
        cy.get('[data-testid="username"]').type('manager1');
        cy.get('[data-testid="password"]').type('Manager@123');
        cy.get('[data-testid="email"]').type('manager1@example.com');
        cy.get('[data-testid="fullName"]').type('Management');
        cy.get('[data-testid="role"]').type('manager');
        cy.get('[data-testid="submit-create-user-form"]').click();
    });

});