export function Footer() {
  return (
    <footer className="bg-transparent border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-sm text-muted flex items-center justify-between">
        <div>© {new Date().getFullYear()} Printed Poster</div>
        <div className="space-x-4">
          <a href="/privacy" className="hover:text-foreground">Privacy</a>
          <a href="/terms" className="hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  )
}
