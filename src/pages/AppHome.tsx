/** @jsx jsx */
import { jsx } from "@emotion/core";
import { getCurrentUser } from "../api/users";

import { useQuery } from "react-query";

export default function AppHome() {
  const { isLoading, error, data } = useQuery("userData", () =>
    getCurrentUser()
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
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

  return (
    <div>
      <h1>Welcome back {data!.data.full_name}</h1>
    </div>
  );
}
