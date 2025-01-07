import React, { useEffect } from "react";
import { Stack, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReplayIcon from '@mui/icons-material/Replay';
import UserListComponent from "./components/user-list.component";
import CreateUserDialog from "./components/create-user-dialog.component";
import styles from "./components/module/style.module.css";
import { SearchInput } from "../../components/Search/SearchInput";
import { useUserData } from "../../hooks/useUserData.hook";
import { CREATE_USER_BUTTON, RELOAD_USER_BUTTON, SEARCH_INPUT_PLACEHOLDER } from "./constant";

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
                <div className={styles.search__input}>
                    <SearchInput
                        onSearch={handleSearchChange}
                        placeholder={SEARCH_INPUT_PLACEHOLDER}
                    />
                </div>
                <Button
                    className="btn__add-user"
                    variant="outlined"
                    color="success"
                    onClick={handleOpenUserDialog}
                >
                    <AddCircleIcon color="success" fontSize="large" />
                    {CREATE_USER_BUTTON}
                </Button>
                <Button
                    className="btn__reload-user"
                    variant="outlined"
                    color="info"
                    onClick={handleReloadUserData}
                >
                    <ReplayIcon color="info" fontSize="large" />
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