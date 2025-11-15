import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "./components/RegisterForm";
import img from "./images/left.jpg";
export const RegisterContainer = () => {
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
            <div className="w-lg mx-auto py-10">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">Create your account</h1>
                <p className="text-muted-foreground mt-2">
                  Start managing your tasks efficiently
                </p>
              </div>
              <RegisterForm />
              <p className="text-center text-sm text-muted-foreground mt-2">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
