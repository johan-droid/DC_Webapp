/* frontend/js/api.js - API Service for Detective Conan Website */

class ApiService {
  constructor() {
    // BUG FIX: Use relative path for production compatibility
    // This allows the frontend to call the backend on the same domain/port automatically
    this.baseURL = '/api';
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // News API methods
  async getNews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/news?${queryString}`);
  }

  async getNewsById(id) {
    return this.request(`/news/${id}`);
  }

  async createNews(newsData) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  }

  async updateNews(id, newsData) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  }

  async deleteNews(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  // Cases API methods
  async getCases(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/cases?${queryString}`);
  }

  async getCaseById(id) {
    return this.request(`/cases/${id}`);
  }

  async createCase(caseData) {
    return this.request('/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  }

  async updateCase(id, caseData) {
    return this.request(`/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(caseData),
    });
  }

  async deleteCase(id) {
    return this.request(`/cases/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin API methods
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getAllNews() {
    return this.request('/admin/news');
  }

  async getAllCases() {
    return this.request('/admin/cases');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export the API service instance
const api = new ApiService();
window.api = api; // Make it globally available
