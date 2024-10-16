import { parseDate, timeAgo } from "@/helpers/dateParser";
import TicketActionsPopUp from "./TicketActionsPopUp";
import { FC } from "react";

interface SingleTicketRowProps {
    ticket: Ticket;
    bgColor: string
}

const SingleTicketRow: FC<SingleTicketRowProps> = ({ ticket, bgColor }) => {
    return <tr key={ticket.id} className={`border-t border-t-[#DEDEDE] ${bgColor}`}>
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
}

export default SingleTicketRow;