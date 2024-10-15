"use client"

import { getTicketsList } from "@/apiServices/tasks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";
import { increment } from "@/lib/counter/counterSlice";
import { setPaginationParams } from "@/lib/paginationParams/paginationParamsSlice";
import { parseDate, timeAgo } from "@/helpers/dateParser";
import { CiEdit } from "react-icons/ci";
import TicketActionsPopUp from "./ui/TicketActionsPopUp";

const TasksMainComponent = () => {
    const paginationParams = useAppSelector((state) => state.paginationParams)
    const counter = useAppSelector(state => state.counter)
    const newlyCreatedTickets = useAppSelector(state => state.newlyCreatedTickets)
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
                <tbody>
                    {newlyCreatedTickets?.map((ticket: Ticket) => (
                        <tr key={ticket.id} className="border-t border-t-[#DEDEDE] bg-green-100">
                            <td className="h-[72px] text-center px-1 py-2 text-[#6B6B6B] text-sm font-normal leading-normal w-[3/20]">
                                {ticket.id}
                            </td>
                            <td className="h-[72px] md:px-4 px-1 py-2 w-[7/20] break-words text-black text-sm font-normal leading-normal overflow-hidden">
                                <div
                                    style={{
                                        maxWidth: "100px",
                                        minWidth: "50px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    className="overflow-hidden line-clamp-3 truncate">
                                    {ticket.description}
                                </div>
                            </td>
                            <td className="h-[72px] px-1 py-2 text-sm font-normal leading-normal w-[2/20]">
                                <button className="flex items-center justify-center overflow-hidden rounded-xl h-8 md:px-4 px-1.5 bg-[#EEEEEE] text-black text-xs md:text-sm font-medium leading-normal w-full">
                                    <span className="truncate">{ticket.status}</span>
                                </button>
                            </td>
                            <td className="hidden text-center h-[72px] px-1 py-2 text-[#6B6B6B] text-sm font-normal leading-normal w-[4/20] md:table-cell">
                                {parseDate(ticket.dateCreated)}
                            </td>
                            <td className="text-center h-[72px] px-1 py-2 text-[#6B6B6B] text-sm font-normal leading-normal w-[4/20] md:hidden">
                                {timeAgo(ticket.dateCreated)}
                            </td>
                            <TicketActionsPopUp ticket={ticket} />
                        </tr>
                    ))}
                    {data?.items.map((ticket: Ticket) => (
                        <tr key={ticket.id} className="border-t border-t-[#DEDEDE]">
                            <td className="h-[72px] text-center px-1 py-2 text-[#6B6B6B] text-sm font-normal leading-normal w-[3/20]">
                                {ticket.id}
                            </td>
                            <td className="h-[72px] md:px-4 px-1 py-2 w-[7/20] break-words text-black text-sm font-normal leading-normal overflow-hidden">
                                <div
                                    style={{
                                        maxWidth: "100px",
                                        minWidth: "50px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    className="overflow-hidden line-clamp-3 truncate">
                                    {ticket.description}
                                </div>
                            </td>
                            <td className="h-[72px] px-1 py-2 text-sm font-normal leading-normal w-[2/20]">
                                <button className="flex items-center justify-center overflow-hidden rounded-xl h-8 md:px-4 px-1.5 bg-[#EEEEEE] text-black text-xs md:text-sm font-medium leading-normal w-full">
                                    <span className="truncate">{ticket.status}</span>
                                </button>
                            </td>
                            <td className="hidden text-center h-[72px] px-1 py-2 text-[#6B6B6B] text-sm font-normal leading-normal w-[4/20] md:table-cell">
                                {parseDate(ticket.dateCreated)}
                            </td>
                            <td className="text-center h-[72px] px-1 py-2 text-[#6B6B6B] text-sm font-normal leading-normal w-[4/20] md:hidden">
                                {timeAgo(ticket.dateCreated)}
                            </td>
                            <TicketActionsPopUp ticket={ticket} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div >
}

export default TasksMainComponent;