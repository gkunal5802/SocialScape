import { Box, useMediaQuery } from "@mui/material";
import NavBar from "../navBar/index.jsx";
import UserWidget from "scenes/widgets/userWidgets.jsx";
import { useSelector } from "react-redux";
import MyPostWidget from "scenes/widgets/myPostWidget.jsx";
import PostsWidget from "scenes/widgets/PostsWidget.jsx";
import AdvertWidget from "scenes/widgets/advertWidget.jsx";
import FriendListWidget from "scenes/widgets/friendListWidget.jsx";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
