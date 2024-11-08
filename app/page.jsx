import ProjectsAndCategories from "./components/ProjectsAndCategories";

export default function Home() {
  return (
    <div className="w-full py-6 h-full font-sans">
      <div className="flex justify-between max-w-[1100px] mx-auto  items-center"></div>
      <div className="max-w-[1200px] mx-auto flex flex-col items-start justify-center gap-14">
        <ProjectsAndCategories />
      </div>
    </div>
  );
}
