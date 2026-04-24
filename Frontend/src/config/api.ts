const config = {
  development: {
    url: 'https://localhost:5001',
    timeout: 5000,
  },
  production: {
    url: 'https://localhost:5001',
    timeout: 10000,
  },
  staging: {
    url: 'https://localhost:5001',
    timeout: 8000,
  }
}

const environment = 'development'

export const API_CONFIG = config[environment as keyof typeof config]