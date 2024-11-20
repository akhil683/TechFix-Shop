"use client"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent } from "../ui/select"

type Props<T> = {
  fieldTitle: string,
  nameInSchema: keyof T & string,
  className?: string,
} & InputHTMLAttributes<HTMLInputElement>
