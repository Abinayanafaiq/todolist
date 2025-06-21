import mongooseModule from "mongoose";

declare global {
  var mongoose:
    | {
        conn: typeof mongooseModule | null;
        promise: Promise<typeof mongooseModule> | null;
      }
    | undefined;
}

export {};
