// Mock API functions for authentication
// In a real application, these would make HTTP requests to your backend

// Generate a simple JWT-like token (for demo purposes)
const generateToken = (userData) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        ...userData,
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days expiration
    }));
    const signature = btoa(`${header}.${payload}`); // In real app, this would be HMAC signed
    
    return `${header}.${payload}.${signature}`;
};

// Mock users database (in real app, this would be on the server)
const mockUsers = [
    {
        id: 1,
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
        avatar: null
    },
    {
        id: 2,
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        avatar: null
    }
];

export const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken({ id: user.id, email: user.email });

    return {
        token,
        user: userWithoutPassword
    };
};

export const register = async (name, email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
        id: mockUsers.length + 1,
        email,
        password,
        name,
        avatar: null
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateToken({ id: newUser.id, email: newUser.email });

    return {
        token,
        user: userWithoutPassword
    };
};

// For demo: You can use these credentials:
// Email: user@example.com, Password: password123
// Email: admin@example.com, Password: admin123

