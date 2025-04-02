import { handler as login } from "../lambdas/auth/handler";

login({
  body: JSON.stringify({
    userName: 'pedrito',
    password: 'Qwerty1234.'
  })
} as any)
