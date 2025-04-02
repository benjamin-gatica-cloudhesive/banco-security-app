import { handler as login } from "../lambdas/auth/initLogIn";
import { handler as mfa } from "../lambdas/auth/manageMFA"

// login({
//   body: JSON.stringify({
//     userName: 'cognito.test@yopmail.com',
//     password: 'Qwerty1234.'
//   })
// } as any)
mfa({
  body: JSON.stringify({
    userName: 'cognito.test@yopmail.com',
    mfaCode: '724524',
    session: 'AYABeOGGaHq_Bmg84crN6pzZRLAAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMAS2Fybjphd3M6a21zOnVzLWVhc3QtMTo3NDU2MjM0Njc1NTU6a2V5L2IxNTVhZmNhLWJmMjktNGVlZC1hZmQ4LWE5ZTA5MzY1M2RiZQC4AQIBAHhR9E4zNbI1ofi3Y01_Ljgh2wK-ZaC__bKufjbgmejy4gGgzXBRPl751Q7J1IZms55OAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMg5fnyCYO4vLQ16ctAgEQgDuqYDW7xRX89YO1C5RK0Y46Oyzg6Qfv-ukRT7ekim5DFcCg5d2qjz3kZ-mf2wAgj7dOCyytuS6mj6TVIAIAAAAADAAAEAAAAAAAAAAAAAAAAAAEQUhOVE-OE478grBoUP_7_____wAAAAEAAAAAAAAAAAAAAAEAAAEdvyt7FJrU5hJlCynsU5oT1FnMeHKQn_OqVVf9ZSNnjM4Y5zZ8lGel38PmrCDTcK-Nyb7ipZ8yDYV-29P8Oo8oKsARWB1WXv4cOzjs_bWV8F2PsHw4gKGp4MrIHv9IR5AAvyQpj7xsAVBTAO7XiHDRBZBvLogYqxCEcBXq_sNPQn5G3nQG1rC7xZYRPpguN2VwHPeN-tYw1MIJVRKNrdEU1SdBThF6iYQv8wk48gFdRE998aQmDZHjvNXjqKPO5UjyFES7DwloZ8DKomj14DM8RNGOZpepy43K7dWpaVsbc6RuvdANr7oKqxbSBoLaulkgD70LMY48P7QbunMfGfxfid_jK-EsBiz7HSOQPYECaGNcjEqx3Bqcu_4d1fHAMX_w5K6KZ3jlsAYni7JBtw'
  })
} as any)