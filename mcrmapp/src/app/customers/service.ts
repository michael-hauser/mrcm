import { Customer } from "./models";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await fetch(`${API_HOST}/api/customers`);
    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }
    return response.json();
};

export const createCustomer = async (customer: Customer): Promise<Customer> => {
    const response = await fetch(`${API_HOST}/api/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error("Failed to create customer");
    }
    return response.json();
};

export const updateCustomer = async (id: number, customer: Customer): Promise<Customer> => {
    const response = await fetch(`${API_HOST}/api/customers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error("Failed to update customer");
    }
    return response.json();
};

export const deleteCustomer = async (id: number): Promise<void> => {
    const response = await fetch(`${API_HOST}/api/customers/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete customer");
    }
};
