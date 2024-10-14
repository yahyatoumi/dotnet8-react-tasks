import Image from "next/image";
import Header from "@/components/header";
import SearchInput from "@/components/searchInput";
import Suggests from "@/components/suggests";
import TasksMainComponent from "@/components/tasksMainComponent";
import Pagination from "@/components/pagination";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 md:px-6 px-2 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Header />
            <SearchInput />
            <Suggests />
            <TasksMainComponent />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
