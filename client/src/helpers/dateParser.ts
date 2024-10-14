export const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',  // Abbreviated month (e.g., "Nov")
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false    // 24-hour format (remove this for 12-hour format with AM/PM)
    });
    return formattedDate;
}

export const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((Number(now) - Number(past)) / 1000);

    if (diffInSeconds < 60) {
        if (diffInSeconds <= 1) return "just now";
        return `${diffInSeconds} s ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        if (diffInMinutes === 1) return "1 minute ago";
        return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        if (diffInHours === 1) return "1 hour ago";
        return `${diffInHours} h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        if (diffInDays === 1) return "1 day ago";
        return `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        if (diffInMonths === 1) return "1 month ago";
        return `${diffInMonths} mon ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    if (diffInYears === 1) return "1 year ago";
    return `${diffInYears} y ago`;
}
