interface Ticket{
    id: number;
    description: string,
    status: "Closed" | "Open";
    date: string;
}