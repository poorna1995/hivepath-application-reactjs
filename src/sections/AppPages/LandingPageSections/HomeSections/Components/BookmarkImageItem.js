// background: #93828273;
//   z-index: 111;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

import check from "assets/svg/check.svg";

const BookmarkImageItem = ({ active, image, setImageUrl }) => {
  return (
    <div
      style={{ marginRight: "10px", cursor: "pointer", position: "relative" }}
      onClick={() => setImageUrl(image)}
    >
      {active && (
        <div
          style={{
            position: "absolute",
            background: "#93828273",
            width: "100%",
            height: "94%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={check}
            alt="selected image"
            style={{ height: "24px", width: "24px" }}
          />
        </div>
      )}

      <img
        src={image}
        style={{ height: "100px", width: "100px", borderRadius: "10px" }}
      />
    </div>
  );
};

export default BookmarkImageItem;
