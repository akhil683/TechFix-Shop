"use client"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputHTMLAttributes } from "react"

type Props<T> = {
  fieldTitle: string,
  nameInSchema: keyof T & string,
  className?: string,
} & InputHTMLAttributes<HTMLInputElement>

export function InputWithLabel<S>({
  fieldTitle, nameInSchema, className, ...props
}: Props<S>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full max-w-xs disabled:text-blue-400 dark:disabled:text-yellow-500 disabled:opacity-75 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
