export declare const spring: (input?: (import("./spring-types").Spring & import("leva/plugin").InputOptions) | ({
    value: import("./spring-types").Spring;
} & {
    type?: import("leva/plugin").LevaInputs | undefined;
} & import("./spring-types").SpringSettings & import("leva/plugin").InputOptions) | undefined) => import("leva/plugin").CustomInput<{
    tension: number;
    friction: number;
    mass: number;
}>;
