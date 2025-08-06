import { Navigate, Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";

const ProtectedLayout = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    if(!isLoaded) {
    // Clerk is still loading — show loading spinner or nothing
        return null;
    }

    if(isLoaded && !isSignedIn){
    // Clerk finished checking and found no signed-in user
    // isLoaded == true mean -->> Auth statuses are: Signed In / Signed Out	/Session Expired / Session Invalid
    // !isSignedIn == true -->> not valid sign-in user		
    // Redirect or show login page
        return <Navigate to="/sign-in" />;
    }

    console.log(user);

    return <Outlet />
}

export default ProtectedLayout;