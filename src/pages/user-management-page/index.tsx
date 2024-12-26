import React, { useEffect } from "react";
import { Stack, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserListComponent from "./components/user-list.component";
import CreateUserDialog from "./components/create-user-dialog.component";
import styles from "./components/module/style.module.css";
import { SearchInput } from "../../components/Search/SearchInput";
import { useUserData } from "../../hooks/useUserData.hook";

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
    }, [page, limit]);

    return (
        <Stack spacing={2} className={styles.usermanagement__page}>
            <div className={styles.search__container}>
                <div className={styles.search__input}>
                    <SearchInput
                        onSearch={handleSearchChange}
                        placeholder="Search...."
                    />
                </div>
                <Button
                    className="btn__add-user"
                    variant="outlined"
                    color="success"
                    onClick={handleOpenUserDialog}
                >
                    <AddCircleIcon color="success" fontSize="large" />
                    Add
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