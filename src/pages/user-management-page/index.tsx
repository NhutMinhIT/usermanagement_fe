import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import UserListComponent from "./components/user-list.component";
import CreateUserDialog from "./components/create-user-dialog.component";

import styles from "./components/module/style.module.css";

import { useUserData } from "../../hooks/useUserData.hook";
import { useSearch } from "../../hooks/useSearch.hook";
import { SearchParams } from "./types/search.type";
import { SearchInput } from "../../components/Search/SearchInput";

const UserManagementPage = () => {
    // Use custom hook for managing user data
    const { data, total, fetchUserData, isLoading } = useUserData();

    // Pagination and search state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState<string>("");

    // Dialog state
    const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false);

    const { handleSearchChange } = useSearch<SearchParams>({
        onSearch: fetchUserData,
        searchParams: { page: 1, limit: 10 },
        delay: 500
    });

    // Handle page change
    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage + 1);
        fetchUserData({ page: newPage + 1, limit, search });
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit || 20);
        setPage(1);
        fetchUserData({ page: 1, limit: newLimit, search });
    };

    // Open and close the Create User dialog
    const handleOpenUserDialog = () => {
        setIsUserDialogOpen(true);
    };

    const handleCloseAddUserDialog = () => {
        setIsUserDialogOpen(false);
    };

    useEffect(() => {
        fetchUserData({ page, limit, search });
    }, []);

    // Reload data after user actions (e.g., add, update, delete)
    const handleReloadUserData = () => {
        fetchUserData({ page, limit, search });
    };

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
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleReloadUserData={handleReloadUserData}
            />

            <CreateUserDialog
                isOpen={isUserDialogOpen}
                onClose={handleCloseAddUserDialog}
                handleReloadUserData={handleReloadUserData}
            />
        </Stack>
    );
};

export default UserManagementPage;
