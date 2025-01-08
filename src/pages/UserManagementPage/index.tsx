import React, { useEffect } from "react";
import { Stack, Button, Box } from "@mui/material";
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
                <Box className={styles.btn__container}>
                    <Button
                        className={styles.btn__adduser}
                        variant="outlined"
                        color="success"
                        title="Add User"
                        onClick={handleOpenUserDialog}
                    >
                        <AddCircleIcon color="success" fontSize="medium" />
                        <span>{CREATE_USER_BUTTON}</span>
                    </Button>
                    <Button
                        className={styles.btn__reload}
                        variant="outlined"
                        color="info"
                        title="Reload User Data"
                        onClick={handleReloadUserData}
                    >
                        <ReplayIcon
                            color="info"
                            fontSize="medium"
                        />
                        <span>{RELOAD_USER_BUTTON}</span>
                    </Button>
                </Box>
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