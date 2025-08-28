// Authentication functionality
class Auth {
    static KEY_USERS = 'linkedin_users';
    static KEY_CURRENT_USER = 'linkedin_current_user';

    static init() {
        // Initialize users if not exists
        if (!localStorage.getItem(this.KEY_USERS)) {
            localStorage.setItem(this.KEY_USERS, JSON.stringify([]));
        }

        // Check if user is logged in and redirect accordingly
        this.checkAuthStatus();
    }

    static checkAuthStatus() {
        const currentUser = this.getCurrentUser();
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (currentUser && (currentPage === 'index.html' || currentPage === 'signup.html' || currentPage === '')) {
            window.location.href = 'home.html';
        } else if (!currentUser && currentPage !== 'index.html' && currentPage !== 'signup.html' && currentPage !== '') {
            window.location.href = 'index.html';
        }
    }

    static register(userData) {
        const users = this.getUsers();
        
        // Check if user already exists
        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            return { success: false, message: 'User already exists with this email' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password, // In real app, this should be hashed
            fullName: `${userData.firstName} ${userData.lastName}`,
            title: 'Professional',
            location: 'Location',
            connections: Math.floor(Math.random() * 500) + 100,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.KEY_USERS, JSON.stringify(users));

        return { success: true, user: newUser };
    }

    static login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem(this.KEY_CURRENT_USER, JSON.stringify(user));
            return { success: true, user };
        }

        return { success: false, message: 'Invalid email or password' };
    }

    static logout() {
        localStorage.removeItem(this.KEY_CURRENT_USER);
        window.location.href = 'index.html';
    }

    static getCurrentUser() {
        const userStr = localStorage.getItem(this.KEY_CURRENT_USER);
        return userStr ? JSON.parse(userStr) : null;
    }

    static getUsers() {
        const usersStr = localStorage.getItem(this.KEY_USERS);
        return usersStr ? JSON.parse(usersStr) : [];
    }

    static updateCurrentUser(updates) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            localStorage.setItem(this.KEY_CURRENT_USER, JSON.stringify(updatedUser));
            
            // Also update in users array
            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem(this.KEY_USERS, JSON.stringify(users));
            }
            
            return updatedUser;
        }
        return null;
    }
}

// Login form handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    const result = Auth.login(email, password);
    
    if (result.success) {
        window.location.href = 'home.html';
    } else {
        alert(result.message);
    }
}

// Signup form handler
function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    const result = Auth.register({
        firstName,
        lastName,
        email,
        password
    });

    if (result.success) {
        alert('Account created successfully! Please login.');
        window.location.href = 'index.html';
    } else {
        alert(result.message);
    }
}

// Global logout function
function logout() {
    Auth.logout();
}

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', function() {
    Auth.init();

    // Attach form handlers
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});
