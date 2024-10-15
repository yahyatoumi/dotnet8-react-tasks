import Image from "next/image";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import Suggests from "@/components/Suggests";
import TasksMainComponent from "@/components/TasksMainComponent";
import Pagination from "@/components/Pagination";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#FFFFFF] overflow-x-hidden">
      <div className="flex h-full grow flex-col w-full max-w-[960px]">
          <div className="flex flex-col flex-1">
            <Header />
            <SearchInput />
            <Suggests />
            <TasksMainComponent />
            <Pagination />
          </div>
      </div>
    </div>
  );
}
