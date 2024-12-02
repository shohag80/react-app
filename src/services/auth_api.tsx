import axios from "axios";

const SIGNUP_URL = "http://localhost:5000/api/v1/user/signup";
const LOGIN_URL = "http://localhost:5000/api/v1/user/login";

export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

// Signup a new user
export const createUser = async (user: User): Promise<User> => {
    const response = await axios.post(SIGNUP_URL, user);
    return response.data;
};

// Login user
export const loginUser = async (user: User): Promise<{ jwt_token: string }> => {
    const response = await axios.post(LOGIN_URL, user);
    return response.data;
};
