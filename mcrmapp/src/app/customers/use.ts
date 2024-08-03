import { useEffect, useState } from "react";
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from "./service";
import { Customer } from "./models";

export const useCustomers = () => {
    const [data, setData] = useState<Customer[]>([]);
    const [newCustomer, setNewCustomer] = useState<Customer>({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const customers = await fetchCustomers();
                setData(customers);
            } catch (error) {
                console.error("Error loading customers:", error);
            }
        };
        loadData();
    }, []);

    const handleInputChange = (name: string, value: string) => {
        setNewCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addCustomer = async () => {
        try {
            const createdCustomer = await createCustomer(newCustomer);
            setData((prev) => [...prev, createdCustomer]);
            setNewCustomer({ id: 0, firstName: '', lastName: '', email: '' });
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const editCustomer = async (id: number) => {
        try {
            const updatedCustomer = await updateCustomer(id, newCustomer);
            setData((prev) =>
                prev.map((customer) => (customer.id === id ? updatedCustomer : customer))
            );
            setNewCustomer({ id: 0, firstName: '', lastName: '', email: '' });
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const removeCustomer = async (id: number) => {
        try {
            await deleteCustomer(id);
            setData((prev) => prev.filter((customer) => customer.id !== id));
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return {
        data,
        newCustomer,
        handleInputChange,
        addCustomer,
        editCustomer,
        removeCustomer,
    };
};
