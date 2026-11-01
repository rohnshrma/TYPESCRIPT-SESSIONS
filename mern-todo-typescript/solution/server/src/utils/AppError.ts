// Same pattern as Teacher in classes.ts: public constructor parameter + extends + super
export class AppError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
  }
}
