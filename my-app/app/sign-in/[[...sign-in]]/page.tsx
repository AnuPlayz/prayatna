import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[500px] flex items-center justify-center">
      <SignIn />
    </div>
  );
}