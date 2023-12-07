export const addDaysToDate = (date, days) => {
    const dateformat = new Date(date)
    return dateformat.setDate(dateformat.getDate() + days) 
}