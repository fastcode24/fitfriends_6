export function ScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const centerElement = (element: HTMLElement | null) => {
  if (element) {
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = elementTop - (windowHeight / 2 - elementHeight / 2);

    setTimeout(() => {
      window.scrollTo({ top: scrollDistance, behavior: 'smooth' });
    }, 0);
  }
};
