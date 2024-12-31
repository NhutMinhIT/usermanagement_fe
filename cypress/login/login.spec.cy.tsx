import { mount } from "cypress/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../src/pages/login-page/components/form-login.component";

interface FormData {
    username: string;
    password: string;
}

interface Errors {
    username?: string;
    password?: string;
}

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
);

describe('LoginForm', () => {
    let mockHandleSubmit: ReturnType<typeof cy.stub>;
    let mockHandleChange: ReturnType<typeof cy.stub>;
    let mockHandleBlur: ReturnType<typeof cy.stub>;
    let mockFormData: FormData;
    let mockErrors: Errors;

    beforeEach(() => {
        mockHandleSubmit = cy.stub().as('handleSubmit');
        mockHandleChange = cy.stub().as('handleChange');
        mockHandleBlur = cy.stub().as('handleBlur');
        mockFormData = {
            username: "",
            password: "",
        };
        mockErrors = {
            username: "Username is required",
            password: "Password is required",
        };
    });

    const mountLoginForm = (props = {}) => {
        mount(
            <RouterWrapper>
                <LoginForm
                    isLoading={false}
                    formData={mockFormData}
                    error={{}}
                    touched={{}}
                    handleSubmit={mockHandleSubmit}
                    handleChange={mockHandleChange}
                    handleBlur={mockHandleBlur}
                    {...props}
                />
            </RouterWrapper>
        );
    };

    //check render form
    it('should render the form', () => {
        mountLoginForm();

        cy.get('form[data-testid="login-form"]').should('exist');
    });
    //check render input field
    it("should maintain form state during route changes", () => {
        const testData: FormData = {
            username: "testuser",
            password: "testpass"
        };
        mountLoginForm({ formData: testData });

        cy.get('input[name="username"]').should('have.value', testData.username);
        cy.get('input[name="password"]').should('have.value', testData.password);
    });

    //check render error
    it("should clear errors when input changes", () => {
        mountLoginForm({ error: mockErrors });
        cy.get('input[name="username"]').type("newuser");
        cy.get('[data-testid="username-error"]').should('not.exist');
    });

    // check all field do not empty
    it("username do not emptry", () => {
        mountLoginForm({ error: mockErrors });
        cy.get('input[name="username"]').should('have.value', '');
    });
    it("password do not emptry", () => {
        mountLoginForm({ error: mockErrors });
        cy.get('input[name="password"]').should('have.value', '');
    });

    //check onBlur event
    it("should call handleBlur when input is blurred (username)", () => {
        mountLoginForm();
        cy.get('input[name="username"]').focus().blur();
        cy.get('@handleBlur').should('have.been.called');
    });
    it("should call handleBlur when input is blurred (password)", () => {
        mountLoginForm();
        cy.get('input[name="password"]').focus().blur();
        cy.get('@handleBlur').should('have.been.called');
    });

    //check onChange event
    it("should call handleChange when input is changed (username)", () => {
        mountLoginForm();
        cy.get('input[name="username"]').type('testuser');
        cy.get('@handleChange').should('have.been.called');
    });
    it("should call handleChange when input is changed (password)", () => {
        mountLoginForm();
        cy.get('input[name="password"]').type('testpass');
        cy.get('@handleChange').should('have.been.called');
    });

    // check user can remove data at input field
    it("should clear input when clear button is clicked (username)", () => {
        mountLoginForm();
        cy.get('input[name="username"]').type('testuser').clear();
        cy.get('input[name="username"]').should('have.value', '');
    });
    it('should clear input when clear button is clicked (password)', () => {
        mountLoginForm();
        cy.get('input[name="password"]').type('testpass').clear();
        cy.get('input[name="password"]').should('have.value', '');
    });

    //check auto fill data at input field
    it('should auto fill input when data is provided (username)', () => {
        mountLoginForm({ formData: { username: 'testuser' } });
        cy.get('input[name="username"]').should('have.value', 'testuser');
    });
    it('should auto fill input when data is provided (password)', () => {
        mountLoginForm({ formData: { password: 'testpass' } });
        cy.get('input[name="password"]').should('have.value', 'testpass');
    });

    //check error message
    it('should display error message when error exists (username)', () => {
        mountLoginForm({ error: { username: 'Username is required' } });
        cy.get('[data-testid="username"]').should('exist');
    });
    it('should display error message when error exists (password)', () => {
        mountLoginForm({ error: { password: 'Password is required' } });
        cy.get('[data-testid="password"]').should('exist');
    });
    // it("should call handleSubmit when the form is submitted", () => {
    //     mountLoginForm();
    //     cy.get('[data-testid="login-form"]').submit();
    //     cy.get('@handleSubmit').should('have.been.called');
    // });
});
