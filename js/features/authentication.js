const USERS_KEY =
    "netflix_users";

const CURRENT_USER_KEY =
    "netflix_current_user";



function getUsers() {

    const data =
        localStorage.getItem(
            USERS_KEY
        );


    return data
        ? JSON.parse(data)
        : [];

}



function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}



export function register(
    name,
    email,
    password
) {

    const users =
        getUsers();


    email =
        email.trim().toLowerCase();


    const existing =
        users.find(
            user =>
                user.email === email
        );


    if (existing) {

        return {

            success: false,

            message:
                "An account with this email already exists."

        };

    }


    const user = {

        id: Date.now(),

        name:
            name.trim(),

        email,

        password,

        createdAt:
            new Date().toISOString()

    };


    users.push(user);


    saveUsers(users);


    return {

        success: true,

        message:
            "Account created successfully."

    };

}



export function login(
    email,
    password
) {

    const users =
        getUsers();


    email =
        email.trim().toLowerCase();


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!user) {

        return {

            success: false,

            message:
                "Invalid email or password."

        };

    }


    const currentUser = {

        id: user.id,

        name: user.name,

        email: user.email

    };


    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(
            currentUser
        )
    );


    return {

        success: true,

        user: currentUser

    };

}



export function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

}



export function getCurrentUser() {

    const data =
        localStorage.getItem(
            CURRENT_USER_KEY
        );


    return data
        ? JSON.parse(data)
        : null;

}



export function isLoggedIn() {

    return (
        getCurrentUser() !== null
    );

}