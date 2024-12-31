import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../src/pages/user-management-page/context/user-management.context";
import UpdateUserDialogComponent from "../../src/pages/user-management-page/components/update-user-dialog.component";
import { mount } from "cypress/react";

type ErrorsType = {
    username?: string;
    email?: string;
    fullName?: string;
    role?: string;
};

type FormData = {
    username: string;
    email: string;
    fullName: string;
    role: string;
};

const UpdateUserWrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
        <UserProvider>
            {children}
        </UserProvider>
    </BrowserRouter>
);

describe("UpdateUserDialog", () => {
    const mountUpdateUserDialog = (props = {}) => {
        mount(
            <UpdateUserWrapper>
                <UpdateUserDialogComponent
                    isOpen={true}
                    onClose={() => { }}
                    userId="1"
                    handleReloadUserData={() => { }}
                    {...props}
                />
            </UpdateUserWrapper>
        );
    }

    //check render form
    it('should render the dialog', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="update-user-form"]').should('exist');
    });
    it('should render the input (username)', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="username"]').should('exist');
    });
    it('should render the input (fullName)', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="fullName"]').should('exist');
    });
    it('should render the input (email)', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="email"]').should('exist');
    });
    it('should render the select (role)', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="role"]').should('exist');
    });

    //check render action buttons in dialog
    it('should render the buttons (submit button)', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="submit-update-user-form"]').should('exist');
    });
    it('should render the buttons (close button)', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="close-update-user-dialog"]').should('exist');
    });

    //check render error message
    it('should display error message when error exists (username)', () => {
        mountUpdateUserDialog({ error: { username: 'Username is required' } });
        cy.get('[data-testid="username"]').should('exist');
    });
    it('should display error message when error exists (email)', () => {
        mountUpdateUserDialog({ error: { email: 'Email is required' } });
        cy.get('[data-testid="email"]').should('exist');
    })
    it('should display error message when error exists (fullName)', () => {
        mountUpdateUserDialog({ error: { fullName: 'Full name is required' } });
        cy.get('[data-testid="fullName"]').should('exist');
    });
    it('should display error message when error exists (role)', () => {
        mountUpdateUserDialog({ error: { role: 'Role is required' } });
        cy.get('[data-testid="role"]').should('exist');
    });

    //check input do not empty
    it('should display error message when error exists (username)', () => {
        mountUpdateUserDialog({ error: { username: 'Username is required' } });
        cy.get('[data-testid="username"]').should('have.value', '');
    });
    it('should display error message when error exists (email)', () => {
        mountUpdateUserDialog({ error: { email: 'Email is required' } });
        cy.get('[data-testid="email"]').should('have.value', '');
    });
    it('should display error message when error exists (fullName)', () => {
        mountUpdateUserDialog({ error: { fullName: 'Full name is required' } });
        cy.get('[data-testid="fullName"]').should('have.value', '');
    });
    it('should display error message when error exists (role)', () => {
        mountUpdateUserDialog({ error: { role: 'Role is required' } });
        cy.get('[data-testid="role"]').should('have.value', '');
    });

    //check open/close dialog 
    it('should submit the form', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="submit-update-user-form"]').click();
    });
    it('should close the dialog', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="close-update-user-dialog"]').click();
    });

    //check onChange event
    it('should handle username input change', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="username"] input')
            .type('newusername')
            .should('have.value', 'newusername');
    });

    it('should handle email input change', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="email"] input')
            .type('test@email.com')
            .should('have.value', 'test@email.com');
    });

    it('should handle fullName input change', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="fullName"] input')
            .type('Test User')
            .should('have.value', 'Test User');
    });

    //check onBlur event
    it('should handle username input blur', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="username"] input').focus().blur();
    });
    it('should handle email input blur', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="email"] input').focus().blur();
    });
    it('should handle fullName input blur', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="fullName"] input').focus().blur();
    });
    it('should handle role select blur', () => {
        mountUpdateUserDialog();
        cy.get('[data-testid="role"]').click()
    });
});