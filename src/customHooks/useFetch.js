import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import authFetch from "utils/authFetch";

const useFetch = (url = "", info = {}, showSnackbar = false) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const enqueueSnackbar = useEnquequeSnackbar();
  const SUCCESS = "success" || "SUCCESS" || "Success";

  useEffect(() => {
    setIsLoading(true);
    authFetch(url, info)
      .then((json) => {
        if (json.status.toLowerCase() === SUCCESS) {
          setResponse(json.result);
          setIsLoading(false);
          if (showSnackbar)
            return enqueueSnackbar(json.message, {
              variant: "success",
            });
          return null;
        }

        enqueueSnackbar(json.message, {
          variant: "error",
        });
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.error(error);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  }, [url]);

  return { response, isLoading, error };
};

export default useFetch;
