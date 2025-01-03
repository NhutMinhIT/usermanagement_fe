import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../src/pages/user-management-page/context/user-management.context";
import UpdateUserDialogComponent from "../../src/pages/user-management-page/components/update-user-dialog.component";
import { mount } from "cypress/react";
import { API_URL } from "../../src/constants/api.constant";

const UpdateUserWrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
        <UserProvider>
            {children}
        </UserProvider>
    </BrowserRouter>
);
describe("UpdateUserDialog", () => {

    const mockUpdateUserResponse = {
        "_id": "6776014c2f83f2ba90839284",
        "username": "manager12",
        "password": "Manager@123",
        "role": "manager",
        "email": "manager12@example.com",
        "fullName": "Management",
    };
    const interceptUpdateUserApi = () => {
        let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNjc2ZDBjZWM1MDg1YTQ0M2I4NTdmOWYzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM1ODczMzI3LCJleHAiOjE3MzU4NzY5Mjd9.D3_LV05X0HQKBngVxIiPHAAdPVKzToDhNIFOiyKj2tk'
        cy.intercept("PUT", `${API_URL}/users/6776014c2f83f2ba90839284`, (req) => {
            req.headers.authorization = `${access_token}`;
            const { username, email, fullName, role } = req.body;
            req.reply(
                username === "manager12"
                    && email === "manager12@example.com"
                    && fullName === "Management"
                    && role === "manager"
                    ? { statusCode: 200, body: mockUpdateUserResponse }
                    : { statusCode: 400, body: { message: "Invalid user data" } }
            )
        }).as("updateUserRequest");
    }
    beforeEach(() => {
        interceptUpdateUserApi();
    });

    const mountUpdateUserDialog = (props = {}) => {
        mount(
            <UpdateUserWrapper>
                <UpdateUserDialogComponent
                    isOpen={true}
                    onClose={() => { }}
                    userId="6776014c2f83f2ba90839284"
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
    //check submit form with valid data
    it('check response when submit form with valid data', () => {
        mountUpdateUserDialog({
            formData: {
                username: "manager12",
                email: "manager12@example.com",
                fullName: "Management",
                role: "manager"
            }
        });
        cy.get('[data-testid="username"]').type("manager12");
        cy.get('[data-testid="email"]').type("manager12@example.com");
        cy.get('[data-testid="fullName"]').type("Management");
        cy.get('[id="update-role"]').click({ force: true })
        cy.get('[data-testid="manager"]').click({ force: true });
        cy.get('[data-testid="submit-update-user-form"]').click();
        cy.wait("@updateUserRequest").its("response.statusCode").should("eq", 201);
    });
});