// AppLoader.tsx
import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen"; // Adjust path as needed
import App from "./App"; // Your main app component with routes

const AppLoader = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <>
      {!isLoadingComplete && (
        <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />
      )}
      {isLoadingComplete && <App />}
    </>
  );
};

export default AppLoader;
