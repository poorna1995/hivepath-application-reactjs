import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { convertArrayToObject } from "sections/AppPages/LandingPageSections/utils/arrayToObjects";
import { setNotifications } from "store/notifications/notifications.actions";

const useNotificationService = (requestData) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = "https://appnotification.hivepath.io/api/pullNotifications";
    setIsLoading(true);
    try {
      //   const response = await fetch(url, requestData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const recievedData = await response.json();
      if (recievedData.status === "success" && recievedData.result.length > 0) {
        const modifiedData = convertArrayToObject(
          recievedData.result,
          "object_id"
        );
        const filteredRead = recievedData.result.filter(
          (item) => item.read !== true
        );

        dispatch(
          setNotifications({
            notifications: { ...modifiedData },
            markAsReadAll: filteredRead.length > 0 ? false : true,
            unread: filteredRead.length,
            isLoading: false,
          })
        );
      } else {
        dispatch(
          setNotifications({
            notifications: {},
            markAsReadAll: true,
            isLoading: false,
          })
        );
      }
      setData(recievedData);
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return [isLoading, error, data, fetchData];
};

export default useNotificationService;
