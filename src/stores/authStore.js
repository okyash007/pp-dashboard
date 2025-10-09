import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: true,

  // Initialize auth state
  initialize: async () => {
    const storedToken = localStorage.getItem('authToken')
    
    if (storedToken) {
      set({ token: storedToken })
      // Fetch user data from profile API
      await get().fetchUserProfile(storedToken)
    } else {
      set({ loading: false })
    }
  },

  // Fetch user profile from API
  fetchUserProfile: async (token) => {
    try {
      const response = await fetch('https://pp-backend.apextip.space/creator/profile', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user profile')
      }

      const data = await response.json()
      set({ user: data.data.creator })
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // If profile fetch fails, clear token and redirect to login
      localStorage.removeItem('authToken')
      set({ token: null, user: null })
    } finally {
      set({ loading: false })
    }
  },

  // Login function
  login: async (emailOrUsername, password) => {
    try {
      const response = await fetch('https://pp-backend.apextip.space/creator/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrUsername,
          password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()
      
      // Store only token
      localStorage.setItem('authToken', data.data.token)
      
      set({ token: data.data.token })
      
      // Fetch user profile data
      await get().fetchUserProfile(data.data.token)
      
      return data
    } catch (error) {
      throw error
    }
  },

  // Signup function
  signup: async (userData) => {
    try {
      const response = await fetch('https://pp-backend.apextip.space/creator/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phone: userData.phone || '',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Signup failed')
      }

      const data = await response.json()
      
      // Store only token
      localStorage.setItem('authToken', data.data.token)
      
      set({ token: data.data.token })
      
      // Fetch user profile data
      await get().fetchUserProfile(data.data.token)
      
      return data
    } catch (error) {
      throw error
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('authToken')
    set({ token: null, user: null })
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const { token } = get()
    return !!token
  },
}))
