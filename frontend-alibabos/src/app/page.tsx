"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default Home;
