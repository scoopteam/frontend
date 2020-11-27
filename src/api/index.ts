import axios from "axios";

import userTokenStore from "../stores/token";

// Set the API to the production server when running in production, alternatively set it to localhost.
const API_INDEX = process.env.NODE_ENV === "production" ? "https://api.myscoop.dev" : "http://localhost:4000";

// Structure for a response from the server
export interface ServerResponse {
    // Status will always be set to either "okay" or "error"
    status: "okay" | "error",
    // Message is typically set for errors
    message?: string,
    // Data is always an object/list of a structure
    data?: Record<string, any>,
    // Errors will be set if a form error occurs
    errors?: Record<string, any>
}

export interface RequestOptions {
    // Supported HTTP verbs
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    // Path for the API request
    path: string,
    data?: Record<any, any>
}

// Send a request to the API
export async function request(reqOption: RequestOptions): Promise<ServerResponse> {
    return new Promise((resolve, reject) => {
      axios.request({
          // Select the HTTP verb
          method: reqOption.method,
          // Create the path based on the API index
          url: API_INDEX + reqOption.path,
          // If the request data is passed (e.g. POST, PATCH) then pass it
          data: reqOption.data ? reqOption.data : null,
          headers: {
            // If a token is saved in the token store, set it in the Authorization header
            "Authorization": userTokenStore.getState().token
          }
      }).then(response => {
        // Resolve with the response data
        resolve(response.data);
      }).catch(err => {
        // Error with the error data.
        reject(err);
      })
    })
}
