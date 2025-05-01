import { BrowserRouter as Router } from "react-router-dom"
import Header from "./widgets/ui/Header.tsx"
import Footer from "./widgets/ui/Footer.tsx"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { QueryProvider } from "./app/providers/query-provider.tsx"

const App = () => {
  const isProd = import.meta.env.MODE === "production"
  const basename = isProd ? "/front_5th_chapter2-3/" : ""

  return (
    <QueryProvider>
      <Router basename={basename}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryProvider>
  )
}

export default App
