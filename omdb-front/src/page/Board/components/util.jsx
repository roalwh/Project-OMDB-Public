
export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() +1;
    let date = targetDate.getDate();

    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(
        date.getFullYear(), 
        date.getMonth(), 1).getTime();
    const endTimeStamp = new Date(
        date.getFullYear(), 
        date.getMonth() +1,
        0, 23, 59, 59).getTime();
    return {beginTimeStamp, endTimeStamp};
};