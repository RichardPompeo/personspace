import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { randomUUID } from "node:crypto";

import { NoteShareResponseModel } from "../dtos/models/notes/NoteShareResponseModel";
import { ResponseModel } from "../dtos/models/app/ResponseModel";
import { CreateNoteShareInput } from "../dtos/inputs/notes/CreateNoteShareInput";
import { DeleteNoteShareInput } from "../dtos/inputs/notes/DeleteNoteShareInput";

import { Authorization } from "../middlewares/authorization";

import { prisma } from "../helpers/prisma";

@Resolver()
export class NoteShareResolver {
  @Authorized()
  @Mutation(() => NoteShareResponseModel)
  async createNoteShare(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: CreateNoteShareInput
  ) {
    await Authorization.verify(context.bearerToken);

    const noteShare: any = {
      id: randomUUID(),
      noteId: input.noteId,
      personId: input.personId,
    };

    const existing = await prisma.noteShare.findMany({
      where: { noteId: input.noteId, personId: input.personId },
    });

    if (existing.length >= 1) {
      return { success: false, error: { code: "400", message: "Duplicated" } };
    }

    const note = await prisma.note.findFirst({ where: { id: input.noteId } });

    if (note.authorId === input.personId) {
      return { success: false, error: { code: "400", message: "Author" } };
    }

    const data = await prisma.noteShare
      .create({ data: noteShare, include: { person: true } })
      .catch((err) => {
        throw Error(`'${err}'`);
      });

    console.log(data);

    return { success: true, ...data };
  }

  @Authorized()
  @Mutation(() => ResponseModel)
  async deleteNoteShare(
    @Ctx() context: { bearerToken: string },
    @Arg("input") input: DeleteNoteShareInput
  ) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.user.findFirst({
      where: { firebaseId: payload.uid },
    });

    const data = await prisma.noteShare.findUnique({
      where: { id: input.id },
      include: {
        note: true,
      },
    });

    if (!data) {
      return {
        success: false,
        error: { code: "400", message: "Invalid ID provided." },
      };
    }

    if (user.id !== data.note.authorId && user.id !== data.personId) {
      return {
        success: false,
        error: { code: "401", message: "Not authorized." },
      };
    }

    await prisma.noteShare.delete({ where: { id: input.id } }).catch((err) => {
      return {
        success: false,
        error: { code: err.code, message: err.message },
      };
    });

    return { success: true };
  }
}
