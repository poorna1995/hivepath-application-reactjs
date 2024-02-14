import List from "@mui/material/List";
import FaqListItem from "./FaqListItem";

const FaqCollapsibleList = () => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {data.map((item, index) => {
        const { title, description } = item;
        return (
          <FaqListItem title={title} data={description} key={`fcli${index}`} />
        );
      })}
    </List>
  );
};

export default FaqCollapsibleList;

const data = [
  {
    title: "How do I verify my email address?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet ",
    id: 1,
  },
  {
    title:
      "How long does it take to approve my profile details for public view?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet ",
    id: 2,
  },
  {
    title:
      "Is it necessary to provide all my personal/professional details during User Profile onboarding?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet ",
    id: 3,
  },
  {
    title:
      "What is the maximum number of accounts that I can sync with my Hivepath calendar?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet ",
    id: 4,
  },
];
