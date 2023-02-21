export declare const date: (input?: ({
    date: Date;
} & Partial<import("./date-types").DateSettings> & import("leva/plugin").InputOptions) | undefined) => import("leva/plugin").CustomInput<{
    date: Date;
    formattedDate: string;
}>;
