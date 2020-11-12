import axios from "axios";

const API_INDEX = process.env.NODE_ENV === "production" ? "https://scoop.gigalixirapp.com" : "http://localhost:4000";

export interface ServerResponse {
    status: "okay" | "error",
    message?: string
}

export interface RequestOptions {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    data?: Record<any, any>
}

export async function request(reqOption: RequestOptions): Promise<ServerResponse> {
    return new Promise((resolve, reject) => {
      axios.request({
          method: reqOption.method,
          url: API_INDEX + reqOption.path,
          data: reqOption.data ? reqOption.data : null,
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          }
      }).then(response => {
        resolve(response.data);
      }).catch(err => {
        if (!err.status) {
          return reject(err);
        }

        resolve(err.response);
      })
    })
}
