import React, { useEffect } from "react";
import { Stack, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReplayIcon from '@mui/icons-material/Replay';
import UserListComponent from "./components/UserListComponent";
import CreateUserDialog from "./components/CreateUserDialogComponent";
import styles from "./components/module/style.module.css";
import { useUserData } from "../../hooks/useUserData.hook";
import { CREATE_USER_BUTTON, RELOAD_USER_BUTTON, SEARCH_INPUT_PLACEHOLDER } from "./constant";
import { SearchInput } from "../../components";

const UserManagementPage = () => {
    const {
        data,
        total,
        isLoading,
        page,
        limit,
        search,
        fetchUserData,
        isCreateUserDialog,
        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenUserDialog,
        handleCloseAddUserDialog,
        handleReloadUserData
    } = useUserData();

    useEffect(() => {
        fetchUserData({ page, limit, search: '' });
    }, [page, limit, search]);

    return (
        <Stack spacing={2} className={styles.usermanagement__page}>
            <div className={styles.search__container}>
                <SearchInput
                    className={styles.search__input}
                    onSearch={handleSearchChange}
                    placeholder={SEARCH_INPUT_PLACEHOLDER}
                />
                <Button
                    className={styles.btn__adduser}
                    variant="outlined"
                    color="success"
                    onClick={handleOpenUserDialog}
                >
                    <AddCircleIcon color="success" fontSize="medium" />
                    {CREATE_USER_BUTTON}
                </Button>
                <Button
                    className={styles.btn__reload}
                    variant="outlined"
                    color="info"
                    onClick={handleReloadUserData}
                >
                    <ReplayIcon color="info" fontSize="medium" />
                    {RELOAD_USER_BUTTON}
                </Button>
            </div>

            <UserListComponent
                data={data}
                page={page}
                limit={limit}
                total={total}
                isLoading={isLoading}
                handleReloadUserData={handleReloadUserData}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />

            <CreateUserDialog
                isOpen={isCreateUserDialog}
                onClose={handleCloseAddUserDialog}
                handleReloadUserData={handleReloadUserData}
            />
        </Stack>
    );
};

export default UserManagementPage;