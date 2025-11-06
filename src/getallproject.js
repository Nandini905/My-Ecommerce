const Base_URL = 'https://api.escuelajs.co/api/v1';

export const getAllProducts = async (limit = 50, offset = 0) => {
    const url = `${Base_URL}/products?limit=${limit}&offset=${offset}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }
        const data = await response.json();
        // Ensure we always return an array
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
