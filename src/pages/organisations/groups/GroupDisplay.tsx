/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";

import { useQuery, useQueryCache } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { ServerResponse } from "../../../api"
import { deleteGroup, getGroup, joinGroup, leaveGroup } from "../../../api/group";
import { getOrganisation } from "../../../api/organisation";
import colours from "../../../colours";
import Button from "../../../components/Button";

export default function DisplayGroup() {
    const history = useHistory();
    const [, setRerender] = useState<number>();
    const queryCache = useQueryCache();
    const { organisation_id, group_id } = useParams<{ organisation_id: string, group_id: string }>();

    const { isLoading, error, data } = useQuery<ServerResponse[], Error>(
        `organisation-group-${organisation_id}-${group_id}`,
        () => Promise.all([getOrganisation(organisation_id), getGroup(organisation_id ,group_id)])
    );

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h3>Could not load org information</h3>
    }

    const [orgData, groupData] = data!;

    const isOwner = orgData!.data!.permissions.indexOf("owner") !== -1 || orgData!.data!.permissions.indexOf("admin") !== -1;

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            text-align: center;
        `}>
            <h1 css={{fontSize: "3em"}}>{groupData!.data!.name}</h1>
            {isOwner ? (
                <div>
                    <p>Auto-join: {groupData!.data!.auto_subscribe ? "Enabled" : "Disabled"}</p>
                    <p>Public group: {groupData!.data!.public ? "Enabled" : "Disabled"}</p>
                </div>
            ) : null}

            {groupData!.data!.joined === false ? <div>
                <Button colour={colours.greenSheen} onClick={() => {
                    joinGroup(orgData!.data!.org.id, groupData!.data!.id).then(() => {
                        queryCache.invalidateQueries(`organisation-group-${organisation_id}-${group_id}`);
                        setRerender(Math.random());
                    });
                }}>Join group</Button>
            </div> : <Button colour={colours.softRed} onClick={() => {
                leaveGroup(orgData!.data!.org.id, groupData!.data!.id).then(() => {
                    queryCache.invalidateQueries(`organisation-group-${organisation_id}-${group_id}`);
                    if (!groupData!.data!.public && !isOwner) {
                        history.push(`/orgs/${organisation_id}/groups`);
                    } else {
                        setRerender(Math.random());
                    }
                });
            }}>Leave group</Button>}

            {isOwner ? (
                <div>
                    <Button colour={colours.softRed} onClick={() => {
                        deleteGroup(orgData!.data!.org.id, groupData!.data!.id).then(() => {
                            queryCache.invalidateQueries(`organisation-group-${organisation_id}-${group_id}`);
                            history.push(`/orgs/${organisation_id}/groups`);
                        });
                    }}>Delete group</Button>
                    <Button colour={colours.greenSheen} onClick={() => history.push(document.location.pathname + "/invite")}>Add users</Button>
                    <Button colour={colours.greenSheen} onClick={() => history.push(document.location.pathname + "/post")}>Write post</Button>
                </div>
            ) : null}
        </div>
    );
}
