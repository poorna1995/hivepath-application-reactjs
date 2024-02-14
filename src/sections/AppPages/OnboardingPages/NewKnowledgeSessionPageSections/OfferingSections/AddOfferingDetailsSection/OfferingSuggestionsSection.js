import { Container, IconButton, Typography } from "@mui/material";
import data from "data/UserProfilePage/offeringCategoryColor";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSessionSuggestionsListStart,
  setSessionDetailsFromSuggestions,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import authFetch from "utils/authFetch";

const mapState = ({ sessions }) => ({
  sessions: sessions,
});
const OfferingSuggestionsSection = ({ show, handleClick, category }) => {
  const { sessions } = useSelector(mapState);
  const dispatch = useDispatch();
  // const category = sessions.draftKnowledgeSession.category;
  const sessionSuggestionsList = sessions.sessionSuggestionsList;
  console.log({ category });

  useEffect(() => {
    const url = "https://utils.hivepath.io/api/fetchNewSessionSuggestions";
    const data = {
      category: category,
    };

    dispatch(fetchSessionSuggestionsListStart({ url, data }));
  }, [dispatch, category]);

  console.log(sessions);
  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100%",
        borderLeft: "1px solid rgba(0,0,0,0.1)",
        paddingBottom: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "21px",
            lineHeight: "27px",
            color: "#222222",
            flex: 1,
          }}
        >
          Suggested Offerings
        </Typography>
        <IconButton onClick={handleClick}>X</IconButton>
      </div>
      {Array.isArray(sessionSuggestionsList) &&
        sessionSuggestionsList.length > 0 &&
        sessionSuggestionsList.map((item) => {
          const { title, description, category } = item;
          return (
            <OfferingSuggestionListItem
              title={title}
              description={description}
              category={category}
              handleClick={handleClick}
            />
          );
        })}
    </Container>
  );
};

export default OfferingSuggestionsSection;

const OfferingSuggestionListItem = ({
  title,
  category,
  description,
  handleClick,
}) => {
  const dispatch = useDispatch();
  const handleAddSession = () => {
    dispatch(
      setSessionDetailsFromSuggestions({ title, category, description })
    );
    handleClick();
  };
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        paddingTop: "16px",
        paddingBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          flex: 1,
        }}
      >
        <div style={{ flex: 1 }}>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              lineHeight: "23px",
              color: "#333333",
            }}
          >
            {title}
          </Typography>
          <Typography
            style={{
              fontSize: " 14px",
              lineHeight: "18px",
              color: "#515151",
              marginBottom: "16px",
            }}
          >
            {category}
          </Typography>
        </div>
        <IconButton onClick={handleAddSession}>+</IconButton>
      </div>
      <Typography
        sx={{
          "> h1": {
            fontSize: "16px",
          },
        }}
        style={{
          fontSize: " 16px",
          lineHeight: "21px",
          color: "#333333",
        }}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></Typography>
    </div>
  );
};
