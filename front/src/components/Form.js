import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Form() {
  const submit = (e) => {
    e.preventDefault();
    
  };
  return (
    <div className="form">
      <div className="inner-form">
        <form onSubmit={submit}>
          <div className="row">
            <label for="name">name:</label>
            <input type="text" name="name" />
          </div>
          <div className="row">
            <label for="email">email:</label>
            <input type="text" name="email" />
          </div>
          <div className="row">
            <label for="password">password:</label>
            <input type="password" name="password" />
          </div>
          <div className="row">
            <input type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
}
