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
    @Arg("input") input: CreateNoteInput
  ) {
    await Authorization.verify(context.bearerToken);

    const note: any = {
      id: randomUUID(),
      authorId: input.authorId,
      title: input.title,
      description: input.description,
      createdAt: input.createdAt,
      color: input.color,
    };

    await prisma.note.create({ data: note }).catch((err) => {
      throw Error(`'${err}'`);
    });

    return note;
  }

  @Authorized()
  @Mutation(() => NoteModel)
  async updateNote(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: UpdateNoteInput
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.user.findFirst({
      where: { firebaseId: payload.uid },
    });

    const note: any = {
      id: input.id,
      title: input.title,
      description: input.description,
      updatedAt: input.updatedAt,
    };

    await prisma.note
      .updateMany({ data: note, where: { id: input.id, authorId: user.id } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });

    const data = await prisma.note.findUnique({ where: { id: input.id } });

    return data;
  }

  @Authorized()
  @Mutation(() => ResponseModel)
  async deleteNote(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: DeleteNoteInput
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.user.findFirst({
      where: { firebaseId: payload.uid },
    });

    await prisma.noteComment
      .deleteMany({ where: { noteId: input.id } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });
    await prisma.noteShare
      .deleteMany({ where: { noteId: input.id } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });
    await prisma.note
      .deleteMany({ where: { id: input.id, authorId: user.id } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });

    return { success: true };
  }

  @Authorized()
  @Query(() => [NoteModel])
  async getNotes(@Ctx() context: { bearerToken: string }) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.user.findUnique({
      where: { firebaseId: payload.uid },
    });

    const notes = await prisma.note.findMany({
      where: { authorId: user.id },
      include: {
        author: true,
        noteComment: {
          include: {
            author: true,
          },
        },
        noteShare: {
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

    const user = await prisma.user.findUnique({
      where: { firebaseId: payload.uid },
    });

    const notes = await prisma.noteShare.findMany({
      where: { personId: user.id },
      include: {
        person: true,
        note: {
          include: {
            author: true,
            noteComment: {
              include: {
                author: true,
              },
            },
            noteShare: {
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
}
