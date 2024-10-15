interface Ticket{
    id: number;
    description: string,
    status: "Closed" | "Open";
    dateCreated: string;
    newlyCreated: boolean;
    searchedFor: boolean;
}

interface PaginatedResponseType
{
    totalItems: number; 
    totalPages: number; 
    pageNumber: number; 
    pageSize: number; 
    nextPageUrl: string;
    prevPageUrl: string;
    items: Ticket[];
}