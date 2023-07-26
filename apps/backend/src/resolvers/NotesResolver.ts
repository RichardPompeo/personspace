import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { randomUUID } from "node:crypto";

import { CreateNoteInput } from "../dtos/inputs/CreateNoteInput";
import { UpdateNoteInput } from "../dtos/inputs/UpdateNoteInput";
import { DeleteNoteInput } from "../dtos/inputs/DeleteNoteInput";

import { ResponseModel } from "../dtos/models/ResponseModel";
import { NoteModel } from "../dtos/models/NoteModel";

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
    await Authorization.verify(context.bearerToken);

    const note: any = {
      id: input.id,
      title: input.title,
      description: input.description,
      updatedAt: input.updatedAt,
    };

    await prisma.note
      .update({ data: note, where: { id: input.id } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });

    return note;
  }

  @Authorized()
  @Mutation(() => ResponseModel)
  async deleteNote(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: DeleteNoteInput
  ) {
    await Authorization.verify(context.bearerToken);

    await prisma.note.delete({ where: { id: input.id } }).catch((err) => {
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
      include: {
        notes: true,
      },
    });

    return user.notes;
  }
}
