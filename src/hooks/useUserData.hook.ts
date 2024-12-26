import { useState, useCallback, useEffect } from 'react';
import { GetAllUsersParamsType, ICreateUser, IUpdateUser } from '../pages/user-management-page/types/user-managment.type';
import { useUserManagementContext } from '../pages/user-management-page/context/user-management.context';
import { IUser } from '../types/user.type';
import { useSearch } from './useSearch.hook';
import { SearchParams } from '../pages/user-management-page/types/search.type';


export const useUserData = () => {
    const { getAllUsers, createUser, updateUser, removeUser, getUserById } = useUserManagementContext();
    const [data, setData] = useState<IUser[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState<string>("");
    const [isCreateUserDialog, setIsCreateUserDialog] = useState<boolean>(false);

    const fetchUserData = useCallback(async ({ page, limit, search }: GetAllUsersParamsType) => {
        setIsLoading(true);
        try {
            const response = await getAllUsers({ page, limit, search });
            setData(response.data);
            setTotal(response.total);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [getAllUsers]);


    const getUserDetails = async (userId: string) => {
        setIsLoading(true);
        try {
            return await getUserById(userId);
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateUser = async (user: ICreateUser) => {
        setIsLoading(true);
        try {
            await createUser(user);
            window.alert('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateUser = async (userId: string, user: IUpdateUser) => {
        setIsLoading(true);
        try {
            await updateUser(userId, user);
            window.alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveUser = async (userId: string) => {
        setIsLoading(true);
        try {
            await removeUser(userId);
            window.alert('User removed successfully');
        } catch (error) {
            console.error('Error removing user:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const { handleSearchChange } = useSearch<SearchParams>({
        onSearch: fetchUserData,
        searchParams: { page: 1, limit: 10 },
        delay: 500
    });

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage + 1);
        fetchUserData({ page: newPage + 1, limit, search });
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit || 20);
        setPage(1);
        fetchUserData({ page: 1, limit: newLimit, search });
    };

    const handleOpenUserDialog = () => setIsCreateUserDialog(true);
    const handleCloseAddUserDialog = () => setIsCreateUserDialog(false);
    const handleReloadUserData = () => fetchUserData({ page, limit, search });

    useEffect(() => {
        fetchUserData({ page, limit, search });
    }, []);


    return {
        data,
        total,
        fetchUserData,
        isLoading,
        page,
        limit,
        search,
        isCreateUserDialog,
        handleCreateUser,
        handleUpdateUser,
        handleRemoveUser,
        getUserDetails,
        handleSearchChange,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenUserDialog,
        handleCloseAddUserDialog,
        handleReloadUserData
    };
};
