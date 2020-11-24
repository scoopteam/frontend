import { request, ServerResponse } from ".";

interface CreateOrgData {
    name: string
}

export interface UserOrg {
    org: Organisation,
    permissions: string[]
}

interface Organisation {
    name: string,
    code?: string
}

export async function createOrganisation(
    data: CreateOrgData
): Promise<ServerResponse> {
    let resp = await request({
        path: "/org",
        method: "POST",
        data: data,
    });

    return resp;
}

export async function getUserOrganisations(): Promise<ServerResponse> {
    let resp = await request({
        path: "/org",
        method: "GET"
    });

    return resp;
}
