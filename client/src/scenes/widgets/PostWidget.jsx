import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/flexBetween";
import Friend from "components/Friend";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import { setPost } from "state";
import * as api from "api/api";
import { ASSETURL } from "URLS/assetsUrl";

const PostWidget = ({
  postId,
  postUserId,
  name,
  location,
  description,
  likes,
  comments,
  picturePath,
  userPicturePath,
}) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    if (token) api.setAuthorizationHeader(token);
    const { data } = await api.updateLike(postId, { userId: loggedInUserId });

    dispatch(setPost({ post: data }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} mt="1rem">
        {description}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${ASSETURL}/${picturePath}`}
        />
      )}
      <FlexBetween gap="0.25rem">
        <FlexBetween gap="1rem">
          {/* LIKES SECTION */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          {/* COMMENT SECTION */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
