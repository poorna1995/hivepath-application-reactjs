import "../styles.css";
import BookmarkImageItem from "./BookmarkImageItem";

const BookmarkImagesContainer = ({ selectedImage, setImageUrl }) => {
  const imagesArray = [
    "https://utils.hivepath.io/api/file/abstract_(3)1640758167088.png",
    "https://utils.hivepath.io/api/file/abstract_(4)1640758167115.png",
    "https://utils.hivepath.io/api/file/abstract_(2)1640758167144.png",
    "https://utils.hivepath.io/api/file/abstract_(10)1640758167352.png",
  ];
  return (
    <div className="scrollRow" style={{ paddingTop: "0", paddingBottom: "0" }}>
      {imagesArray.map((item, index) => {
        const active = item === selectedImage ? true : false;
        return (
          <BookmarkImageItem
            key={`bmImage${index}`}
            active={active}
            image={item}
            setImageUrl={setImageUrl}
          />
        );
      })}
    </div>
  );
};

export default BookmarkImagesContainer;
