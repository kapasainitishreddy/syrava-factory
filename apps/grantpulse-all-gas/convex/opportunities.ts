import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("opportunities").order("desc").collect(),
});

export const create = mutation({
  args: {
    name: v.string(),
    officialUrl: v.string(),
    deadline: v.optional(v.string()),
  },
  handler: async (ctx, args) =>
    ctx.db.insert("opportunities", {
      ...args,
      status: "new",
      sourceVerified: false,
      createdAt: Date.now(),
    }),
});

export const setStatus = mutation({
  args: {
    id: v.id("opportunities"),
    status: v.union(
      v.literal("new"),
      v.literal("researching"),
      v.literal("blocked"),
      v.literal("ready"),
      v.literal("submitted")
    ),
    blocker: v.optional(v.string()),
    sourceVerified: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...patch }) => ctx.db.patch(id, patch),
});
