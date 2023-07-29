import React, { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { useRouter } from "next/router";

const SignOut = () => {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/"),
  });

  useEffect(() => {
    // Anything that is return in a useEffect should be a clean up function
    // if curly brackets are not included, then what doRequest returns is neither
    // a function nor a cleanup thing and the code will break
    doRequest();
  }, []);

  return <div>Signing user out...</div>;
};

export default SignOut;
