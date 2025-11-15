import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./components/LoginForm";
import img from "./images/left.jpg";
export const LoginContainer = () => {
  return (
    <div>
      <div className="min-h-screen">
        <div className="flex items-center">
          <div className="h-screen w-[606px]">
            <Image
              src={img}
              alt="register left"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 ">
            <div className="w-md mx-auto py-10">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Log in to your account</h1>
                <p className="text-muted-foreground mt-2">
                  Start managing your tasks efficiently
                </p>
              </div>
              <LoginForm />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Don’t have an account??{" "}
                <Link href="/auth/register" className="text-primary">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
