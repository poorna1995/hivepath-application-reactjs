import { Box, Button, Container, Grid } from "@mui/material";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import HivepathImage from "components/Common/HivepathImage";
import HivepathImageEditor from "components/Common/HivepathImageEditor";
import React from "react";
import KSOnboardingButtonRow from "../../NewKnowledgeSessionPageSections/components/KSOnboardingButtonRow";
import OnboardingSectionHeadings from "../../NewKnowledgeSessionPageSections/components/Typography/SectionHeadings";
import addThumbnailImage from "assets/svg/all/new-icons/ks-onboarding/create-offering/add-thumbnail.svg";

const AddEventThumbnailsPageSections = () => {
  return (
    <Box style={{ display: "flex", flex: 1 }}>
      <Container
        maxWidth={
          // img.length > 0 ? "lg" :
          "sm"
        }
        style={{
          paddingTop: "64px",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "150px",

            // position: "-webkit-sticky",
          }}
        >
          <div
            style={{
              marginRight: "16px",
            }}
          >
            <OnboardingSectionHeadings
              title={`Add Thumbnails to your offering`}
              description={`Add Atleast 1 photo`}
              containerStyles={{ marginBottom: "16px" }}
            />
            <Grid container style={{ paddingBottom: "128px" }}>
              <Grid
                item
                xs={12}
                md={
                  // img.length > 0 ? 6 :
                  12
                }
                style={{
                  background: "#FFFFFF",
                  border: "1px dashed rgba(0, 0, 0, 0.3)",
                  borderRadius: "10px",
                  display: "grid",
                  justifyContent: "center",
                  textAlign: "center",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  marginBottom: "16px",
                  // marginRight: "16px",
                }}
              >
                <img
                  src={addThumbnailImage}
                  alt=""
                  style={{ width: "100%", height: "80px" }}
                />
                <p>Add Thumbnails</p>
                <Button
                  style={{}}
                  // disabled={img.length >= 5}
                  // onClick={handleShowSuggestions}
                >
                  Upload From Presets
                </Button>
                <p>Or </p>
                {/* <label for="upload-image">Browse File</label>
            <input
              type={"image"}
              alt="selected image"
              name="upload-image"
              id="upload-image"
              disabled={img.length >= 5}
            /> */}

                <label
                  class="custom-file-upload"
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    cursor: "pointer",
                    color: "#484A9E",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      display: "none",
                    }}
                    // disabled={img.length >= 5}
                    // ref={inputRef}
                    // value={selectedFile}
                    // onChange={(e) => handleFileSelect(e)}
                  />
                  Browse File
                </label>
                {/* <Button disabled={img.length >= 5}>Browse File</Button> */}
              </Grid>
              {/* {img && (
            <>
              {img.map((item, index) => (
                <Grid item xs={12} md={6}>
                  {" "}
                  <HivepathImage
                    src={item}
                    alt=""
                    style={{
                      borderRadius: "16px",
                      maxWidth: "100%",
                      width: "100%",
                      height: "240px",
                      maxHeight: "240px",
                      marginLeft: index % 2 === 0 ? "16px" : "0px",
                      marginBottom: "16px",
                    }}
                  />
                </Grid>
              ))}
            </>
          )} */}
            </Grid>
          </div>
        </div>
      </Container>

      {/* {showSuggestions && (
    <Collapse in={showSuggestions}>
      <SelectThumbnailsFromPresets
        show={showSuggestions}
        handleClick={handleCloseSuggestions}
      />
    </Collapse>
  )} */}
      <HivepathImageEditor
      // show={showEditor}
      // src={getSrc}
      // onClose={handleCloseEditor}
      // onComplete={handleUploadImage}
      />
      {/* <HivepathImageEditor
    show={showSelectedFile}
    src={selectedFile}
    onClose={() => setShowSelectedFile(false)}
    onComplete={handleUploadImage}
  /> */}

      <KSOnboardingButtonRow
      // showPrimary
      // showSecondary
      // backURL={"/onboarding/ks/create/prerequisites"}
      // nextURL={"/onboarding/ks/create/preview-sessions"}
      // onClickPrimaryButton={handleSubmit}
      // disablePrimary={!img || img.length < 1}
      />
      {/* <LoadingBackdrop open={loading} handleClose={handleBackdropClose} /> */}
    </Box>
  );
};

export default AddEventThumbnailsPageSections;
