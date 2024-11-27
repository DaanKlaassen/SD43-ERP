/*
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
]

/*
 * An array of routes that are used for authentication
 * These routes will redirect logged-in users to /home
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/registration",
]

/*
 * The prefix for api authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after a successful login
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"