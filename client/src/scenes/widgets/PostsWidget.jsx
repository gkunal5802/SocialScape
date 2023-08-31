import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import * as api from "api/api";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    if (token) {
      api.setAuthorizationHeader(token);
    }
    const { data } = await api.fetchPosts();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    if (token) api.setAuthorizationHeader(token);
    const { data } = await api.fetchUserPosts(userId);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          likes,
          comments,
          picturePath,
          userPicturePath,
        }) => {
          return (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              location={location}
              description={description}
              likes={likes}
              comments={comments}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
            />
          );
        }
      )}
    </>
  );
};

export default PostsWidget;
