import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { randomUUID } from "node:crypto";

import { NoteCommentModel } from "../dtos/models/notes/NoteCommentModel";
import { CreateNoteCommentInput } from "../dtos/inputs/notes/CreateNoteCommentInput";
import { Authorization } from "../middlewares/authorization";
import { prisma } from "../helpers/prisma";

@Resolver()
export class NoteCommentsResolver {
  @Authorized()
  @Mutation(() => NoteCommentModel)
  async createNoteComment(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: CreateNoteCommentInput,
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.users.findFirst({
      where: { firebaseId: payload.uid },
    });

    const note = await prisma.note.findUnique({
      where: { id: input.noteId },
    });

    if (!user || !note) {
      throw new Error("User or note not found");
    }

    const noteShares = await prisma.noteShare.findMany({
      where: { noteId: note.id },
    });

    if (
      note.authorId !== user.id ||
      !noteShares.some((share) => share.personId === user.id)
    ) {
      throw new Error("Unauthorized");
    }

    const data = await prisma.noteComment.create({
      data: {
        id: randomUUID(),
        authorId: user.id,
        noteId: input.noteId,
        message: input.message,
        createdAt: new Date(),
      },
      include: { author: true },
    });

    return data;
  }

  @Authorized()
  @Query(() => [NoteCommentModel])
  async getNoteComments(@Arg("noteId", () => String) noteId: string) {
    const comments = await prisma.noteComment.findMany({
      where: { noteId },
      include: {
        author: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return comments;
  }
}
