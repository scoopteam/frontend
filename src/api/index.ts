import axios from "axios";

const API_INDEX = "https://scoop.gigalixirapp.com"

export interface RequestOptions {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    data?: Record<any, any>
}

export async function request(reqOption: RequestOptions) {
    let resp = await axios({
        method: reqOption.method,
        url: API_INDEX + reqOption.path,
        data: reqOption.data ? reqOption.data : null
    });

    return resp;
}
