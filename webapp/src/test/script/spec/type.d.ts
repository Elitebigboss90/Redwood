type Callback<T> = (err?: Error, result?: T) => void

declare namespace Model {
    interface User {
        id?: string
        username: string
        displayName?: string
        passwordHash?: string
        password?: string
        email: string
    }
}
