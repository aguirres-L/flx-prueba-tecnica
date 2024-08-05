const API_URL = 'http://localhost:4000/users';

// Función para simular un retraso en las solicitudes
const simulateNetworkDelay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const getUsers = async () => {
    await simulateNetworkDelay(1500); 
    const response = await fetch(API_URL);
    return response.json();
};

export const createUser = async (user) => {
    await simulateNetworkDelay(1500); 
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const updateUser = async (user) => {
    await simulateNetworkDelay(1500); 

    try {
        const response = await fetch(`${API_URL}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            console.error('Error en la solicitud:', response.statusText);
            throw new Error('Error en la solicitud');
        }

        return response.json();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    await simulateNetworkDelay(1500); 
    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
    });
    return response.json();
};
