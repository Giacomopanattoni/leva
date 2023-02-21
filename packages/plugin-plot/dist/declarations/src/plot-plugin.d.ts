import { Data, StoreType } from 'packages/leva/src/types';
import * as math from 'mathjs';
import type { PlotInput, InternalPlot, InternalPlotSettings } from './plot-types';
export declare const sanitize: (expression: string, _settings: InternalPlotSettings, _prevValue: math.MathNode, _path: string, store: StoreType) => (v: number) => any;
export declare const format: (value: InternalPlot) => string;
export declare const normalize: ({ expression, ..._settings }: PlotInput, _path: string, data: Data) => {
    value: (v: number) => any;
    settings: Required<import("./plot-types").PlotSettings>;
};
