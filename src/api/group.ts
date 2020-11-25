import { request, ServerResponse } from ".";

interface CreateGroupData {
    name: string,
    public: boolean,
    auto_subscribe: boolean
}

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

export async function getAllGroups(
    orgID: string
): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${orgID}/group`,
        method: "GET"
    });

    return resp;
}

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
