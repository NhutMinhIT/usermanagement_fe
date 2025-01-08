import React, { FC } from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
    Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpdateUserDialogComponent from './UpdateUserDialogComponent';
import { useUserData } from '../../../hooks/useUserData.hook';
import { rowHeaderMapping, StyledTableCell, StyledTableRow } from './module/table.';
import { IUser } from '../../../types/userType';
import { DIALOG_CONFIRM_REMOVE_USER_TITLE, NO_DATA_AVAILABLE, USER_LOADING } from '../constant';
import { ConfirmDialog } from '../../../components';

type UserListComponentProps = {
    data: IUser[];
    total: number;
    page: number;
    limit: number;
    isLoading: boolean;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    handleReloadUserData: () => void;
};

const UserListComponent: FC<UserListComponentProps> = ({
    data,
    page,
    limit,
    total,
    isLoading,
    handleChangePage,
    handleChangeRowsPerPage,
    handleReloadUserData,
}) => {
    const {
        openRemoveUserDialog,
        openUpdateUserDialog,
        handleOpenRemoveUserDialog,
        handleCloseRemoveUserDialog,
        handleApproveRemoveUser,
        handleOpenUpdateUserDialog,
        handleCloseUpdateUserDialog,
        selectedUser,
    } = useUserData();

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow hover>
                            {rowHeaderMapping.map((header) => (
                                <StyledTableCell key={header.key}>{header.label}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={rowHeaderMapping.length}>
                                    {USER_LOADING}
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : data.length > 0 ? (
                            data.map((user) => (
                                <StyledTableRow key={user._id}>
                                    <StyledTableCell>
                                        {user.fullName}
                                    </StyledTableCell>
                                    <StyledTableCell>{user.role}</StyledTableCell>
                                    <StyledTableCell>{user.username}</StyledTableCell>
                                    <StyledTableCell>{user.email}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton
                                            onClick={() => handleOpenUpdateUserDialog(user._id)}
                                        >
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenRemoveUserDialog(user._id)}>
                                            <DeleteOutlineIcon color="error" />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={rowHeaderMapping.length}>
                                    {NO_DATA_AVAILABLE}
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={[5, 20, 30]}
                        count={total} // Total number of rows
                        rowsPerPage={limit}
                        page={page - 1} // Convert one-based page to zero-based
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </TableContainer>

            {/* Remove User Dialog */}
            <ConfirmDialog
                title={DIALOG_CONFIRM_REMOVE_USER_TITLE}
                isOpen={openRemoveUserDialog}
                onClose={handleCloseRemoveUserDialog}
                onApprove={handleApproveRemoveUser}
                isLoading={isLoading}
            />

            {/* Update User Dialog */}
            <UpdateUserDialogComponent
                isOpen={openUpdateUserDialog}
                onClose={handleCloseUpdateUserDialog}
                userId={selectedUser || ''}
                handleReloadUserData={handleReloadUserData}
            />
        </>
    );
};

export default UserListComponent;
