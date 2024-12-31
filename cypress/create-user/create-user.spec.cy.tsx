import { BrowserRouter } from "react-router-dom";
import CreateUserDialog from "../../src/pages/user-management-page/components/create-user-dialog.component";
import { mount } from "cypress/react";
import * as userDataHook from "../../src/hooks/useUserData.hook";
import { UserProvider } from "../../src/pages/user-management-page/context/user-management.context";
import { ReactNode } from 'react';

type ErrorsType = {
    username?: string;
    password?: string;
    email?: string;
    fullName?: string;
    role?: string;
};

type FormData = {
    username: string;
    password: string;
    email: string;
    fullName: string;
    role: string;
};

const TestWrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
        <UserProvider>
            {children}
        </UserProvider>
    </BrowserRouter>
);

describe('CreateUserDialog', () => {
    let mockHandleSubmit: ReturnType<typeof cy.stub>;
    let mockHandleChange: ReturnType<typeof cy.stub>;
    let mockHandleBlur: ReturnType<typeof cy.stub>;
    let mockFormData: FormData;
    let mockErrors: ErrorsType;

    beforeEach(() => {
        mockHandleSubmit = cy.stub().as('handleSubmit');
        mockHandleChange = cy.stub().as('handleChange');
        mockHandleBlur = cy.stub().as('handleBlur');
        mockFormData = {
            username: "",
            password: "",
            email: "",
            fullName: "",
            role: "",
        };
        mockErrors = {
            username: "Username is required",
            password: "Password is required",
            email: "Email is required",
            fullName: "Full name is required",
            role: "Role is required",
        };
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
});