"use client";

import { User } from "./models";
import Button from "@/components/button";
import { useUsers } from "./use";
import { ChangeEvent, useState } from "react";

const Users = () => {
    const {
        data,
        newUser,
        handleInputChange,
        addUser,
        editUser,
        removeUser,
    } = useUsers();

    const [editingId, setEditingId] = useState<number | null>(null);

    const getInitials = (user: User): string => {
        return user.firstName[0] + user.lastName[0];
    };

    const handleEditClick = (user: User) => {
        setEditingId(user.id);
        handleInputChange("firstName", user.firstName);
        handleInputChange("lastName", user.lastName);
        handleInputChange("email", user.email);
    };

    const handleSaveClick = () => {
        if (editingId !== null) {
            editUser(editingId);
            setEditingId(null); // Exit editing mode
        } else {
            addUser();
        }
    };

    const handleCancelClick = () => {
        setEditingId(null);
        // Clear form fields
        handleInputChange("firstName", "");
        handleInputChange("lastName", "");
        handleInputChange("email", "");
    };

    return (
        <section className="flex flex-col p-4">
            <h1 className="text-4xl font-bold place-self-center m-8">Users</h1>
            <div className="flex flex-col items-center mb-8">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newUser.firstName}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    className="p-2 m-2 border rounded"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newUser.lastName}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    className="p-2 m-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    className="p-2 m-2 border rounded"
                />
                <div className="flex space-x-2">
                    {editingId !== null ? (
                        <>
                            <Button
                                type="primary"
                                label="Save"
                                onClick={handleSaveClick}
                            />
                            <Button
                                type="tertiary"
                                label="Cancel"
                                onClick={handleCancelClick}
                            />
                        </>
                    ) : (
                        <Button
                            type="primary"
                            label="Add User"
                            onClick={handleSaveClick}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center">
                {data.map((d: User, idx) => (
                    <div key={idx} className="flex flex-col p-6 m-4 w-60 rounded-xl bg-white border items-center">
                        <div className="text-2xl font-extralight m-4 p-4 rounded-full bg-neutral-300 w-16 h-16 flex justify-center">
                            {getInitials(d)}
                        </div>
                        <div className="font-bold">{`${d.firstName} ${d.lastName}`}</div>
                        <div className="text-xs">{d.email}</div>
                        <div className="flex mt-4">
                            <Button
                                type="secondary"
                                label="Edit"
                                onClick={() => handleEditClick(d)}
                            />
                            <Button
                                type="tertiary"
                                label="Delete"
                                onClick={() => removeUser(d.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Users;
