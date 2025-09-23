import { z } from "zod";
export declare const configSchema: z.ZodObject<{
    githubToken: z.ZodOptional<z.ZodString>;
    defaultCompress: z.ZodDefault<z.ZodBoolean>;
    maxFileSize: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, number, string | number>>;
    token_count_encoding: z.ZodDefault<z.ZodString>;
    security_check: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodBoolean, z.ZodString]>, boolean, string | boolean>>;
}, "strip", z.ZodTypeAny, {
    maxFileSize: number;
    defaultCompress: boolean;
    token_count_encoding: string;
    security_check: boolean;
    githubToken?: string | undefined;
}, {
    maxFileSize?: string | number | undefined;
    githubToken?: string | undefined;
    defaultCompress?: boolean | undefined;
    token_count_encoding?: string | undefined;
    security_check?: string | boolean | undefined;
}>;
export default function createServer({ config, }: {
    config?: z.infer<typeof configSchema>;
}): import("@modelcontextprotocol/sdk/server").Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>;
//# sourceMappingURL=smithery-entry.d.ts.map