import NewTicketButton from "./ui/NewTicketButton";

const Header = () => {

    return <div className="w-full flex items-center justify-between p-4">
        <div className="flex flex-wrap justify-between gap-3"><p className="text-black tracking-light text-[32px] font-bold leading-tight min-w-72">Tickets</p></div>
        <NewTicketButton />
    </div>
}

export default Header;
