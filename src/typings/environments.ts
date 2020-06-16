// definitions for environment types
// create an .env file with environment variables
// using the key names of the enum below
// .env
// REACT_APP_APP_ENV=development
export enum Environments {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

export type Env = keyof typeof Environments;
