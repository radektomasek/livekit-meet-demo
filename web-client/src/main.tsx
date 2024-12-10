import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { extractEnvVariables } from "@/utils"
import { router } from "@/routes"
import "./index.css"

const { httpRetryAttempt, httpRetryDelay } = extractEnvVariables()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: httpRetryAttempt,
      retryDelay: httpRetryDelay,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
)
