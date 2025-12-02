import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <h3 className="">Welcome Back</h3>
      <p className="">Please enter your details to log in</p>
    </div>
  );
};

export default Login;
