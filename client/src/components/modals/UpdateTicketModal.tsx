import { updateTicket } from "@/apiServices/tasks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateSingleTicket } from "@/lib/newlyCreatedTickets/newlyCreatedTicketsSlice";
import { updateSingleSearchTicket } from "@/lib/searchTickets/searchTicketsSlice";
import { useQueryClient } from "@tanstack/react-query";
import { FC, FormEvent, useRef, useState } from "react";
import { IoClose } from "react-icons/io5"

interface UpdateTicketModalProps {
    closeModal: () => void;
    ticket: Ticket
}

const UpdateTicketModal: FC<UpdateTicketModalProps> = ({ closeModal, ticket }) => {
    const [decriptionError, setDescriptionError] = useState(false)
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useAppDispatch();
    const paginationParams = useAppSelector(state => state.paginationParams)
    const queryClient = useQueryClient()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Using FormData to retrieve form values
        const formData = new FormData(formRef.current!);
        const description = formData.get('description') as string;
        const status = formData.get('status') as "Open" | "Closed";

        // Validation
        if (!description.trim()) {
            setDescriptionError(true);
            return;
        }

        const postData = {
            description,
            status,
        }

        const updateTicketInQuery = (newTicketState: Ticket) => {
            const queryKey = ["pagination", paginationParams.page, paginationParams.pageSize]
            queryClient.setQueryData(queryKey, (old: PaginatedResponseType) => {
                const newItems: Ticket[] = old.items.map((item: Ticket) => item.id === ticket.id ? newTicketState : item);
                const newqueryData: PaginatedResponseType = {
                    ...old,
                    items: newItems
                }
                return newqueryData
            })
        }

        const res = await updateTicket(ticket.id.toString(), postData)
        console.log("ressss", res)
        if (!res.error) {
            console.log("newwwww", res)
            const newTicketState = {
                ...ticket,
                description: description,
                status: status
            }
            console.log("new stateee", newTicketState)
            dispatch(updateSingleTicket(newTicketState));
            dispatch(updateSingleSearchTicket(newTicketState))
            updateTicketInQuery(newTicketState)
            closeModal();
        }
    }

    const handleDescriptionBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const description = e.currentTarget.value.trim();

        if (!description) {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
    };

    return <div className="fixed inset-0 bg-black bg-opacity-40 z-10 flex justify-end">
        <div
            className="overlay absolute inset-0 z-10"
            onClick={closeModal}
        ></div>

        <div className="h-full sm:w-96 w-full bg-white shadow-lg z-20 p-6">
            <div className="flex items-center justify-between">
                <h2 className="md:text-xl text-lg font-semibold text-gray-800">Add New Ticket</h2>
                <button
                    onClick={closeModal}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 ml-auto"
                >
                    <IoClose className="text-[#222222] w-5 h-5" />
                </button>
            </div>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="py-10">
                <label className="flex flex-col min-w-40 flex-1">
                    <p className={`${decriptionError ? "text-[#C13515]" : "text-black "} text-base font-medium leading-normal pb-2`}>Ticket Description*</p>
                    <textarea
                        onBlur={handleDescriptionBlur}
                        placeholder="Description"
                        className="flex w-full overflow-y-auto min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-none focus:ring-0 border-none bg-[#EEEEEE] placeholder:text-[#6B6B6B] p-4 text-base font-normal leading-normal"
                        name="description"
                        onChange={() => setDescriptionError(false)}
                    >{ticket.description}</textarea>
                </label>
                <label className="flex flex-col min-w-40 flex-1 mt-4">
                    <p className="text-black text-base font-medium leading-normal pb-2">Status*</p>
                    <select
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0 border-none bg-[#EEEEEE] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#6B6B6B] p-4 text-base font-normal leading-normal"
                        name="status"
                    >
                        <option value="one" disabled>Select status</option>
                        <option value="Open" selected={ticket.status === "Open"}>Open</option>
                        <option value="Closed" selected={ticket.status === "Closed"}>Closed</option>
                    </select>
                </label>
                <div className="flex py-3 justify-end">
                    <button
                        type="submit"
                        className="flex mt-6 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-black text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="truncate">Update ticket</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default UpdateTicketModal;