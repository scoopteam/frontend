/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { getCurrentUser } from "../api/user";

import { useQuery } from "react-query";

import { ServerResponse } from "../api";
import { getUserOrganisations } from "../api/organisation";
import NoOrganisations from "../copy/NoOrganisations";
import { getPostFeed } from "../api/post";
import Post, { PostData } from "../components/Post";
import NoPosts from "../copy/NoPosts";

const headerNameStyle = css`
text-align: center;
font-size: 3em;
`

const postListStyle = css`
display: flex;
flex-direction: column;
`

export default function AppHome() {
  // Fetch the user, their organisations and the list of posts
  const { isLoading, error, data } = useQuery<ServerResponse[], Error>(
    "feedData",
    () => {
      return Promise.all([getCurrentUser(), getUserOrganisations(), getPostFeed()])
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

  const [userData, userOrgs, postFeed] = data!;

  if (data) {
    return (
      <div>
        <h1 css={headerNameStyle}>Welcome back {userData.data!.full_name}</h1>
        {/* Decide whether to display copy */}
        {userOrgs.data!.length === 0 ? <NoOrganisations/> : null }
        {postFeed.data!.length === 0 ? <NoPosts/> : null }

        {/* For each post create a post component */}
        <div css={postListStyle}>
          {postFeed.data!.map((post: PostData) => (
            <Post post={post} key={post.id}/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 css={headerNameStyle}>Received no information</h1>
    </div>
  );
}
