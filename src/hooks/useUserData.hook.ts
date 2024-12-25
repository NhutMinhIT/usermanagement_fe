import { useState, useCallback } from 'react';
import { GetAllUsersParamsType, ICreateUser, IUpdateUser } from '../pages/user-management-page/types/user-managment.type';
import { useUserManagementContext } from '../pages/user-management-page/context/user-management.context';
import { IUser } from '../types/user.type';


export const useUserData = () => {
    const { getAllUsers, createUser, updateUser, removeUser, getUserById } = useUserManagementContext();
    const [data, setData] = useState<IUser[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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

    return {
        data,
        total,
        isLoading,
        fetchUserData,
        handleCreateUser,
        handleUpdateUser,
        handleRemoveUser,
        getUserDetails,
    };
};
