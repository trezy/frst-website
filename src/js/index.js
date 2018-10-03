// Create the config object
window.frst = {
  allSectionsHaveBeenAnimated: false,
  banner: document.querySelector('[role=banner]'),
  bannerIsTransparent: true,
  signupDialog: document.querySelector('dialog#signup'),
  successDialog: document.querySelector('dialog#signup-success'),
  sections: {},
}





// Create the animation tracking object for each section
for (const section of Array.from(document.querySelectorAll('section'))) {
  section.setAttribute('data-visible', false)

  window.frst.sections[section.getAttribute('id')] = {
    animationComplete: false,
    element: section,
  }
}





// Add close handlers for each dialog
for (const dialog of Array.from(document.querySelectorAll('dialog'))) {
  dialog.querySelector('button.close').addEventListener('click', () => {
    dialog.close()
  })
}





// Add listeners for beta signup buttons
for (const button of Array.from(document.querySelectorAll('.beta-signup'))) {
  button.addEventListener('click', () => {
    const { signupDialog } = window.frst

    if (!signupDialog.open) {
      signupDialog.showModal()
    }
  })
}





// Handle submission of the beta signup form
window.frst.signupDialog.querySelector('form').addEventListener('submit', async event => {
  const { target } = event
  const inputs = Array.from(target.querySelectorAll('input'))
  const mergeFieldKeys = ['FNAME', 'LNAME']
  const data = {
    merge_fields: {},
    status: 'subscribed',
  }

  event.preventDefault()

  for (const input of inputs) {
    if (mergeFieldKeys.includes(input.name)) {
      data.merge_fields[input.name] = input.value
    } else {
      data[input.name] = input.value
    }
  }

  await fetch('https://us-central1-frst-website.cloudfunctions.net/addSubscriber', {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
  })

  window.frst.successDialog.showModal()
  window.frst.signupDialog.close()

  setTimeout(() => window.frst.successDialog.close(), 2000)
})





// Add a scroll listener to handle section animations
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

    window.frst.allSectionsHaveBeenAnimated = Object.values(window.frst.sections).every(({ animationComplete }) => animationComplete)
  }
})
