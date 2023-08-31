import { Box } from "@mui/material";
import { ASSETURL } from "URLS/assetsUrl";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt="user"
        width={size}
        height={size}
        src={`${ASSETURL}/${image}`}
      />
    </Box>
  );
};

export default UserImage;
