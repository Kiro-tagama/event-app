"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(data);
    toast.success("Login realizado com sucesso");
    router.push("/home");
  }

  return (
    <Card className="sm:w-lg">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="border-none shadow-none flex-1">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <br />
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:min-w-52"
            >
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                startIcon={<Mail size={16} />}
              />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                startIcon={<Lock size={16} />}
                endIcon={
                  showPassword ? (
                    <Eye
                      onClick={() => setShowPassword(!showPassword)}
                      size={16}
                      className="cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowPassword(!showPassword)}
                      size={16}
                      className="cursor-pointer"
                    />
                  )
                }
              />
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </form>
          </CardContent>
        </div>

        {/* Separador vertical/horizontal responsivo */}
        <div className="flex items-center justify-center py-4 sm:py-0">
          <div className="w-full h-px bg-border sm:w-px sm:h-64 sm:mx-4"></div>
        </div>

        <div className="border-none shadow-none flex-1">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <br />
            <Link href="/home" className="w-full">
              <Button className="w-full">Visitar</Button>
            </Link>
          </CardHeader>
        </div>
      </div>
    </Card>
  );
}
