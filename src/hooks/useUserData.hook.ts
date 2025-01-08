import { useState, useCallback } from 'react';
import { IUser } from '../types/userType';
import { useSearch } from './useSearch.hook';
import { CREATING_USER_ERROR, CREATING_USER_SUCCESS, FETCHING_DATA_ERROR, FETCHING_USER_DETAILS_ERROR, REMOVING_USER_ERROR, REMOVING_USER_SUCCESS, UPDATING_USER_ERROR, UPDATING_USER_SUCCESS } from './constant';
import { ICreateUser, IUpdateUser, TGetAllUsersParams } from '../pages/UserManagementPage/types/userManagmentType';
import { createUser, getAllUsers, getUserById, removeUser, updateUser } from '../pages/UserManagementPage/services/userService';
import { ISearchParams } from '../pages/UserManagementPage/types/searchType';
import { DELAY_DEBOUNCE_DEFAULT, LIMIT_NUMBER_DEFAULT, PAGE_NUMBER_DEFAULT, SEARCH_PARAMS_DEFAULT, SELECT_USER_DEFAULT, TOTAL_PAGE_NUMBER_DEFAULT } from './constant';


export const useUserData = () => {
    const [data, setData] = useState<IUser[]>([]);
    const [total, setTotal] = useState<number>(TOTAL_PAGE_NUMBER_DEFAULT);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(PAGE_NUMBER_DEFAULT);
    const [limit, setLimit] = useState<number>(LIMIT_NUMBER_DEFAULT);
    const [search, setSearch] = useState<string>(SEARCH_PARAMS_DEFAULT);
    const [selectedUser, setSelectedUser] = useState<string | null>(SELECT_USER_DEFAULT);
    const [isCreateUserDialog, setIsCreateUserDialog] = useState<boolean>(false);

    // dialog remove user
    const [openRemoveUserDialog, setOpenRemoveUserDialog] = useState<boolean>(false);
    // dialog update user
    const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState<boolean>(false);

    const fetchUserData = useCallback(async ({ page, limit, search }: TGetAllUsersParams) => {
        setIsLoading(true);
        try {
            const response = await getAllUsers({ page, limit, search });
            setData(response.data);
            setTotal(response.total);
        } catch (err) {
            console.error(`${FETCHING_DATA_ERROR}`, err);
        } finally {
            setIsLoading(false);
        }
    }, [getAllUsers]);

    const getUserDetails = async (userId: string) => {
        setIsLoading(true);
        try {
            return await getUserById(userId);
        } catch (error) {
            console.error(`${FETCHING_USER_DETAILS_ERROR}`, error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateUser = async (user: ICreateUser) => {
        setIsLoading(true);
        try {
            await createUser(user);
            window.alert(`${CREATING_USER_SUCCESS}`);
        } catch (error) {
            console.error(`${CREATING_USER_ERROR}`, error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateUser = async (userId: string, user: IUpdateUser) => {
        setIsLoading(true);
        try {
            await updateUser(userId, user);
            window.alert(`${UPDATING_USER_SUCCESS}`);
        } catch (error) {
            console.error(`${UPDATING_USER_ERROR}`, error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveUser = async (userId: string) => {
        setIsLoading(true);
        try {
            await removeUser(userId);
            window.alert(`${REMOVING_USER_SUCCESS}`);
            handleReloadUserData();
        } catch (error) {
            console.error(`${REMOVING_USER_ERROR}`, error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const { handleSearchChange } = useSearch<ISearchParams>({
        onSearch: fetchUserData,
        searchParams: { page: PAGE_NUMBER_DEFAULT, limit: LIMIT_NUMBER_DEFAULT },
        delay: DELAY_DEBOUNCE_DEFAULT
    });

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ): void => {
        setPage(newPage + 1);
        fetchUserData({ page: newPage + 1, limit, search });
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit || 20);
        setPage(1);
        fetchUserData({ page: 1, limit: newLimit, search });
    };
    const handleReloadUserData = () => fetchUserData({ page, limit, search });

    // action create user
    const handleOpenUserDialog = () => setIsCreateUserDialog(true);
    const handleCloseAddUserDialog = () => setIsCreateUserDialog(false);

    //action remove user
    const handleOpenRemoveUserDialog = (userId: string) => {
        setSelectedUser(userId);
        setOpenRemoveUserDialog(true);
    }
    const handleCloseRemoveUserDialog = () => {
        setOpenRemoveUserDialog(false);
        setSelectedUser(null);
    }

    const handleApproveRemoveUser = async () => {
        if (!selectedUser) return;

        try {
            await handleRemoveUser(selectedUser);
            handleCloseRemoveUserDialog();
        } catch (error) {
            console.error('Error in handleApproveRemoveUser:', error);
        }
    };
    //action update user
    const handleOpenUpdateUserDialog = (userId: string) => {
        setSelectedUser(userId);
        setOpenUpdateUserDialog(true);
    }
    const handleCloseUpdateUserDialog = () => {
        setOpenUpdateUserDialog(false);
        setSelectedUser(null);
    }


    return {
        data,
        total,
        selectedUser,
        fetchUserData,
        isLoading,
        page,
        limit,
        search,
        setSearch,
        isCreateUserDialog,
        openRemoveUserDialog,
        openUpdateUserDialog,
        handleCreateUser,
        handleUpdateUser,
        handleRemoveUser,
        getUserDetails,
        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenUserDialog,
        handleCloseAddUserDialog,
        handleOpenRemoveUserDialog,
        handleCloseRemoveUserDialog,
        handleApproveRemoveUser,
        handleOpenUpdateUserDialog,
        handleCloseUpdateUserDialog,
        handleReloadUserData
    };
};
