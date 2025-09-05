import { Outlet } from "react-router-dom";
import Toast from "ui/dataDisplay/toast";
import Modal from "ui/dataDisplay/modal";
import Box from "ui/layout/box";
import useRouterUtils from "@/hooks/useRouterUtils";
import { useMemo } from "react";
import { Config } from "@/configs";
import type { TPath } from "@/configs/path";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function ThemeColor() {
  const { location } = useRouterUtils();

  console.log("ThemeColorThemeColorThemeColorThemeColor");
  const title = useMemo(() => {
    const paths: TPath[] = Object.values(Config.Path);
    const item = paths.find((i) => i.url === location.pathName);

    return item || paths?.[0];
  }, [location]);

  useDocumentTitle(title.title);

  return (
    <Box className="dark" id="wrapper">
      <Outlet />
      <Toast />
      <Modal />
    </Box>
  );
}

export default ThemeColor;
