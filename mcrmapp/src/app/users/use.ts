import { useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./service";
import { User } from "./models";

export const useUsers = () => {
    const [data, setData] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const users = await fetchUsers();
                setData(users);
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };
        loadData();
    }, []);

    const handleInputChange = (name: string, value: string) => {
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addUser = async () => {
        try {
            const createdUser = await createUser(newUser);
            setData((prev) => [...prev, createdUser]);
            setNewUser({ id: 0, firstName: '', lastName: '', email: '' });
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const editUser = async (id: number) => {
        try {
            const updatedUser = await updateUser(id, newUser);
            setData((prev) =>
                prev.map((user) => (user.id === id ? updatedUser : user))
            );
            setNewUser({ id: 0, firstName: '', lastName: '', email: '' });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const removeUser = async (id: number) => {
        try {
            await deleteUser(id);
            setData((prev) => prev.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return {
        data,
        newUser,
        handleInputChange,
        addUser,
        editUser,
        removeUser,
    };
};
