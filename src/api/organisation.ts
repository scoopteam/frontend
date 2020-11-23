import { request, ServerResponse } from ".";

interface CreateOrgData {
    name: string
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
