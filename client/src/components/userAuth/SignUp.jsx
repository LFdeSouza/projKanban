import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon, KeyIcon, MailIcon } from "@heroicons/react/solid";
import { registerUser } from "../../redux/actions/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, password));
    clearFields();
  };

  return (
    <section className="absolute inset-0 bg-gunmetal-300 -z-10">
      <form
        className="w-[20rem] mt-32 mx-auto space-y-4 flex flex-col justify-center items-center"
        onSubmit={(e) => onSubmit(e)}
      >
        <p className="text-4xl mb-4 font-semibold text-white ">Sign up</p>
        <div className="relative w-full rounded shadow-lg">
          <input
            className="p-1 pl-8 w-full rounded "
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <UserIcon className="w-5 h-5 absolute top-1.5 left-2  text-gunmetal-400" />
        </div>
        <div className="relative w-full rounded shadow-lg">
          <input
            className="p-1 pl-8 w-full rounded "
            type="text"
            placeholder="Enter a valid email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MailIcon className="w-5 h-5 absolute top-1.5 left-2 text-gunmetal-400" />
        </div>
        <div className="relative w-full rounded shadow-lg">
          <input
            className="p-1 pl-8 w-full rounded "
            type="password"
            placeholder="Please enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <KeyIcon className="w-5 h-5 absolute top-1.5 left-2 text-gunmetal-400" />
        </div>
        <button
          className="p-1 w-full rounded bg-indigo-600 text-gray-50 "
          type="submit"
        >
          Sign up
        </button>
      </form>
    </section>
  );
};

export default SignUp;
