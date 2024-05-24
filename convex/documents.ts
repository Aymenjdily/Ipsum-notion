import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { NormalizeError } from "next/dist/shared/lib/utils";

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const documents = await ctx.db.query("documents").collect();

    return documents;
  },
});

export const getSidebar = query({
  args: {
    parentDocuments: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocuments),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const existsDocument = await ctx.db.get(args.id);

    if (!existsDocument) {
      throw new Error("Document not found");
    }

    if (existsDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    recursiveArchive(args.id);

    return document;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const existsDocument = await ctx.db.get(args.id);

    if (!existsDocument) {
      throw new Error("Document not found");
    }

    if (existsDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existsDocument.parentDocument) {
      const parent = await ctx.db.get(existsDocument.parentDocument);

      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const updatedDocuments = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return updatedDocuments;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const existsDocument = await ctx.db.get(args.id);

    if (!existsDocument) {
      throw new Error("Document not found");
    }

    if (existsDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const deletedDocument = await ctx.db.delete(args.id);

    return deletedDocument;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const { id, ...rest } = args;

    const existsDocument = await ctx.db.get(args.id);

    if (!existsDocument) {
      throw new Error("Document not found");
    }

    if (existsDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      ...rest,
    });

    return updatedDocument;
  },
});

export const removeIcon = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const existsDocument = await ctx.db.get(args.id);

    if (!existsDocument) {
      throw new Error("Document not found");
    }

    if (existsDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      icon: undefined,
    });

    return updatedDocument;
  },
});

export const removeCover = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authentificated");
    }
    const userId = identity.subject;

    const existsDocument = await ctx.db.get(args.id);

    if (!existsDocument) {
      throw new Error("Document not found");
    }

    if (existsDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const updatedDocument = await ctx.db.patch(args.id, {
      coverImage: undefined,
    });

    return updatedDocument;
  },
});
