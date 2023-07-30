import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { randomUUID } from "node:crypto";

import { NoteCommentModel } from "../dtos/models/NoteCommentModel";
import { CreateNoteCommentInput } from "../dtos/inputs/CreateNoteCommentInput";

import { Authorization } from "../middlewares/authorization";

import { prisma } from "../helpers/prisma";

@Resolver()
export class NoteCommentsResolver {
  @Authorized()
  @Mutation(() => NoteCommentModel)
  async createNoteComment(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: CreateNoteCommentInput
  ) {
    await Authorization.verify(context.bearerToken);

    const noteComment: any = {
      id: randomUUID(),
      authorId: input.authorId,
      noteId: input.noteId,
      message: input.message,
      createdAt: input.createdAt,
    };

    const data = await prisma.noteComment
      .create({ data: noteComment, include: { author: true } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });

    return data;
  }
}
