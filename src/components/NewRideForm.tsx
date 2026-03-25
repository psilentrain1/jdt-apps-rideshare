import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Resolver } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { addRide } from "../utils/db.utils";

const formSchema = z.object({
  service: z.literal(["uber", "lyft"]),
  start_time: z.string(),
  account: z.literal(["sofi", "chime", "cashapp"]),
  fare: z.coerce.number().nonnegative(),
  fee: z.coerce.number().nonnegative(),
  tip: z.coerce.number().nonnegative(),
});

type FormValues = z.infer<typeof formSchema>;

// TODO: Style form
export default function NewRideForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      service: undefined,
      start_time: new Date().toISOString(),
      account: undefined,
      fare: 0,
      fee: 0,
      tip: 0,
    },
  });

  const [date, setDate] = useState<Date>(new Date());

  const TriggerWithSlot = PopoverTrigger as React.ComponentType<
    React.ComponentPropsWithoutRef<typeof PopoverTrigger> & {
      asChild?: boolean;
    }
  >;

  function handleSelectDate(date: Date | undefined) {
    if (date) {
      setDate((prev) => {
        const next = new Date(prev);
        next.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        return next;
      });
    }
  }

  function handleChangeTime(
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const [hours, minutes, seconds] = e.target.value.split(":").map(Number);
    setDate((prev) => {
      const next = new Date(prev);
      next.setHours(hours, minutes, seconds, 0);
      return next;
    });
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const dataToSubmit: z.infer<typeof formSchema> = {
      ...data,
      start_time: date.toISOString(),
    };
    if (await addRide(dataToSubmit)) {
      form.reset();
      setDate(new Date());
    }
  }

  return (
    <>
      <form id="ride-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="service"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ride-form-select-service">
                  Service
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="ride-form-select-service"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uber">Uber</SelectItem>
                    <SelectItem value="lyft">Lyft</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="start_time"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ride-form-start_time">
                  Ride Start Time
                </FieldLabel>
                <Popover>
                  <TriggerWithSlot asChild>
                    <Button variant="secondary">
                      {date.toLocaleDateString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </Button>
                  </TriggerWithSlot>
                  <PopoverContent align="start">
                    <Card size="sm" className="mx-auto w-fit">
                      <CardContent>
                        <Calendar
                          autoFocus
                          mode="single"
                          defaultMonth={new Date(field.value)}
                          selected={date}
                          onSelect={handleSelectDate}
                        />
                      </CardContent>
                      <CardFooter className="border-t bg-card">
                        <Field>
                          <FieldLabel htmlFor="cal-start-time">
                            Ride Start Time
                          </FieldLabel>
                          <Input
                            id="cal-start-time"
                            type="time"
                            step="1"
                            defaultValue="00:00:00"
                            onChange={handleChangeTime}
                          />
                        </Field>
                      </CardFooter>
                    </Card>
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="account"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ride-form-account">Account</FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="ride-form-select-account"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select an account." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sofi">SoFi</SelectItem>
                    <SelectItem value="chime">Chime</SelectItem>
                    <SelectItem value="cashapp">CashApp</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="fare"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ride-form-fare">Fare</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="ride-form-fare"
                  aria-invalid={fieldState.invalid}
                  placeholder="Fare amount"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="fee"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ride-form-fee">Fee</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="ride-form-fee"
                  aria-invalid={fieldState.invalid}
                  placeholder="Amount of any fees"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="tip"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="ride-form-tip">Tip</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="ride-form-tip"
                  aria-invalid={fieldState.invalid}
                  placeholder="Tip given"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button type="submit" form="ride-form">
        Submit
      </Button>
    </>
  );
}
