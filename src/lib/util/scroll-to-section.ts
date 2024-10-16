export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const navHeight = 96
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - navHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
