import { deleteTicket } from "@/apiServices/tasks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFromNewlyCreated } from "@/lib/newlyCreatedTickets/newlyCreatedTicketsSlice";
import { removeFromSearchTickets } from "@/lib/searchTickets/searchTicketsSlice";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface DeleteTicketModalProps {
    ticket: Ticket;
    closeModal: () => void;
}

const DeleteTicketModal: FC<DeleteTicketModalProps> = ({ ticket, closeModal }) => {
    const dispatch = useAppDispatch()
    const paginationParams = useAppSelector(state => state.paginationParams)
    const queryClient = useQueryClient()

    const deleteTicketFromQuery = () => {
        const queryKey = ["pagination", paginationParams.page, paginationParams.pageSize]
        queryClient.setQueryData(queryKey, (old: PaginatedResponseType) => {
            const newItems: Ticket[] = old.items.filter((item: Ticket) => item.id !== ticket.id);
            const newqueryData: PaginatedResponseType = {
                ...old,
                items: newItems
            }
            return newqueryData
        })
    }


    const handleDeleteTicket = async () => {
        try{
            await deleteTicket(ticket.id.toString());
            dispatch(removeFromNewlyCreated(ticket))
            dispatch(removeFromSearchTickets(ticket))
            deleteTicketFromQuery();
            closeModal();
        }
        catch(e){
            console.error("ERRRRROR:", e)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10 flex justify-center items-center">
            <div
                className="overlay absolute inset-0 z-20"
                onClick={closeModal}
            ></div>
            <div
                className="w-[300px] bg-white p-5 rounded-[20px] flex gap-3 flex-col items-center z-30"
            >
                <FaRegTrashAlt className="w-6 h-6 text-[#C13515]" />
                <h2 className="text-base font-semibold">Delete Ticket</h2>
                <p className="text-sm font-normal text-center">
                    This action will delete the ticket forever,
                    are you sure?
                </p>
                <div className="flex mt-3">
                    <button
                        className="px-6 py-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        data-testid="delete-ticket-btn"
                        onClick={handleDeleteTicket}
                        className="bg-[#C13515] text-white px-6 py-2 rounded-xl"
                    >
                        Yes, Delete ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTicketModal;
