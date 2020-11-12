import { request, ServerResponse } from ".";

interface CreateUserData {
    email: string,
    full_name: string,
    password: string,
    captcha: string,
    confirm_password: string
}

export async function createUser(data: CreateUserData): Promise<ServerResponse> {
    let resp = await request({
      path: "/users",
      method: "POST",
      data: data
    });

    console.log(resp);

    return {
      status: "okay"
    }
}
