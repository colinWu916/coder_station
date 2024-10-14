const routeBeforeConfig = [
  { path: "/issues", needLogin: false },
  { path: "/issues/:id", needLogin: true },
  { path: "/books", needLogin: true },
  { path: "/books/:id", needLogin: true },
  { path: "/interviews", needLogin: true },
  { path: "/personal", needLogin: true },
  { path: "/addIssue", needLogin: true },
  { path: "/searchPage", needLogin: true },
  { path: "/", needLogin: false }
]

export default routeBeforeConfig;
