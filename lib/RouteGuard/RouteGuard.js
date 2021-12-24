import { useEffect } from "react";
import { LoginSkeleton } from "../../components/Skeleton";
import { useAuth } from "../contexts/AuthContext";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const RouteGuard = ({ router, children, pathIsProtected }) => {
  //Identify authenticated user
  // const authContext = useContext(AuthContext);
  const [state] = useAuth();
  const { accessToken } = state;
  const isAuthenticated = accessToken ? true : false;

  // let unprotectedRoutes = [appRoutes.LOGIN_PAGE];

  // /**
  //  * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
  //  */
  // let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  useEffect(() => {
    if (isBrowser() && !isAuthenticated && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("/login");
      return <LoginSkeleton />;
    }
  }, [accessToken, pathIsProtected]);

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push("/login");
    return <LoginSkeleton />;
  }

  return children;
};

export default RouteGuard;
