window.frst = {
  allSectionsHaveBeenAnimated: false,
  banner: document.querySelector('[role=banner]'),
  bannerIsTransparent: true,
  sections: {},
}

for (const section of Array.from(document.querySelectorAll('section'))) {
  section.setAttribute('data-visible', false)

  window.frst.sections[section.getAttribute('id')] = {
    animationComplete: false,
    element: section,
  }
}

document.addEventListener('scroll', () => {
  const {
    innerHeight,
    scrollY,
  } = window
  const {
    allSectionsHaveBeenAnimated,
    banner,
    bannerIsTransparent,
    sections,
  } = window.frst

  if ((scrollY === 0) && !bannerIsTransparent) {
    window.frst.bannerIsTransparent = true
    banner.classList.add('transparent')
  } else if (bannerIsTransparent) {
    window.frst.bannerIsTransparent = false
    banner.classList.remove('transparent')
  }

  if (!allSectionsHaveBeenAnimated) {
    const halfInnerHeight = innerHeight / 2

    for (const [id, section] of Object.entries(sections)) {
      const {
        animationComplete,
        element,
      } = section

      if (!animationComplete && ((element.offsetTop - halfInnerHeight) <= scrollY)) {
        element.setAttribute('data-visible', true)
        window.frst.sections[id].animationComplete = true
      }
    }


  }
})
