import type { InputWithSettings, NumberSettings, LevaInputProps, InternalVectorSettings } from 'leva/plugin';
export declare type Spring = {
    tension?: number;
    friction?: number;
    mass?: number;
};
export declare type InternalSpring = {
    tension: number;
    friction: number;
    mass: number;
};
export declare type SpringSettings = {
    [key in keyof Spring]?: NumberSettings;
};
export declare type SpringInput = Spring | InputWithSettings<Spring, SpringSettings>;
export declare type InternalSpringSettings = InternalVectorSettings<keyof InternalSpring, (keyof InternalSpring)[], 'object'>;
export declare type SpringProps = LevaInputProps<InternalSpring, InternalSpringSettings, InternalSpring>;