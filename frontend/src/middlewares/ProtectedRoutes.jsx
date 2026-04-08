
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { LoaderOne } from "@/components/ui/loader";


export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <LoaderOne />;

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}