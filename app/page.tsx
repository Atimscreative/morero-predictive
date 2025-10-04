"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=  useRouter()
  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-app-secondary font-bold text-2xl text-center">Welcome to Morero Predictive analysis</h1>
      <Button onClick={() => router.push("/projects")} className="bg-app-primary text-white mt-4">Get Started</Button>
  </section>
  );
}
