import {
  useLocation,
  useNavigate,
  type NavigateOptions,
  type To,
} from "react-router";

function useRouterUtils() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = (path: To, options?: NavigateOptions) =>
    navigate(path, options);
  const back = () => navigate(-1);
  return {
    handlerRoute: {
      navigation,
      back,
    },
    location: {
      state: location.state,
      pathName: location.pathname,
    },
  };
}

export default useRouterUtils;
