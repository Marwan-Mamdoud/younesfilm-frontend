import Link from "next/link";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <div className="mx-auto w-fit">
      <div className="bg-slate-400 w-[100dvw] text-center text-white font-semibold text-4xl py-2">
        Main Projects
      </div>
      <div className="w-[100dvw] flex items-center justify-center">
        <Link href="/add" className="w-full">
          <div className="bg-green-400 text-3xl w-full text-center text-white font-bold cursor-pointer">
            ADD
          </div>
        </Link>
        <Link href="/edit" className="w-full">
          <div className="bg-blue-400 text-3xl w-full text-center text-white font-bold cursor-pointer">
            Edit
          </div>
        </Link>
      </div>
      <Projects />
    </div>
  );
}
