"use client";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <div className="relative flex gap-2">
        <Input
          id="date"
          placeholder="Data"
          className="bg-background pr-10"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
