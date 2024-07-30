export const convertTimeNum = (time) => {
    return new Date(
        new Date().toISOString().split("T")[0] + "T" + time,
    ).getTime();
};

export const convertTime = (time) => {
    const t = new Date(
        new Date().toISOString().split("T")[0] + "T" + time,
    ).getTime();
    return new Date(t).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
};
