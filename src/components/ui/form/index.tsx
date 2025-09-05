/* eslint-disable @typescript-eslint/no-unused-expressions */
import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type UseFormGetFieldState,
  type UseFormGetValues,
} from "react-hook-form";
import * as yup from "yup";

interface IFormRenderProps {
  formState: {
    isDirty: boolean;
    isLoading: boolean;
    isSubmitted: boolean;
    isSubmitSuccessful: boolean;
    isSubmitting: boolean;
    isValidating: boolean;
    isValid: boolean;
    disabled: boolean;
    submitCount: number;
    errors: unknown;
  };
  getValues: UseFormGetValues<Record<string, unknown>>;
  getFieldState: UseFormGetFieldState<{
    test: string;
  }>;
  [name: string]: unknown;
}
interface IFormProps {
  children?: ReactNode;
  render?: (formRenderProps: IFormRenderProps) => ReactNode;
  onSubmit?: (data: never) => void;
  validator?: yup.ObjectShape;
  defaultValues?: DefaultValues<unknown>;
}

function Form({ validator = {}, defaultValues = {}, ...props }: IFormProps) {
  const methods = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(yup.object().shape(validator)),
  });
  const {
    formState: { isDirty, isSubmitting, isValid, errors, ...restFormState },
    ...restMethods
  } = methods;

  const onSubmit = (data: never) => {
    props.onSubmit && props.onSubmit(data);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      methods.handleSubmit(onSubmit as never)();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="h-full"
        aria-hidden
        onSubmit={methods.handleSubmit(onSubmit as never)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {props.render
          ? props.render({
              formState: {
                isDirty,
                isSubmitting,
                isValid,
                errors,
                ...restFormState,
              },
              ...restMethods,
            } as unknown as IFormRenderProps)
          : props.children}
      </form>
    </FormProvider>
  );
}

export default Form;
