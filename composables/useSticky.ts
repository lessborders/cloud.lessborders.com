export const useSticky = (el: HTMLElement, offset: number) => {
  let showNavbar = true
  let lastScrollPosition = 0

  const onScroll = () => {
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop
    const scrollOffset = 70

    if (currentScrollPosition < 0) {
      return
    }

    if (Math.abs(currentScrollPosition - lastScrollPosition) < scrollOffset) {
      return
    }

    showNavbar = currentScrollPosition < lastScrollPosition
    lastScrollPosition = currentScrollPosition

    if (currentScrollPosition > offset) {
      el.classList.add('sticky')
    } else {
      el.classList.remove('sticky')
    }

    if (!showNavbar) {
      el.classList.add('navbar--hidden')
    } else {
      el.classList.remove('navbar--hidden')
    }
  }

  // lifecycle hooks
  window.addEventListener('scroll', onScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    onScroll,
  }
}
