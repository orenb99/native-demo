import React, { useEffect } from "react";
import { readCookie } from "../utils/cookies";

function Home({ user, getUser }) {
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="home">
      <div>{`hello ${user ? user.name : "user"}`}</div>
      <div></div>
    </div>
  );
}

export default Home;
