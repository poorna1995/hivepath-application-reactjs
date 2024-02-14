import FormSelectInput from "components/Common/Inputs/SelectInput";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import authFetch from "utils/authFetch";

const YSCategories = ({ category, handleChange, ...props }) => {
  //   const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_SESSION_CATEGORIES;
    const data = {
      type: "one-one",
      title: "category",
    };

    authFetch(url, data).then((json) => {
      // console.log("json categories", json.result);
      setCategories(json.result);
    });
  }, []);

  const options = categories.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  return (
    <div>
      <FormSelectInput
        title="Category"
        options={options}
        value={category}
        onChange={handleChange}
        noPadding
        {...props}
      />
    </div>
  );
};

export default YSCategories;
