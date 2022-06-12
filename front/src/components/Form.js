import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Form() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <div className="form">
      <div>form</div>
      <input type="text" name="name" />
      <br />
      <input type="password" name="password" />
      <br />
      <button>send</button>
    </div>
  );
}
