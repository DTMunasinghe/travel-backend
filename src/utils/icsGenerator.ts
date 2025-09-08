import ical, { ICalEventData } from "ical-generator";

export function generateICS(planText: string, startDate: string): string {
    const calender = ical({ name: "My Travel Calendar" });

    const dayRegex = /Day (\d+):([\s\S]*?)(?=Day \d+:|$)/g;

    let match: RegExpExecArray | null;

    while ((match = dayRegex.exec(planText)) !== null) {
        const dayNum = parseInt(match[1]);
        const content = match[2].trim();

        const event: ICalEventData = {
            summary: `Day ${dayNum} Itinerary`,
            description: content,
            start: new Date(new Date(startDate).getTime() + (dayNum - 1) * 86400000),
            end: new Date(new Date(startDate).getTime() + (dayNum - 1) * 86400000),
            allDay: true,
        };

        calender.createEvent(event);
    }

    return calender.toString();
}