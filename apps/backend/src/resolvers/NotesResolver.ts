import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { randomUUID } from "node:crypto";

import { CreateNoteInput } from "../dtos/inputs/notes/CreateNoteInput";
import { UpdateNoteInput } from "../dtos/inputs/notes/UpdateNoteInput";
import { DeleteNoteInput } from "../dtos/inputs/notes/DeleteNoteInput";
import { NoteShareModel } from "../dtos/models/notes/NoteShareModel";
import { ResponseModel } from "../dtos/models/app/ResponseModel";
import { NoteModel } from "../dtos/models/notes/NoteModel";
import { Authorization } from "../middlewares/authorization";
import { prisma } from "../helpers/prisma";

@Resolver()
export class NotesResolver {
  @Authorized()
  @Mutation(() => NoteModel)
  async createNote(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: CreateNoteInput,
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.users.findFirst({
      where: { firebaseId: payload.uid },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const note = await prisma.note.create({
      data: {
        id: randomUUID(),
        authorId: user.id,
        title: input.title,
        description: input.description,
        createdAt: new Date(),
        color: input.color,
      },
    });

    return note;
  }

  @Authorized()
  @Mutation(() => NoteModel)
  async updateNote(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: UpdateNoteInput,
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.users.findFirst({
      where: { firebaseId: payload.uid },
    });

    const note = await prisma.note.findUnique({
      where: { id: input.id },
    });

    if (!user || !note) {
      throw new Error("User or note not found");
    }

    if (note.authorId !== user.id) {
      throw new Error("Unauthorized");
    }

    await prisma.note.update({
      data: {
        title: input.title,
        description: input.description,
        color: input.color,
        updatedAt: new Date(),
      },
      where: { id: input.id, authorId: user.id },
    });

    const data = await prisma.note.findUnique({ where: { id: input.id } });

    if (!data) {
      throw new Error("Note not found");
    }

    return data;
  }

  @Authorized()
  @Mutation(() => ResponseModel)
  async deleteNote(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: DeleteNoteInput,
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.users.findFirst({
      where: { firebaseId: payload.uid },
    });

    const note = await prisma.note.findUnique({
      where: { id: input.id },
    });

    if (!user || !note) {
      throw new Error("User or note not found");
    }

    if (note.authorId !== user.id) {
      throw new Error("Unauthorized");
    }

    await prisma.noteComment.deleteMany({ where: { noteId: input.id } });
    await prisma.noteShare.deleteMany({ where: { noteId: input.id } });
    await prisma.note.delete({
      where: { id: input.id, authorId: user.id },
    });

    return { success: true };
  }

  @Authorized()
  @Query(() => [NoteModel])
  async getNotes(@Ctx() context: { bearerToken: string }) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.users.findUnique({
      where: { firebaseId: payload.uid },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const notes = await prisma.note.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: { createdAt: "desc" },
        },
        shares: {
          include: {
            person: true,
          },
        },
      },
    });

    return notes;
  }

  @Authorized()
  @Query(() => [NoteShareModel])
  async getSharedNotes(@Ctx() context: { bearerToken: string }) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.users.findUnique({
      where: { firebaseId: payload.uid },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const notes = await prisma.noteShare.findMany({
      where: { personId: user.id },
      include: {
        person: true,
        note: {
          include: {
            author: true,
            comments: {
              include: {
                author: true,
              },
            },
            shares: {
              include: {
                person: true,
              },
              where: {
                personId: user.id,
              },
              take: 1,
            },
          },
        },
      },
    });

    return notes;
  }

  @Authorized()
  @Query(() => NoteModel)
  async getNoteById(@Arg("id", () => String) id: string) {
    const note = await prisma.note.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
        shares: {
          include: {
            person: true,
          },
        },
      },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  }
}
