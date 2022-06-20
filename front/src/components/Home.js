import React, { useEffect } from "react";
import { readCookie } from "../utils/cookies";

function Home({ user }) {
  return (
    <div className="page home">
      <div className="inner">
        <div>{`hello ${user ? user.name : "user"}`}</div>
      </div>
    </div>
  );
}

export default Home;
