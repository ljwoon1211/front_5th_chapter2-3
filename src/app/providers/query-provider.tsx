import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode, useState } from "react"

interface QueryProviderProps {
  children: ReactNode
  testQueryClient?: QueryClient
}

export const QueryProvider = ({ children, testQueryClient }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      testQueryClient ||
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1분
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
