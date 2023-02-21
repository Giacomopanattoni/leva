import type { InternalSpring, InternalSpringSettings, SpringInput } from './spring-types';
export declare const normalize: (input?: SpringInput) => {
    value: {
        tension: number;
        friction: number;
        mass: number;
    };
    settings: InternalSpringSettings;
};
export declare const sanitize: (value: InternalSpring, settings: InternalSpringSettings, prevValue?: any) => {
    tension: number;
    friction: number;
    mass: number;
};
