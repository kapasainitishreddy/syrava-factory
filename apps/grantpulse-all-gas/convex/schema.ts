import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  opportunities: defineTable({
    name: v.string(),
    officialUrl: v.string(),
    deadline: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("researching"),
      v.literal("blocked"),
      v.literal("ready"),
      v.literal("submitted")
    ),
    blocker: v.optional(v.string()),
    sourceVerified: v.boolean(),
    createdAt: v.number(),
  }).index("by_status", ["status"]),
});
