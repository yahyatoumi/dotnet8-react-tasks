"use client"

import { getTicketsList } from "@/apiServices/tasks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPaginationParams } from "@/lib/paginationParams/paginationParamsSlice";
import NewTicketButton from "./ui/NewTicketButton";
import SingleTicketRow from "./ui/SingleTicketRow";

const TasksMainComponent = () => {
    const paginationParams = useAppSelector((state) => state.paginationParams)
    const newlyCreatedTickets = useAppSelector(state => state.newlyCreatedTickets)
    const searchTickets = useAppSelector(state => state.searchTickets)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryPage = urlParams.get('page');
        const querypageSize = urlParams.get('pageSize');
        const newPaginationParamsState = {
            page: 0,
            pageSize: 10
        }

        if (queryPage) {
            const pageNumber = Number(queryPage);
            if (!isNaN(pageNumber) && pageNumber > 0) {
                newPaginationParamsState.page = pageNumber
            }
        } else {
            newPaginationParamsState.page = 1
        }

        if (querypageSize) {
            const pageSizeParam = Number(querypageSize);
            if (!isNaN(pageSizeParam) && pageSizeParam > 0) {
                newPaginationParamsState.pageSize = pageSizeParam;
            }
        } else {
            newPaginationParamsState.pageSize = 10
        }
        dispatch(setPaginationParams(newPaginationParamsState))
    }, [dispatch]);


    const { data } = useQuery({
        queryFn: () => getTicketsList(paginationParams.page, paginationParams.pageSize),
        queryKey: ["pagination", paginationParams.page, paginationParams.pageSize],
    });


    return <div className="sm:px-4 py-3">
        <div className="overflow-hidden sm:rounded-xl border border-[#DEDEDE] bg-[#FFFFFF]">
            <table className="table-auto w-full px-1">
                <thead>
                    <tr className="bg-black h-14">
                        <th className="text-white text-sm font-medium leading-normal text-center w-[3/20]">ID</th>
                        <th className="text-white md:px-4 text-sm font-medium leading-normal text-left w-[7/20]">Description</th>
                        <th className="text-white text-sm font-medium leading-normal text-center w-[2/20]">Status</th>
                        <th className="text-white text-sm font-medium leading-normal text-center w-[4/20]">Date</th>
                        <th className="text-white text-sm font-medium leading-normal text-center w-[4/20]">Actions</th>
                    </tr>
                </thead>
                <tbody
                    data-testid="tickets-list"
                >
                    {searchTickets?.map((ticket: Ticket) => (
                        <SingleTicketRow key={ticket.id} ticket={ticket} bgColor="bg-blue-50" />
                    ))}
                    {newlyCreatedTickets?.map((ticket: Ticket) => (
                        <SingleTicketRow key={ticket.id} ticket={ticket} bgColor="bg-green-50" />
                    ))}
                    {data?.items?.map((ticket: Ticket) => (
                        <SingleTicketRow key={ticket.id} ticket={ticket} bgColor="" />
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4">
            <NewTicketButton />
        </div>
    </div >
}

export default TasksMainComponent;
