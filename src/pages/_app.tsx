import "../styles/globals.css"; // Correct path for global styles
import type { AppProps } from "next/app";
import RootLayout from "@/components/layout/RootLayout"; // Import RootLayout

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
