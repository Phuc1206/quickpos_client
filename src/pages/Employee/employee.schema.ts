// employee.schema.ts
import { z } from "zod";

export const employeeSchema = z.object({
	name: z.string().min(1, "Tên không được để trống"),
	phoneNumber: z
		.string()
		.min(10, "SĐT không hợp lệ")
		.max(11, "SĐT không hợp lệ")
		.regex(/^[0-9]+$/, "Chỉ được nhập số"),
	address: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
