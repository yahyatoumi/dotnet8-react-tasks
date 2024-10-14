const Header = () => {
    return <div className="w-full flex items-center justify-between p-4">
        <div className="flex flex-wrap justify-between gap-3"><p className="text-black tracking-light text-[32px] font-bold leading-tight min-w-72">Tickets</p></div>
        <button
            className="flex sticky top-0 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-black text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]"
        >
            <span className="truncate">New Ticket</span>
        </button>
    </div>
}

export default Header;