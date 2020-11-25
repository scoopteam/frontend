import { getgroups } from "process";
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
        path: `/org/${orgID}/group/all`,
        method: "GET"
    });

    return resp;
}
