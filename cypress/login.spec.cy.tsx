import { mount } from "cypress/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../src/pages/login-page/components/form-login.component";

interface FormData {
    username: string;
    password: string;
}

interface Errors {
    username?: string;
    password?: string;
}

interface Touched {
    username?: boolean;
    password?: boolean;
}

const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
);

describe("login-form", () => {
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

    it("should render with router context", () => {
        mountLoginForm();
        cy.get('form').should('exist');
    });

    it("should handle navigation after successful login", () => {
        const validFormData: FormData = {
            username: "testuser",
            password: "testpass123"
        };
        mountLoginForm({ formData: validFormData });

        cy.get('form').submit();
        cy.get('@handleSubmit').should('have.been.calledOnce');
    });

    it("should show validation errors with router context", () => {
        const touched: Touched = { username: true, password: true };
        mountLoginForm({ error: mockErrors, touched });

        cy.get('[data-testid="username-error"]').should('be.visible');
        cy.get('[data-testid="password-error"]').should('be.visible');
    });


});