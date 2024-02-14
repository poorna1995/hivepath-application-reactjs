import BookmarkedProfileCard from "./Components/BookmarkedProfileCard";
import img1 from "assets/images/placeholder-images/img1.png";
import img2 from "assets/images/placeholder-images/img2.png";
import img3 from "assets/images/placeholder-images/img3.png";
import noBookmarkProfile from "assets/svg/all/new-icons/empty-states/bookmarks/no-bookmark-profile.svg";
import { useSelector } from "react-redux";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import LPUserProfileCard from "../HomeSections/Components/LPUserProfileCard";

const mapState = ({ landingPage }) => ({
  bookmarkedProfiles: landingPage.bookmarks.profiles || {},
});
const BookmarkedProfilesList = ({ isLoading }) => {
  const { bookmarkedProfiles } = useSelector(mapState);
  const profiles = [];

  for (const bookmark_name in bookmarkedProfiles) {
    const categorisedProfiles = bookmarkedProfiles[bookmark_name].data;
    categorisedProfiles.forEach((item) => {
      if (!item.unbookmarked) {
        profiles.push(
          // <LPUserProfileCard
          //   key={item.object_id}
          //   data={item}
          //   bookmark_name={bookmark_name}
          //   imgUrl
          //   userName
          //   designation
          //   user_id
          //   slug_id
          //   bookmark_done
          //   bookmark_id
          // />
        );
      }
    });
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {!isLoading && profiles.length === 0 && (
        <BaseEmptyStateComponent
          imgSrc={noBookmarkProfile}
          buttonTitle={`Explore`}
          message={`You currently don't  have any saved profiles!`}
          shortDescription={`Find amazing people`}
        />
      )}

      {!isLoading && profiles}
    </div>
  );
};

export default BookmarkedProfilesList;
