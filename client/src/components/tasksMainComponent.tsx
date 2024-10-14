"use client"

import { getTicketsList } from "@/apiServices/tasks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { increment } from "@/lib/counter/counterSlice";
import { setPaginationParams } from "@/lib/paginationParams/paginationParamsSlice";
import { parseDate, timeAgo } from "@/helpers/dateParser";

const ActionsPopUp = ({ ticket }: { ticket: Ticket }) => {
    const [displayActions, setDisplayActions] = useState(false);

    return <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] md:px-4 px-2 py-2 text-[#6B6B6B] text-sm font-normal leading-normal">
        <div className="relative">
            <div onClick={() => setDisplayActions(!displayActions)} className="cursor-pointer  text-lg font-semibold h-fit">
                ...
            </div>
            {
                displayActions && <div className="absolute bottom-full right-0 bg-white rounded shadow">
                    <div>Delete</div>
                    <div>Update</div>
                </div>
            }
        </div>
    </td>
}

const TasksMainComponent = () => {
    const paginationParams = useAppSelector((state) => state.paginationParams)
    const counter = useAppSelector(state => state.counter)
    const dispatch = useAppDispatch()


    // This useEffect will run only on the client side
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryPage = urlParams.get('page');
        const querypageSize = urlParams.get('pageSize');
        const newPaginationParamsState = {
            page: 0,
            pageSize: 10
        }

        // If queryId is not null, parse it to a number and update the page state
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
    }, []); // Runs only once when the component mounts


    const { data, isLoading } = useQuery({
        queryFn: () => getTicketsList(paginationParams.page, paginationParams.pageSize),
        queryKey: ["pagination", paginationParams.page, paginationParams.pageSize],
    });


    return <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#DEDEDE] bg-[#FFFFFF]">
            <table className="flex-1">
                <thead>
                    <tr className="bg-[#FFFFFF]">
                        <th className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 px-4 py-3 text-left text-black w-[400px] text-sm font-medium leading-normal">Ticket ID</th>
                        <th className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 px-4 py-3 text-left text-black w-[400px] text-sm font-medium leading-normal">Description</th>
                        <th className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 px-4 py-3 text-left text-black w-60 text-sm font-medium leading-normal">Status</th>
                        <th className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 px-4 py-3 text-left text-black w-[400px] text-sm font-medium leading-normal">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.items.map((ticket: Ticket) => {
                            return <tr key={ticket.id} className="border-t border-t-[#DEDEDE]">
                                <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] md:px-4 px-2 py-2 w-[300px] md:w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">{ticket.id}</td>
                                <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] md:px-4 px-2 py-2 w-[300px] md:w-[400px] text-black text-sm font-normal leading-normal">
                                    {ticket.description}
                                </td>
                                <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] md:px-4 px-2 py-2 w-60 text-sm font-normal leading-normal">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 md:px-4 px-2 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                                    >
                                        <span className="truncate">{ticket.status}</span>
                                    </button>
                                </td>
                                <td className="hidden md:table-cell table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] md:px-4 px-2 py-2 w-[300px] md:w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                                    {parseDate(ticket.date)}
                                </td>
                                <td className="md:hidden table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] md:px-4 px-2 py-2 w-[300px] md:w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                                    {timeAgo(ticket.date)}
                                </td>
                                <ActionsPopUp ticket={ticket} />
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}

export default TasksMainComponent;