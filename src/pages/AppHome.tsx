/** @jsx jsx */
import {jsx} from "@emotion/core";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/users";

import userTokenStore from "../stores/token";

export default function AppHome() {
  const [user, setUser] = useState();

  useEffect(() => {
    getCurrentUser().then(userData => {
      setUser(userData)
    }).catch(() => {
      setUser("error")
    })
  }, [userTokenStore.getState().token])

  if (!user) {
    return <div>
      <h1>Loading...</h1>
    </div>
  }

  if (user === "error") {
    return <div>
      <h1>Could not load user details</h1>
      <p>Try reload the page or contact joseph@josephbanks.me if the problem persists</p>
    </div>
  }

  return <div>
    <h1>Welcome back {user.data.full_name}</h1>
  </div>;
}
