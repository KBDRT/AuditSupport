const config = {
  development: {
    url: 'http://localhost:5000',
    timeout: 5000,
  },
  production: {
    url: 'http://localhost:5000',
    timeout: 10000,
  },
  staging: {
    url: 'http://localhost:5000',
    timeout: 8000,
  }
}

const environment = 'development'

export const API_CONFIG = config[environment as keyof typeof config]