"use client"

import { getTicketsList } from "@/apiServices/tasks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPaginationParams } from "@/lib/paginationParams/paginationParamsSlice";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Pagination = () => {
    const paginationParams = useAppSelector((state) => state.paginationParams);
    const { data } = useQuery<PaginatedResponseType | undefined>({
        queryFn: async () => await getTicketsList(paginationParams.page, paginationParams.pageSize),
        queryKey: ["pagination", paginationParams.page, paginationParams.pageSize],
    });
    const dispatch = useAppDispatch();
    const router = useRouter()

    const handleNavigateToPrev = () => {
        if (paginationParams.page > 1) {
            dispatch(setPaginationParams({ ...paginationParams, page: paginationParams.page - 1 }));
        }
    };

    const handleNavigateToNext = () => {
        if (data && paginationParams.page < data?.totalPages) {
            dispatch(setPaginationParams({ ...paginationParams, page: paginationParams.page + 1 }));
        }
    };

    const handleSaveNewPagination = (page: number) => {
        const newPaginationState = {
            page: page,
            pageSize: paginationParams.pageSize
        }
        dispatch(setPaginationParams(newPaginationState))
        router.push(`?page=${newPaginationState.page}&pageSize=${newPaginationState.pageSize}`)
    }

    const currentPage = paginationParams.page;
    const totalPages = data?.totalPages || 1;

    // Generate an array of page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    if (!data) return null;

    return (
            <div className="flex items-center justify-center p-4">
                {/* Previous Page Button */}
                <button
                    onClick={handleNavigateToPrev}
                    disabled={currentPage === 1}
                    className={`flex size-10 items-center justify-center ${currentPage === 1 ? "hidden" : "text-black"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                    </svg>
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((pageNumber) => (
                    <div
                        key={pageNumber}
                        onClick={() => handleSaveNewPagination(pageNumber)}
                        className={`text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center rounded-full 
                            ${currentPage === pageNumber ? "bg-[#EEEEEE]" : "bg-transparent"} text-black`}
                    >
                        {pageNumber}
                    </div>
                ))}

                {/* Next Page Button */}
                <button
                    onClick={handleNavigateToNext}
                    disabled={currentPage === totalPages}
                    className={`flex size-10 items-center justify-center ${currentPage === totalPages ? "hidden" : "text-black"}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                </button>
            </div>
    );
};


export default Pagination;
