import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./flexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import * as api from "api/api";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { _id } = useSelector((state) => state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriends = friends?.find((friend) => friend._id === friendId);

  const patchFriends = async () => {
    if (token) api.setAuthorizationHeader(token);
    const { data } = await api.updateFriends(_id, friendId);
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            fontWeight="500"
            variant="h5"
            color={main}
            sx={{
              color: palette.primary.light,
              cursor: "pointer",
            }}
          >
            {name}
          </Typography>
          <Typography fontSize="0.75rem" color={medium}>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriends()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriends ? (
          <PersonRemoveOutlined sx={{ backgroundColor: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ backgroundColor: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
