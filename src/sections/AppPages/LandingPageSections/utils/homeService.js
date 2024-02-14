// for fetching user data (basic)
export const fetchUpcomingHostSessions = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://auth.hivepath.io/api/fetchAllUpcomingSessions",
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
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const fetchRecommendedSessions = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://landingpage.hivepath.io/api/recommendedOfferings",
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
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const fetchUserProfiles = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://landingpage.hivepath.io/api/recommendedHosts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
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

export const createBookmark = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/createBookmark",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      // result = resData.result;
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const updateBookmark = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/updateBookmark",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      // result = resData.result;
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const fetchBookmarkList = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/fetchBookmarks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
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

export const deleteBookmark = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/deleteBookmark",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
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

export const uploadBookmarkImage = async (formData, user_id) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      `https://utils.hivepath.io/api/fileUpload?user_id=${user_id}&type=bookmark&category=bookmark`,
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
      console.log(resData);
      // success is handled here
      result = resData;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const bookmarkSession = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/bookmarkSession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      // result = resData.result;
      return {
        result: true,
        bookmark_object_id: resData.bookmark_object_id,
        error: error,
      };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const unbookmarkSession = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/unbookmarkSession",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const bookmarkProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/bookmarkProfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const unbookmarkProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/unbookmarkProfile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const fetchBookmarkedSessions = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://ks.hivepath.io/api/showMyBookmarkedSessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
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

export const fetchBookmarkedProfiles = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://profile.hivepath.io/api/showMyBookmarkedProfiles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    if (!response.ok) {
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

export const followProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://profile.hivepath.io/api/followUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const unfollowProfile = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch("https://profile.hivepath.io/api/unfollowUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const resData = await response.json();
    if (resData && resData.status !== "success") {
      throw new Error(resData.message);
    } else {
      // success is handled here
      return { result: true, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};
