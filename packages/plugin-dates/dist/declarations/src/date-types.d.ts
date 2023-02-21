import type { LevaInputProps } from 'leva/plugin';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { CalendarContainerProps } from 'react-datepicker';
export declare type DateSettings = {
    locale: string;
    inputFormat: string;
};
export declare type DateInput = {
    date: Date;
} & Partial<DateSettings>;
export declare type DateCalendarContainerProps = CalendarContainerProps;
export declare type DateInputProps = {
    value: string;
    onClick: MouseEventHandler;
    onChange: ChangeEventHandler;
};
export declare type InternalDate = {
    date: Date;
    formattedDate: string;
};
export declare type InternalDateSettings = Required<DateSettings>;
export declare type DateProps = LevaInputProps<InternalDate, InternalDateSettings, string>;
