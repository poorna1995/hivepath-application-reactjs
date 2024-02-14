// checking for username availability
export const checkSlug = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://profile.hivepath.io/api/checkSlug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    //   if (resData && resData.status !== "success") {
    //     throw new Error(resData.message);
    //   }else{
    // result = resData.result;
    return { result: resData, error: error };
    //   }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// user profile onboarding stage 1 submit
export const startUserProfileOnboarding = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/userProfileOnboarding",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result;
      return { result: resData, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// for getting languages, looking for, and expertise data
export const autoSuggest = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://utils.hivepath.io/api/autoSuggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      return { result: resData.result, error: error, status: resData.status };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// for fetching user profile {user_id:""}
export const fetchUserProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/fetchUserProfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result;
      return { result: resData.result, status: resData.status, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// for fetching user data (basic)
export const fetchUserData = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://profile.hivepath.io/api/fetchUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// for adding education, experience, skill, social media links
export const addUserProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://profile.hivepath.io/api/userProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// updating user profile
export const updateUserProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/updateUserProfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result.profile_data;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// delete user profile section
export const deleteUserProfileSection = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/deleteUserProfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result.profile_data;
      return { result: result, status: resData.status, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

//  for submitting the user profile onboarding
export const submitProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/submitProfileOnboarding",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result;
      return { result: result, status: resData.status, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

// for fetching cover images
export const fetchCoverImages = async () => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://utils.hivepath.io/api/coverImageList",
      {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();

    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData.result;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const uploadImage = async (formData, user_id, type, category) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      `https://utils.hivepath.io/api/fileUpload?user_id=${user_id}&type=${type}&category=${category}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json(); // {file_path, message, status}
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      result = resData;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const getFlag = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://utils.hivepath.io/api/getFlag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      result = resData.result;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};
