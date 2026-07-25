import { z } from "zod";

export const uuidSchema = z.string().uuid();
export const jsonSchema = z.unknown();
export const optionalString = z.string().trim().min(1).optional().nullable();
export const requiredString = z.string().trim().min(1);
export const optionalDate = z.coerce.date().optional().nullable();
export const requiredDate = z.coerce.date();
export const optionalInt = z.coerce.number().int().optional().nullable();
export const requiredInt = z.coerce.number().int();
export const optionalDecimal = z.union([z.string().min(1), z.number()]).optional().nullable();
export const requiredDecimal = z.union([z.string().min(1), z.number()]);
export const optionalUuid = uuidSchema.optional().nullable();
export const requiredUuid = uuidSchema;

export function createCrudSchemas<T extends z.ZodRawShape>(shape: T) {
  const create = z.object(shape).strict();
  return {
    createSchema: create,
    updateSchema: create.partial().strict()
  };
}
