import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Button } from './components/ui/button'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>Hello World</div>
        <Button variant={'default'}>Button</Button>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
