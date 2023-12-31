import {
  EditOutlined,
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/flexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api/api";

const UserWidget = ({ userId, picturePath }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    if (token) api.setAuthorizationHeader(token);
    const { data } = await api.getUserData(userId);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // should return a loading spinner component
  if (!user) return null;

  const {
    firstName,
    lastName,
    location,
    friends,
    occupation,
    viewedProfile,
    impressions,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => {
          navigate(`/profile/${userId}`);
        }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {friends?.length} {friends?.length > 1 ? "friends" : "friend"}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Impressions of Your Post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
      {/* FOURTH */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" mb="1rem" color={main} fontWeight="500">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Typography color={main} fontWeight="500">
              Twitter
            </Typography>
            <Typography color={medium}>Social Network</Typography>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Typography color={main} fontWeight="500">
              LinkedIn
            </Typography>
            <Typography color={medium}>Network Platform</Typography>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
