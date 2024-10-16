"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPaginationParams } from "@/lib/paginationParams/paginationParamsSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PaginationSettings = () => {
  const paginationParams = useAppSelector(state => state.paginationParams);
  const [newPaginationState, setNewPaginationState] = useState({
    page: paginationParams.page,
    pageSize: paginationParams.pageSize
  })
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    setNewPaginationState({
      page: paginationParams.page,
      pageSize: paginationParams.pageSize
    })
  }, [paginationParams])

  const handleSaveNewPagination = () => {
    dispatch(setPaginationParams(newPaginationState))
    router.push(`?page=${newPaginationState.page}&pageSize=${newPaginationState.pageSize}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewPaginationState((prevState) => ({
      ...prevState,
      [name]: Number(value), // Update the field based on the input name
    }));
  };

  return <div className="flex gap-3 p-3 px-4 flex-wrap pr-4">
    <label className="flex items-center gap-2">
      <span className="text-black text-sm font-medium">Page:</span>
      <input
        pattern="\d*"
        placeholder="page"
        name="page"
        onChange={handleChange}
        value={newPaginationState.page}
        className="bg-[#EEEEEE] placeholder:text-[#6B6B6B] text-xs font-semibold text-black focus:outline-none max-w-20 text-center rounded-xl h-8"
      />
    </label>
    <label className="flex items-center gap-2">
      <span className="text-black text-sm font-medium">PageSize:</span>
      <input
        pattern="\d*"
        placeholder="PageSize"
        name="pageSize"
        onChange={handleChange}
        value={newPaginationState.pageSize}
        className="bg-[#EEEEEE] placeholder:text-[#6B6B6B] text-xs font-semibold text-black focus:outline-none max-w-20 text-center rounded-xl h-8"
      />
    </label>
    <button
      onClick={handleSaveNewPagination}
      className="flex sticky top-0 ml-6 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-black text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]">Apply</button>
  </div>
}

export default PaginationSettings;
