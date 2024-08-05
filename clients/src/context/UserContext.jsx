import React, { createContext, useState, useEffect } from 'react';
import { getUsers } from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const users = await getUsers();
            setUsers(users);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, setUsers, loading }}>
            {children}
        </UserContext.Provider>
    );
};
