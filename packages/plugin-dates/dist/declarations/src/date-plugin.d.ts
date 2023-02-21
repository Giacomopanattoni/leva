import type { DateInput, DateSettings, InternalDate } from './date-types';
export declare const sanitize: (value: Date, settings: DateSettings) => {
    date: Date;
    formattedDate: string;
};
export declare const format: (value: InternalDate, settings: DateSettings) => {
    date: Date;
    formattedDate: string;
};
export declare const normalize: ({ date, ..._settings }: DateInput) => {
    value: {
        date: Date;
        formattedDate: string;
    };
    settings: Required<DateSettings>;
};
