"use client"

import { getTicketsList } from "@/apiServices/tasks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TasksMainComponent = () => {
    const [page, setPage] = useState(1); // Default page is 1

    // This useEffect will run only on the client side
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryId = urlParams.get('id');

        // If queryId is not null, parse it to a number and update the page state
        if (queryId) {
            const pageNumber = Number(queryId);
            if (!isNaN(pageNumber) && pageNumber > 0) {
                setPage(pageNumber);
            }
        }
    }, []); // Runs only once when the component mounts

    const { data, isLoading } = useQuery({
        queryFn: () => getTicketsList(page),
        queryKey: ["page", page],
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
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1020</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Fix the login button on the home page
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Open</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 30, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1019</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            User profile page design
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">In progress</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 29, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1018</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Mobile app crash issue
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Resolved</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 28, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1017</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Add an option to delete account
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Open</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 27, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1016</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Payment process optimization
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">In progress</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 26, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1015</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Reset password function not working
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Resolved</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 25, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1014</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Product image display error
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Open</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 24, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1013</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Improve search results accuracy
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">In progress</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 23, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1012</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Checkout button alignment problem
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Resolved</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 22, 2023
                        </td>
                    </tr>
                    <tr className="border-t border-t-[#DEDEDE]">
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-120 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">#1011</td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-240 h-[72px] px-4 py-2 w-[400px] text-black text-sm font-normal leading-normal">
                            Update terms of service page layout
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#EEEEEE] text-black text-sm font-medium leading-normal w-full"
                            >
                                <span className="truncate">Open</span>
                            </button>
                        </td>
                        <td className="table-a4630dc8-57ae-40a7-a866-f03df63aa39e-column-480 h-[72px] px-4 py-2 w-[400px] text-[#6B6B6B] text-sm font-normal leading-normal">
                            Nov 21, 2023
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}

export default TasksMainComponent;