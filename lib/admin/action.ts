// Shared shape returned by every back-office server action (client-safe).
export type ActionState = {
  ok?: boolean;
  message?: string;
  /** Field name → error message */
  errors?: Record<string, string>;
};

export type FormAction = (state: ActionState, formData: FormData) => Promise<ActionState>;
