import { request, ServerResponse } from ".";

interface CreateUserData {
  email: string;
  full_name: string;
  password: string;
  captcha: string;
  confirm_password: string;
}

interface SignInData {
  email: string;
  password: string;
}

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

export async function getCurrentUser(): Promise<ServerResponse> {
  let resp = await request({
    path: "/user",
    method: "GET",
  });

  return resp;
}

export async function loginUser(params: SignInData): Promise<ServerResponse> {
  let resp = await request({
    path: "/user/login",
    method: "POST",
    data: params,
  });

  return resp;
}
