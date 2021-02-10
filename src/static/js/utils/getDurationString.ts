const getDurationString = (start: Date, end: Date, present: boolean) => {
    // Parse dates to Date objects
    const startDate = new Date(start);
    const endDate = present ? new Date() : new Date(end);

    // Calculate total month difference
    let totalNumberOfMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    totalNumberOfMonths -= startDate.getMonth();
    totalNumberOfMonths += endDate.getMonth();
    totalNumberOfMonths = totalNumberOfMonths <= 0 ? 1 : totalNumberOfMonths + 1;

    // Split months into years and months
    const result = { years: Math.floor(totalNumberOfMonths / 12), months: totalNumberOfMonths % 12 };

    // Construct durations string based on amount of years and months
    let durationString = '';

    if (result.years > 0) {
        durationString += `${result.years} years `;
    }

    if (result.months > 0) {
        durationString += `${result.months} months`;
    }

    return durationString;
};

export default getDurationString;