import React, { FC, useState } from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import ConfirmDialog from '../../../components/Dialog/ConfirmDialog';
import UpdateUserDialogComponent from './update-user-dialog.component';

import { useUserData } from '../../../hooks/useUserData.hook';
import styles from './module/style.module.css';
import { IGetAllUser } from '../types/user-managment.type';
import { rowHeaderMapping, StyledTableCell, StyledTableRow } from './module/table.';
import { IUser } from '../../../types/user.type';

type UserListComponentProps = {
    data: IUser[];
    total: number;
    page: number;
    limit: number;
    isLoading: boolean;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

const UserListComponent: FC<UserListComponentProps> = ({
    data,
    page,
    limit,
    total,
    isLoading,
    handleChangePage,
    handleChangeRowsPerPage,
}) => {
    const { handleRemoveUser } = useUserData();

    // Dialog states
    const [openRemoveUserDialog, setOpenRemoveUserDialog] = useState(false);
    const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Handle open/close for Remove dialog
    const handleOpenRemoveUserDialog = (userId: string) => {
        setSelectedUser(userId);
        setOpenRemoveUserDialog(true);
    };

    const handleCloseRemoveUserDialog = () => {
        setOpenRemoveUserDialog(false);
        setSelectedUser(null);
    };

    const handleOpenUpdateUserDialog = (userId: string) => {
        setSelectedUser(userId);
        setOpenUpdateUserDialog(true);
    };

    const handleCloseUpdateUserDialog = () => {
        setOpenUpdateUserDialog(false);
        setSelectedUser(null);
    };

    const handleApproveRemoveUser = async () => {
        if (!selectedUser) return;

        setIsDeleting(true);
        try {
            await handleRemoveUser(selectedUser);
        } catch (error) {
            console.error('Error removing user:', error);
        } finally {
            setIsDeleting(false);
            handleCloseRemoveUserDialog();
        }
    };

    return (
        <>
            <TableContainer className={styles.table__container}>
                <Table sx={{ maxWidth: '80%' }}>
                    <TableHead>
                        <TableRow>
                            {rowHeaderMapping.map((header) => (
                                <StyledTableCell key={header.key}>{header.label}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={rowHeaderMapping.length}>
                                    Loading...
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
                                        <IconButton onClick={() => handleOpenUpdateUserDialog(user._id)}>
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
                                    No data available
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 20, 30]}
                    component="div"
                    count={total} // Total number of rows
                    rowsPerPage={limit}
                    page={page - 1} // Convert one-based page to zero-based
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Remove User Dialog */}
            <ConfirmDialog
                title="Are you sure you want to delete this user?"
                isOpen={openRemoveUserDialog}
                onClose={handleCloseRemoveUserDialog}
                onApprove={handleApproveRemoveUser}
                isLoading={isDeleting}
            />

            {/* Update User Dialog */}
            <UpdateUserDialogComponent
                isOpen={openUpdateUserDialog}
                onClose={handleCloseUpdateUserDialog}
                // handleReloadUserData={handleReloadUserData}
                userId={selectedUser || ''}
            />
        </>
    );
};

export default UserListComponent;
