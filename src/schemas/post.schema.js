import { z } from "zod";
export const createPostSchema = z.object({
    content:z.string().max(100, "too long"),
})
.strict();
export const updatePostSchema = z.object({
    content:z.string().max(100, "too long").nullable().nullish(),
})


 