
export const isDateValid = (date: string) => {
    // Define a regular expression to match the "YYYY-MM-DD" format
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    // Test if the provided date matches the format
    return dateFormat.test(date);
};