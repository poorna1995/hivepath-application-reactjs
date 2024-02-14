export const updateNotificationService = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://appnotification.hivepath.io/api/updateNotifications",
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
      result = resData;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};

export const markAllAsReadService = async (input) => {
  let error = null;
  let result;
  try {
    const response = await fetch(
      "https://appnotification.hivepath.io/api/updateAllNotifications",
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
      result = resData;
      return { result: result, error: error };
    }
  } catch (err) {
    return { result: null, error: err.message || "Something went wrong!" };
  }
};
