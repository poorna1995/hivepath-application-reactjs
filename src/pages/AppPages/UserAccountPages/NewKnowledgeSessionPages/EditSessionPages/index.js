import { Box, Button, Collapse } from "@mui/material";
import React, { useState } from "react";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import AppHeader from "components/AppHeader";
import Seo from "components/Seo";
import { Toolbar, Container } from "@mui/material";
import EditOfferingCategorySection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditOfferingCategorySections";
import EditAboutOfferingDetailsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditAboutOfferingDetailsSection";
import EditRelatedTopicsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditRelatedTopicsSection";
import EditPrerequisitesSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditPrerequisitesSection";
import EditThumbnailsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditThumbnailsSection";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import { useHistory } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import NewEditOfferingTypesSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditOfferingCategorySections/NewEditOfferingTypesSection";
import NewEditRelatedTopicsSection from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/EditOfferingSessionSection/EditRelatedTopicsSection/NewEditRelatedTopicsSection";
import OfferingSuggestionsSection from "sections/AppPages/OnboardingPages/NewKnowledgeSessionPageSections/OfferingSections/AddOfferingDetailsSection/OfferingSuggestionsSection";
import { useSelector, useDispatch } from "react-redux";

import { setShowSuggestionsSection } from "store/dialogs/dialogsSlice";
import SuggestionDrawer from "components/Common/Drawers/SuggestionDrawer";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
const mapState = ({ dialogs, sessions, loaders }) => ({
  showSuggestions: dialogs.showSuggestionsSection,
  editSession: sessions.editSession,
  loading: loaders.sectionLoader,
});

const EditSessionPages = () => {
  const { showSuggestions, editSession, loading } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleBackNavigation = () => {
    history.push("/u/account/manage-sessions");
  };
  const handleOpenSuggestions = () => {
    // dispatch(setShowSuggestionsSection(!showSuggestions));
    setOpen(!open);
  };

  const handleCloseSuggestions = () => {
    // dispatch(setShowSuggestionsSection(false));
    setOpen(!open);
  };

  const data = [
    {
      id: 0,
      label: "Topic",
      component: (
        <div
          style={{
            paddingTop: "32px",
          }}
        >
          {" "}
          <NewEditOfferingTypesSection />
        </div>
      ),
    },
    {
      id: 1,
      label: "Details",
      component: (
        <div
          style={{
            paddingTop: "32px",
          }}
        >
          <EditAboutOfferingDetailsSection
            handleOpenSuggestions={handleOpenSuggestions}
          />
        </div>
      ),
    },
    {
      id: 2,
      label: "Edit keywords",
      component: (
        <div
          style={{
            paddingTop: "32px",
          }}
        >
          {" "}
          <NewEditRelatedTopicsSection />
        </div>
      ),
    },
    {
      id: 3,
      label: "Prerequisites",
      component: (
        <div
          style={{
            paddingTop: "32px",
          }}
        >
          {" "}
          <EditPrerequisitesSection />
        </div>
      ),
    },
    {
      id: 4,
      label: "Thumbnails",
      component: (
        <div
          style={{
            paddingTop: "32px",
          }}
        >
          {" "}
          <EditThumbnailsSection />
        </div>
      ),
    },
  ];

  return (
    <Box style={{ background: "white", minHeight: "100vh" }}>
      <AppHeader position={"fixed"} isSettings />
      <Toolbar style={{ height: "80px" }} />

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <Box
          maxWidth="lg"
          style={{
            flex: 1,
            marginLeft: "auto",
            marginRight: "auto",
            position: open && "sticky",
            top: "90px",
          }}
        >
          <div
            style={
              {
                // position: "sticky",
                // top: "100px",
                // marginTop: "16px",
              }
            }
          >
            <Button
              title="Manage sessions"
              onClick={handleBackNavigation}
              sx={{
                textTransform: "capitalize",
                fontSize: "24px",
                fontWeight: 700,
                color: "black",
                // marginTop: "16px",
                "&:hover": {
                  background: "none",
                },
              }}
              startIcon={<FaChevronLeft />}
            >
              Manage sessions
            </Button>
          </div>

          <div
            style={
              {
                // paddingTop: "32px",
                // display: "flex",
                // marginTop: "16px",
              }
            }
          >
            <BasicTabs
              data={data}
              centered
              tabsProps={{ centered: true }}
              //  tabBorderBottom
            />
          </div>
        </Box>

        <SuggestionDrawer
          open={open}
          closeDrawer={handleCloseSuggestions}
          anchor={"right"}
          component={
            <div
              style={{
                paddingTop: "32px",
              }}
            >
              <OfferingSuggestionsSection
                show={open}
                handleClick={handleCloseSuggestions}
                category={editSession.category}
              />
            </div>
          }
          BackdropProps={{
            style: {
              background: "none",
            },
          }}
          sx={{
            "& .MuiPaper-root": {
              boxShadow: "none",
              border: "1px solid rgba(0,0,0,0.1)",
              maxWidth: "320px",
            },
          }}
        />

        {/* 
        {open && (
          <Collapse
            in={open}
            sx={{
              width: "20%",
            }}
          >
            <OfferingSuggestionsSection
              show={open}
              handleClick={handleCloseSuggestions}
              category={editSession.category}
            />
          </Collapse>
        )} */}
      </div>
      {/* {console.log({ open })} */}
      <LoadingBackdrop open={loading} />
    </Box>
  );
};

export default EditSessionPages;
