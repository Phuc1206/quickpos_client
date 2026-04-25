"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
	Controller,
	FormProvider,
	useFormContext,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";

// ===== Form root =====
export const Form = FormProvider;

// ===== FormField =====
type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

export const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

// ===== useFormField =====
const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	return {
		name: fieldContext.name,
		...fieldState,
	};
};

// ===== FormItem =====
export const FormItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

// ===== FormLabel =====
export const FormLabel = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<LabelPrimitive.Root
			ref={ref}
			className={cn("text-sm font-medium", className)}
			{...props}
		/>
	);
});
FormLabel.displayName = "FormLabel";

// ===== FormControl =====
export const FormControl = React.forwardRef<
	React.ElementRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	return <Slot ref={ref} {...props} />;
});
FormControl.displayName = "FormControl";

// ===== FormMessage =====
export const FormMessage = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) return null;

	return (
		<p ref={ref} className={cn("text-sm text-red-500", className)} {...props}>
			{body}
		</p>
	);
});
FormMessage.displayName = "FormMessage";
