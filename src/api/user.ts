import { request, ServerResponse } from ".";

// Data required for creating a user
interface CreateUserData {
  email: string;
  full_name: string;
  password: string;
  captcha: string;
  confirm_password: string;
}

// Data required for signing in
interface SignInData {
  email: string;
  password: string;
}

// Create a new user
export async function createUser(
  data: CreateUserData
): Promise<ServerResponse> {
  let resp = await request({
    path: "/user",
    method: "POST",
    data: data,
  });

  return resp;
}

// Get the logged in user
export async function getCurrentUser(): Promise<ServerResponse> {
  let resp = await request({
    path: "/user",
    method: "GET",
  });

  return resp;
}

// Login the user with provided credentials
export async function loginUser(params: SignInData): Promise<ServerResponse> {
  let resp = await request({
    path: "/user/login",
    method: "POST",
    data: params,
  });

  return resp;
}
