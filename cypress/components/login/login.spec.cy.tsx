import { mount } from "cypress/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../../../src/pages/login-page/components/form-login.component";
import { API_URL } from "../../../src/constants/api.constant";

// Wrapper for React Router
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe("LoginForm", () => {

    // Mock login response
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

    // Function to intercept login API
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
    // Mount the LoginForm component with default and custom props
    const mountLoginForm = (props = {}) => {
        const defaultProps = {
            isLoading: false,
            formData: { username: "", password: "" },
            error: {},
            touched: {},
            handleSubmit: cy.stub().as("handleSubmit"),
            handleChange: cy.stub().as("handleChange"),
            handleBlur: cy.stub().as("handleBlur"),
        };

        mount(
            <RouterWrapper>
                <LoginForm {...defaultProps} {...props} />
            </RouterWrapper>
        );
    };

    it("renders the form", () => {
        mountLoginForm();
        cy.get('form[data-testid="login-form"]').should("exist");
    });

    it("maintains form state", () => {
        mountLoginForm({ formData: { username: "testuser", password: "testpass" } });
        cy.get('input[name="username"]').should("have.value", "testuser");
        cy.get('input[name="password"]').should("have.value", "testpass");
    });

    it("clears errors on input change", () => {
        mountLoginForm({ error: { username: "Error message" } });
        cy.get('input[name="username"]').type("newuser");
        cy.get('[data-testid="username-error"]').should("not.exist");
    });

    it("triggers handleBlur on input blur", () => {
        mountLoginForm();
        cy.get('input[name="username"]').focus().blur();
        cy.get("@handleBlur").should("have.been.called");
        cy.get('input[name="password"]').focus().blur();
        cy.get("@handleBlur").should("have.been.called");
    });

    it("triggers handleChange on input change", () => {
        mountLoginForm();
        cy.get('input[name="username"]').type("testuser");
        cy.get("@handleChange").should("have.been.called");
        cy.get('input[name="password"]').type("testpass");
        cy.get("@handleChange").should("have.been.called");
    });

    it("clears input fields", () => {
        mountLoginForm();
        cy.get('input[name="username"]').type("testuser").clear().should("have.value", "");
        cy.get('input[name="password"]').type("testpass").clear().should("have.value", "");
    });

    it("auto-fills input fields with provided data", () => {
        mountLoginForm({ formData: { username: "autouser", password: "autopass" } });
        cy.get('input[name="username"]').should("have.value", "autouser");
        cy.get('input[name="password"]').should("have.value", "autopass");
    });

    // it('check response with login api endpoint', () => {
    //     mountLoginForm({ formData: { username: "admin", password: "admin" } });
    //     cy.get('[data-testid="username"]').type("admin");
    //     cy.get('[data-testid="password"]').type("admin");
    //     cy.get('[data-testid="login-button"]').click();
    //     cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
    // });


    it("submits the form with valid credentials", () => {
        mountLoginForm({ formData: { username: "admin", password: "admin" } });
        cy.get('[data-testid="username"]').type("admin");
        cy.get('[data-testid="password"]').type("admin");
        cy.get('[data-testid="login-button"]').click();
        cy.wait("@loginRequest").its("response.statusCode").should("eq", 201);
    });
});