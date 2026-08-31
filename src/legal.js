const mobileToggle = document.querySelector('.mobile-toggle')
const mobileMenu = document.querySelector('.mobile-menu')

if (mobileToggle && mobileMenu) {
  const toggleMenu = () => {
    const isActive = mobileMenu.classList.toggle('active')
    mobileToggle.setAttribute('aria-expanded', isActive)
    // Keep aria-hidden/inert in step with the open state, or the panel's
    // links stay tabbable while being hidden from screen readers.
    mobileMenu.setAttribute('aria-hidden', String(!isActive))
    mobileMenu.inert = !isActive
    const spans = mobileToggle.querySelectorAll('span')
    if (isActive) {
      spans[0].style.transform = 'translateY(3.5px) rotate(45deg)'
      spans[1].style.transform = 'translateY(-3.5px) rotate(-45deg)'
    } else {
      spans[0].style.transform = ''
      spans[1].style.transform = ''
    }
  }

  mobileMenu.inert = true
  mobileToggle.addEventListener('click', toggleMenu)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      toggleMenu()
      mobileToggle.focus()
    }
  })
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active')
      mobileToggle.setAttribute('aria-expanded', false)
      const spans = mobileToggle.querySelectorAll('span')
      spans[0].style.transform = ''
      spans[1].style.transform = ''
    })
  })
}
