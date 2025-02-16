export const convertTimeNum = (time) => {
    return new Date(new Date().toISOString().split("T")[0] + "T" + time).getTime();
};

export const convertTime = (time) => {
    const t = new Date(new Date().toISOString().split("T")[0] + "T" + time).getTime();
    return new Date(t).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};


export const getDay = (dayCode) => {
    switch (dayCode) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "";
    }
};
