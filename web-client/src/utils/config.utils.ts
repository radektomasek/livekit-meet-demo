export const extractEnvVariables = (
  env: Record<string, string> = import.meta.env
) => {
  const requiredEnvVars = {
    apiBaseUrl: "VITE_API_BASE_URL",
    webSocketUrl: "VITE_LIVEKIT_WEBSOCKET_URL",
  }

  const envVars = Object.entries(requiredEnvVars).reduce(
    (acc, [key, varName]) => {
      const value = env[varName]
      if (!value) {
        throw new ReferenceError(`[env]: '${varName}' variable is not defined`)
      }
      acc[key] = value
      return acc
    },
    {} as Record<string, string>
  )

  const httpRetryAttempt = parseInt(env.VITE_HTTP_RETRY_ATTEMPT ?? "2", 10)
  const httpRetryDelay = parseInt(env.VITE_HTTP_RETRY_DELAY ?? "2000", 10)

  return {
    apiBaseUrl: envVars["apiBaseUrl"],
    webSocketUrl: envVars["webSocketUrl"],
    httpRetryAttempt,
    httpRetryDelay,
  }
}
