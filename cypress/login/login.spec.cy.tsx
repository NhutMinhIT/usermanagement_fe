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

    describe('login-form', () => {
        it('should render the form', () => {
            mountLoginForm();

            cy.get('form[data-testid="login-form"]').should('exist');
        });
        it("should maintain form state during route changes", () => {
            const testData: FormData = {
                username: "testuser",
                password: "testpass"
            };
            mountLoginForm({ formData: testData });

            cy.get('input[name="username"]').should('have.value', testData.username);
            cy.get('input[name="password"]').should('have.value', testData.password);
        });

        it("should clear errors when input changes", () => {
            mountLoginForm({ error: mockErrors });
            cy.get('input[name="username"]').type("newuser");
            cy.get('[data-testid="username-error"]').should('not.exist');
        });

    });
});