import { request, ServerResponse } from ".";

// Structure for creating groups
interface CreateGroupData {
    // Group name
    name: string,
    // Whether the group should be public
    public: boolean,
    // Whether users should automatically join the group when they join the organisation
    auto_subscribe: boolean
}

// Create a group with the provided parameters
export async function createGroup(
    orgID: string,
    data: CreateGroupData
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group`,
        method: "POST",
        data: data,
    });

    return resp;
}

// Get all the user groups
export async function getAllGroups(
    orgID: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group`,
        method: "GET"
    });

    return resp;
}

// Get a group by ID
export async function getGroup(
    orgID: string,
    groupID: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group/${groupID}`,
        method: "GET"
    });

    return resp;
}

// Join a group
export async function joinGroup(
    orgID: string,
    groupID: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group/${groupID}`,
        method: "PATCH"
    });

    return resp;
}

// Leave a group
export async function leaveGroup(
    orgID: string,
    groupID: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group/${groupID}`,
        method: "DELETE",
        data: {
            delete: false
        }
    });

    return resp;
}

// Delete a group
export async function deleteGroup(
    orgID: string,
    groupID: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group/${groupID}`,
        method: "DELETE",
        data: {
            delete: true
        }
    });

    return resp;
}

// Call the bulk add endpoint with a list of emails
export async function bulkAdd(
    orgID: string,
    groupID: string,
    emails: string[]
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group/${groupID}/bulk_add`,
        method: "POST",
        data: {
            users: emails
        }
    });

    return resp;
}
