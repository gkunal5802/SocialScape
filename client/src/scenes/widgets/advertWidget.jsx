import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/flexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { ASSETURL } from "URLS/assetsUrl";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h5" fontWeight="500" color={dark}>
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="Advert"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        src={`${ASSETURL}/info4.jpeg`}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacomsetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and imaculate beauty and made sure your skin is
        exfoliating skin and shinning like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
