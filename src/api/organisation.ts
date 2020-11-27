import { request, ServerResponse } from ".";

// Data required for creating an organisation
interface CreateOrgData {
    name: string
}

// Membership of an organisation
export interface UserOrg {
    org: Organisation,
    permissions: string[]
}

// API response for an organisation
interface Organisation {
    // Unique identifier
    id: number,
    // Name of organisation
    name: string,
    // Code *may* be set if the user is an admin
    code?: string,
    // Same as code, member_count is set for admins
    member_count?: number
}

// Create a new organisation with provided data
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

// Get the organisations the user is a member of
export async function getUserOrganisations(): Promise<ServerResponse> {
    let resp = await request({
        path: "/org",
        method: "GET"
    });

    return resp;
}

// Join the organisation with provided code
export async function joinOrganisation(code: string): Promise<ServerResponse> {
    let resp = await request({
        path: "/org/join",
        method: "POST",
        data: {
            code,
        }
    });

    return resp;
}

// Fetch the organisation by ID
export async function getOrganisation(id: string): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${id}`,
        method: "GET"
    });

    return resp;
}

// Delete or leave the organisation (based on whether the user is an admin, decided by the backend)
export async function deleteOrLeaveOrganisation(id: string): Promise<ServerResponse> {
    let resp = await request({
        path: `/org/${id}`,
        method: "DELETE"
    });

    return resp;
}
