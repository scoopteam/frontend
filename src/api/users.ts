interface ServerResponse {
    status: "okay" | "error",
    message?: string
}

interface CreateUserData {
    email: string,
    full_name: string,
    password: string,
    captcha: string,
    confirm_password: string
}

export async function createUser(data: CreateUserData): Promise<ServerResponse> {
    return {
        status: "okay"
    }
}
