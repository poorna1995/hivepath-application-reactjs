import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";
import authFetch from "utils/authFetch";

const fetchMySessions = (data = {}) => {
  const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_ALL_USER_OFFERING
  // `${process.env.REACT_APP_HIVEPATH_AUTH_API_URL}/fetchUserOffering`;

  const result = authFetch(url, data)
    .then((json) => {
      if (json.status === "success") {
        return json;
      }
    })
    .catch((err) => err);
  return result;
};

export default fetchMySessions;
