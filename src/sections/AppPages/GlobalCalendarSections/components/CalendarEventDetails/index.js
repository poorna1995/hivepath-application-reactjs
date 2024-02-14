import { IconButton } from "@mui/material";
import React from "react";
import HSAttendeeDetailsCard from "sections/AppPages/SessionsPageSections/HostSection/HSAttendeeDetailsCard";
import HappeningAtCard from "sections/AppPages/SessionsPageSections/SessionPageComponents/HappeningAtCard";
import RequestedAgenda from "sections/AppPages/SessionsPageSections/SessionPageComponents/RequestedAgenda";
import { MdClose } from "react-icons/md";

const GlobalCalendarEventDetails = ({ event = {}, handleClose }) => {
  const { userData, session_data } = event && event;
  const {
    company,
    first_name,
    image_url,
    last_name,
    profile_headline_description,
    role,
    slug_id,
  } = userData && userData;

  const userName = `${first_name} ${last_name}`;
  const userPosition = profile_headline_description || `${role} at ${company}`;
  const { session_id, title, category } = session_data && session_data;

  //   const { list, description } = session_data && session_data;
  const status = response.session_status.status_message;
  const approvedStatus = status === "approved";

  const userProfile = event.i_am
  return (
    <div style={{ padding: "8px" }}>
      <IconButton onClick={handleClose}>
        <MdClose />
      </IconButton>
      {event && userData && session_data && (
        <>
          <HSAttendeeDetailsCard
            userName={userName}
            userPosition={userPosition}
            profilePicUrl={image_url}
            sessionID={session_id}
            sessionTitle={title}
            sessionCategory={category}
            bookingDetails={event}
            // hostID={hostID}
            thumbnails={session_data && session_data.thumbnails}
            slug_id={slug_id}
            insideDrawer
            userProfile={userProfile}
          />

          <RequestedAgenda list={event.questions} insideDrawer />
          {approvedStatus && <HappeningAtCard />}
        </>
      )}
    </div>
  );
};

export default GlobalCalendarEventDetails;

const response = {
  start: "2022-03-23T07:00:00.000Z",
  end: "2022-03-23T07:30:00.000Z",
  formattedDate: "Wed, Mar 23, 2022",
  session_status: {
    message_tag: "",
    session_status: [
      {
        action_date: "2022-03-21T05:35:02.452819",
        status: true,
        title: "Request Received",
      },
      {
        action_date: "",
        status: false,
        title: "Request Accepted",
      },
      {
        action_date: "2022-03-23T07:00:00",
        status: false,
        title: "Session",
      },
      {
        action_date: "",
        status: false,
        title: "Feedback",
      },
    ],
    status_message: "request received",
  },
  userData: {
    company: "Hivepath",
    first_name: "Swastik",
    image_url: "",
    last_name: "Sharma",
    profile_headline_description: "Front end developer at Hivepath 🇮🇳🇮🇳🇮🇳🙃🙃",
    role: "React Developer",
    slug_id: "swastik1",
  },
  booking_id: "9bf1a396-a8d8-11ec-9821-1b571b719594",
  booking_status: "pending",
  created_on: "2022-03-21T05:34:42.435055",
  duration: 30,
  from_date: "2022-03-23",
  from_time: "07:00AM",
  owner_email: "mohit.mehta@hivepath.io",
  pre_requisites: [],
  requested_by: "62260a3592ae951246dfb2ae",
  requested_on: "2022-03-21T05:35:02.452792",
  requestor_email: "swastik@yopmail.com",
  session_data: {
    active: true,
    category: "Porfolio reviews",
    created_on: "2022-03-01T11:40:40.803278",
    current_offering_stage: {
      next_stage: "/onboarding/ks/add-headline",
      prev_stage: "/onboarding/ks/create/preview-sessions",
    },
    description:
      "<p>If you are someone who is nervous for their first career opportunity and is looking for guidance in how to act in a professional environment then I invite you to talk to me fo a clear understanding of the many aspects of career advancement.</p>\n",
    headline_description: "",
    offering_type: "Career growth",
    prerequisites: [],
    related_topics: ["Functional", "Material Ui", "Gatsby"],
    session_id: "621e0638764f60559b4dce04",
    status: "approved",
    thumbnails: ["https://utils.hivepath.io/api/file/image1646134878340.webp"],
    title: "10 Simple ways to get you started on a new career",
    type: "one-one",
    updated_on: "2022-03-09T12:48:20.787068",
    user_data: {
      company: "Hivepath",
      description: "Hi, I'm Mohit and I'm a web developer🕸️👨‍💻",
      email: "mohit.mehta@hivepath.io",
      first_name: "Mohit ",
      image_url: "",
      last_name: "Kumar",
      role: "Front End Developer",
      skills: [
        {
          object_id: "8457a27b-9952-11ec-9821-1b571b719594",
          rating: "Intermediate",
          skill_name: "Material Ui",
        },
      ],
    },
    user_id: "621e0233764f60559b4dcd52",
  },
  session_id: "621e0638764f60559b4dce04",
  session_owner: "621e0233764f60559b4dcd52",
  timezone: "UTC",
  to_date: "2022-03-23",
  to_time: "07:30AM",
  type: "one-one",
  updated_on: "2022-03-21T05:35:02.452814",
  wait_list: 1,
};
