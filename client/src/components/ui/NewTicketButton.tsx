"use client"

import { useState } from "react"
import NewTicketModal from "../modals/NewTicketModal"

const NewTicketButton = () => {
    const [displayModal, setDisplayModal] = useState(false);

    return <>
        <button
            data-testid="add-new-ticket-btn"
            onClick={() => setDisplayModal(true)}
            className="flex sticky top-0 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-black text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]"
        >
            <span className="truncate">New Ticket</span>
        </button>
        {
            displayModal && (
                <NewTicketModal closeModal={() => setDisplayModal(false)} />
            )
        }
    </>
}

export default NewTicketButton;