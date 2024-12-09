import { GlobalProvider } from "@/context/GlobalState";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <GlobalProvider>
      <Navbar />

      <div className="flex justify-evenly py-8"></div>
    </GlobalProvider>
  );
}
