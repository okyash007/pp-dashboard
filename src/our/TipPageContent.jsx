import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

async function getTipPage(token) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/tip-page`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data.success) {
      return null;
    }
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const TipPageContent = () => {
  const { token } = useAuthStore();
  useEffect(() => {
    getTipPage(token).then((data) => {
      // console.log(data);
    });
  }, [token]);
  return <div>TipPageContent</div>;
};

export default TipPageContent;
