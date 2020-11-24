/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { getCurrentUser } from "../api/users";

import { useQuery } from "react-query";

import { ServerResponse } from "../api";
import { getUserOrganisations } from "../api/organisation";
import NoOrganisations from "../copy/NoOrganisations";

const headerNameStyle = css`
text-align: center;
font-size: 3em;
`

export default function AppHome() {
  const { isLoading, error, data } = useQuery<ServerResponse[], Error>(
    "feedData",
    () => {
      return Promise.all([getCurrentUser(), getUserOrganisations()])
    }
  );

  if (isLoading) {
    return (
      <div>
        <h1 css={headerNameStyle}>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Could not load user details</h1>
        <p>
          Try reload the page or contact joseph@josephbanks.me if the problem
          persists
        </p>
      </div>
    );
  }

  const [userData, userOrgs] = data!;

  if (data) {
    return (
      <div>
        <h1 css={headerNameStyle}>Welcome back {userData.data!.full_name}</h1>
        {userOrgs.data!.length === 0 ? <NoOrganisations/> : null }
      </div>
    );
  }

  return (
    <div>
      <h1 css={headerNameStyle}>Received no information</h1>
    </div>
  );
}
