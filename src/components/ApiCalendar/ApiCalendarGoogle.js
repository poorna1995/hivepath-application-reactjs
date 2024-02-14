import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

const DISCOVERY_DOCS =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const ApiCalendarGoogle = () => {
  const [events, setEvents] = useState(null);

  const CLIENT_ID =
    "300377652705-vtn53kvm8dioq8h8oj7f9en9s8k7r490.apps.googleusercontent.com";
  const API_KEY = "AIzaSyC3IgVSTsBIG4aa0KcBtaBiENKVnFAnlqs";
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);
    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);
  const handleClientLoad = () => {
    window.gapi.load("client:auth2", initClient);
  };

  const openSignInPopup = () => {
    window.gapi.auth2.authorize(
      { client_id: CLIENT_ID, scope: SCOPES },
      (res) => {
        if (res) {
          if (res.access_token)
            localStorage.setItem("access_token", res.access_token);

          // Load calendar events after authentication
          window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        }
      }
    );
  };

  const initClient = () => {
    const gapi = window.gapi;

    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        // discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then((res) => {
          console.log(res);
          listUpcomingEvents();
        })
        .catch((err) => console.log(err));
    });
  };

  const listUpcomingEvents = () => {
    const gapi = window.gapi;

    gapi.load("calendar", "v3", () => console.log("Calendar loaded"));

    gapi?.client?.calendar?.events
      .list({
        // Fetch events from user's primary calendar
        calendarId: "primary",
      })
      .then(function (response) {
        let events = response;

        console.log(response);
      });
  };
  return (
    <div>
      <Button onClick={openSignInPopup}>Open PopUp</Button>
      <Button onClick={handleClientLoad}>Init Client</Button>
      <Button onClick={listUpcomingEvents}>List Events</Button>
      {events}
    </div>
  );
};

export default ApiCalendarGoogle;
