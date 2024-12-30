import { BrowserRouter } from "react-router-dom";
import CreateUserDialog from "../../src/pages/user-management-page/components/create-user-dialog.component";
import { mount } from "cypress/react";
import * as userDataHook from "../../src/hooks/useUserData.hook";
import { UserProvider } from "../../src/pages/user-management-page/context/user-management.context";

import { ReactNode } from 'react';

const TestWrapper = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
        <UserProvider>
            {children}
        </UserProvider>
    </BrowserRouter>
);

describe('CreateUserDialog', () => {
    beforeEach(() => {
        cy.stub(userDataHook, 'useUserData').returns({
            handleCreateUser: cy.stub().resolves(),
            isLoading: false
        });
    });
    it('should render the dialog', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="create-user-form"]').should('exist');
    });
    it('username input fields should be empty', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="username"]').should('have.value', '');
    });
    it('password input fields should be empty', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="password"]').should('have.value', '');
    });
    it('email input fields should be empty', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="email"]').should('have.value', '');
    });
    it('role input fields should be empty', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="role"]').should('have.value', '');
    });
    it('full name input fields should be empty', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="fullName"]').should('have.value', '');
    });
    it('should submit the form', () => {
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={() => { }} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="submit-create-user-form"]').click();
    });
    it('should close the dialog', () => {
        const onClose = cy.stub();
        mount(
            <TestWrapper>
                <CreateUserDialog isOpen={true} onClose={onClose} handleReloadUserData={() => { }} />
            </TestWrapper>
        );
        cy.get('[data-testid="close-create-user-dialog"]').click();
        cy.wrap(onClose).should('be.called');
    });
});