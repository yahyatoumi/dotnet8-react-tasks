import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteTicketModal from "../modals/DeleteTicketModal";
import UpdateTicketModal from "../modals/UpdateTicketModal";

const TicketActionsPopUp = ({ ticket }: { ticket: Ticket }) => {
    const [displayActions, setDisplayActions] = useState(false);
    const popUpRef = useRef<HTMLDivElement>(null)
    const [displayModal, setDisplayModal] = useState({
        delete: false,
        edit: false,
    })

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popUpRef?.current && e.target && !popUpRef.current.contains((e.target as Node))) {
                setDisplayActions(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

    }, [popUpRef])

    const closeModals = () => {
        setDisplayModal({
            delete: false,
            edit: false,
        })
    }

    const displayDeleteModal = () => {
        setDisplayModal({
            delete: true,
            edit: false,
        })
    }

    const displayEditModal = () => {
        setDisplayModal({
            delete: false,
            edit: true,
        })
    }

    return <td className="h-[72px] md:px-4 px-2 py-2 text-[#6B6B6B] text-sm font-normal leading-normal flex items-center justify-center">
        <div
            ref={popUpRef}
            className="relative md:hidden">
            <div onClick={() => setDisplayActions(!displayActions)} className="cursor-pointer  text-lg font-semibold h-fit flex items-center">
                ...
            </div>
            {
                displayActions && <>
                    <div className="absolute bottom-full right-0 bg-white rounded-md shadow py-1">
                        <div
                            onClick={displayEditModal}
                            className="flex items-center gap-2 text-[#222222] font-medium text-xs px-3 py-1 hover:bg-gray-200 cursor-pointer">
                            <MdOutlineModeEdit className=" w-4 h-4" />
                            <span>Update</span>
                        </div>
                        <div
                            onClick={displayDeleteModal}
                            className="flex items-center gap-2 text-[#C13515] font-medium text-xs px-3 py-1 hover:bg-gray-200 cursor-pointer">
                            <FaRegTrashAlt className="w-3.5 h-3.5" />
                            <span>Delete</span>
                        </div>
                    </div>
                </>
            }
        </div>
        <div className="hidden md:flex items-center gap-2">
            <span
                onClick={displayEditModal}
                className="cursor-pointer">Update</span>
            <span
                onClick={displayDeleteModal}
                className="cursor-pointer text-[#C13515]">Delete</span>
        </div>
        {
            displayModal.delete && <DeleteTicketModal closeModal={closeModals} ticket={ticket} />
        }
        {
            displayModal.edit && <UpdateTicketModal closeModal={closeModals} ticket={ticket} />
        }
    </td>
}

export default TicketActionsPopUp;
