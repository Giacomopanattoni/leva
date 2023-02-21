import type { LevaInputProps } from 'leva/plugin';
export declare type Plot = {
    expression: string;
};
export declare type PlotSettings = {
    boundsX?: [number, number];
    boundsY?: [number, number];
    graph?: boolean;
};
export declare type PlotInput = Plot & PlotSettings;
export declare type InternalPlot = {
    (v: number): any;
    __parsedScoped: math.MathNode;
    __parsed: math.MathNode;
    __symbols: string[];
};
export declare type InternalPlotSettings = Required<PlotSettings>;
export declare type PlotProps = LevaInputProps<InternalPlot, InternalPlotSettings, string>;
