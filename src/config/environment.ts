function getEnv(name:string): string{
    const value = process.env[name];
    if(!value){
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}

export const ENV = {
    API_KEY: getEnv("API_KEY"),
    PORT: parseInt(getEnv("PORT")),
    DB_NAME: getEnv("DB_NAME"),
    DB_USER: getEnv("DB_USER"),
    DB_PASSWORD: getEnv("DB_PASSWORD"),
    DB_HOST: getEnv("DB_HOST"),
    DB_PORT: parseInt(getEnv("DB_PORT")),
    MAIL_API_KEY: getEnv("MAIL_API_KEY"),
};