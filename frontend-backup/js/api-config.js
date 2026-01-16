// API Configuration for Detective Conan Frontend
// This file contains all API endpoints and configuration for remote backend connection

const API_CONFIG = {
    // Backend API Base URL - Change this to your deployed backend URL
    BASE_URL: process.env.API_BASE_URL || 'https://your-backend-api.com',
    
    // Alternative local development URL
    LOCAL_URL: 'http://localhost:3001',
    
    // API Endpoints
    ENDPOINTS: {
        // News endpoints
        NEWS: '/api/news',
        CASES: '/api/cases',
        
        // Admin endpoints (protected)
        ADMIN_NEWS: '/api/news',
        ADMIN_CASES: '/api/cases'
    },
    
    // Get current API base URL
    getBaseUrl() {
        // Use local URL for development, production URL for live site
        const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
        return isDevelopment ? this.LOCAL_URL : this.BASE_URL;
    },
    
    // Get full endpoint URL
    getEndpoint(endpoint) {
        return this.getBaseUrl() + endpoint;
    },
    
    // Admin authentication
    getAdminHeaders() {
        const adminKey = localStorage.getItem('adminKey');
        if (!adminKey) {
            throw new Error('Admin key not found. Please login first.');
        }
        return {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey
        };
    },
    
    // Store admin key
    setAdminKey(key) {
        localStorage.setItem('adminKey', key);
    },
    
    // Remove admin key
    clearAdminKey() {
        localStorage.removeItem('adminKey');
    },
    
    // Check if user is admin
    isAdmin() {
        return !!localStorage.getItem('adminKey');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
} else {
    window.API_CONFIG = API_CONFIG;
}
