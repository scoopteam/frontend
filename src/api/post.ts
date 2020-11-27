import { request, ServerResponse } from ".";

// Create a post with the provided parameters
export async function createPost(
    orgID: string,
    groupID: string,
    title: string,
    data: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group/${groupID}/post`,
        method: "POST",
        data: {
            title: title,
            content: data
        },
    });

    return resp;
}

// Fetch the posts on the users homepage
export async function getPostFeed(): Promise<ServerResponse> {
    let resp = await request({
        path: `/user/feed`,
        method: "GET"
    });

    return resp;
}
