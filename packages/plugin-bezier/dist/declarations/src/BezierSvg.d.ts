import type { BezierProps } from './bezier-types';
export declare function BezierSvg({ displayValue, onUpdate, withPreview, }: Pick<BezierProps, 'displayValue' | 'onUpdate'> & {
    withPreview: boolean;
}): JSX.Element;
