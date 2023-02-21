import * as math from 'mathjs';
export declare function getSymbols(expr: math.MathNode): string[];
export declare function parseExpression(expression: string, get: (path: string) => any): (v: number) => any;
