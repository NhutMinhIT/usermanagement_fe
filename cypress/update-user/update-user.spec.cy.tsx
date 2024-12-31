import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../../src/pages/user-management-page/context/user-management.context";
import UpdateUserDialogComponent from "../../src/pages/user-management-page/components/update-user-dialog.component";
import { mount } from "cypress/react";

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

const UpdateUserWrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
        <UserProvider>
            {children}
        </UserProvider>
    </BrowserRouter>
);

describe("UpdateUserDialog", () => {
    let mockHandleSubmit: ReturnType<typeof cy.stub>;
    let mockHandleChange: ReturnType<typeof cy.stub>;
    let mockHandleBlur: ReturnType<typeof cy.stub>;
    let mockFormData: FormData;
    let mockErrors: ErrorsType;

    beforeEach(() => {
        mockHandleSubmit = cy.stub().as("handleSubmit");
        mockHandleChange = cy.stub().as("handleChange");
        mockHandleBlur = cy.stub().as("handleBlur");
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
});