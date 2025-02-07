import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard"); // Redirect to the /dashboard page
  }, [router]);

  return null; // No visible content here
};

export default IndexPage;
