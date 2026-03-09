import Image from "next/image";

export default function Home() {
  return (
   <main>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to Diski Center</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your one-stop destination for all things football in South Africa.
        </p>
        <button className="btn">Get Started</button>
      </div>
   </main>
  );
}
