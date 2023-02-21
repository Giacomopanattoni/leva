import React from 'react';
import type { InternalPlot, InternalPlotSettings } from './plot-types';
declare type PlotCanvasProps = {
    value: InternalPlot;
    settings: InternalPlotSettings;
};
export declare const PlotCanvas: React.MemoExoticComponent<({ value: expr, settings }: PlotCanvasProps) => JSX.Element>;
export {};
