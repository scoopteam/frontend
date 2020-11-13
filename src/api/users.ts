import { request, ServerResponse } from ".";

import userTokenStore from "../stores/token";

interface CreateUserData {
    email: string,
    full_name: string,
    password: string,
    captcha: string,
    confirm_password: string
}

export async function createUser(data: CreateUserData): Promise<ServerResponse> {
    let resp = await request({
      path: "/user",
      method: "POST",
      data: data
    });

    return resp
}

export async function getCurrentUser() {
  let resp = await request({
    path: "/user",
    method: "GET"
  });

  return resp
}
