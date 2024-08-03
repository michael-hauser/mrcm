"use client";

import Button from "@/components/button";
import { Customer } from "./models";
import { useCustomers } from "./use";
import { ChangeEvent, useState } from "react";

const Customers = () => {
    const {
        data,
        newCustomer,
        handleInputChange,
        addCustomer,
        editCustomer,
        removeCustomer,
    } = useCustomers();

    const [editingId, setEditingId] = useState<number | null>(null);

    const getInitials = (customer: Customer): string => {
        return customer.firstName[0] + customer.lastName[0];
    };

    const handleEditClick = (customer: Customer) => {
        setEditingId(customer.id);
        handleInputChange("firstName", customer.firstName);
        handleInputChange("lastName", customer.lastName);
        handleInputChange("email", customer.email);
    };

    const handleSaveClick = () => {
        if (editingId !== null) {
            editCustomer(editingId);
            setEditingId(null); // Exit editing mode
        } else {
            addCustomer();
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
        <section className="p-4 h-screen overflow-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Customers</h1>
            <div className="flex flex-col items-center mb-8">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newCustomer.firstName}
                    onChange={e => handleInputChange(e.target.name, e.target.value)}
                    className="p-2 m-2 border rounded"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newCustomer.lastName}
                    onChange={e => handleInputChange(e.target.name, e.target.value)}
                    className="p-2 m-2 border rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={e => handleInputChange(e.target.name, e.target.value)}
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
                            label="Add Customer"
                            onClick={handleSaveClick}
                        />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {data.map((d: Customer, idx: number) => (
                    <div key={idx} className="flex items-center p-4 bg-white border rounded-xl shadow-md">
                        <div className="text-xl font-light p-4 rounded-full bg-neutral-300 w-12 h-12 flex justify-center items-center mr-4">
                            {getInitials(d)}
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-lg">{`${d.firstName} ${d.lastName}`}</div>
                            <div className="text-xs">{d.email}</div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                            <Button
                                type="secondary"
                                label="Edit"
                                onClick={() => handleEditClick(d)}
                            />
                            <Button
                                type="tertiary"
                                label="Delete"
                                onClick={() => removeCustomer(d.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Customers;
