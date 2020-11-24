/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { History } from "history";

import { QueryCache, useQuery, useQueryCache } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { ServerResponse } from "../../api"
import { deleteOrLeaveOrganisation, getOrganisation } from "../../api/organisation";
import colours from "../../colours";
import Button from "../../components/Button";

function deleteOrgMembership(orgID: string, history: History, queryCache: QueryCache) {
    deleteOrLeaveOrganisation(orgID).then(() => {
        history.push("/orgs");
        queryCache.invalidateQueries("userOrganisations")
    })
}

export default function DisplayOrganisation() {
    const history = useHistory();
    const queryCache = useQueryCache();
    const { id } = useParams<{ id: string }>();

    const { isLoading, error, data } = useQuery<ServerResponse, Error>(
        `organisation-${id}`,
        () => getOrganisation(id)
    );

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h3>Could not load org information</h3>
    }

    const isOwner = data!.data!.permissions.indexOf("owner") !== -1;

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            text-align: center;
        `}>
            <h1 css={{fontSize: "3em"}}>{data!.data!.org.name}</h1>
            {data!.data!.org.code ? 
                <span css={css`
                    * {
                        display: inline;
                        vertical-align: middle;
                        font-size: 2em;
                    }

                    pre {
                        background-color: ${colours.lightGrey};
                        padding: 5px;
                    }
                `}>
                    <p>Join code is </p>
                    <pre css={{fontSize: "3em"}}>{data!.data!.org.code}</pre>
                </span>
            : null}


            <Button colour={colours.softRed} onClick={() => deleteOrgMembership(data!.data!.org.id, history, queryCache)}>{isOwner ? "Delete organisation" : "Leave organisation"}</Button>
        </div>
    );
}
