export default function route(page) {
  switch (page) {
    case 'menu-provider-main':
      import('./pages/main')
      return true
  }
}
