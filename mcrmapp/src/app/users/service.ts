import { User } from "./models";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_HOST}/api/users`);
        if (!response.ok) throw new Error("Error fetching users");
        return response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (user: User) => {
    try {
        const response = await fetch(`${API_HOST}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Error creating user");
        return response.json();
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const updateUser = async (id: number, user: User) => {
    try {
        const response = await fetch(`${API_HOST}/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Error updating user");
        return response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const response = await fetch(`${API_HOST}/api/users/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error deleting user");
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
