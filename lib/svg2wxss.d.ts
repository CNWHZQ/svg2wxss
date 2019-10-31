export declare type option = {
    path: string;
    out?: {
        path?: string;
        css?: boolean;
        wxss?: boolean;
        html?: boolean;
    };
};
export declare function converSVG(svgxml: string): string;
export declare function setPreserveAspectRatio(svgxml: string): string;
export default function (opt: option): Promise<unknown>;
