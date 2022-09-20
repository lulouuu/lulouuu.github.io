document.lastScrollPosition = 0;
document.lastCentered = 0;
document.stopScroll = null;

document.addEventListener('scroll', () => {
  const direction = window.pageYOffset - document.lastScrollPosition > 0 ? 'down' : 'up';
  const sections = [...document.querySelectorAll('section')];

  if (document.stopScroll === null) {
    const destIndex = direction === 'up' ? document.lastCentered - 1 : document.lastCentered + 1;
    if (destIndex >= 0 && destIndex < sections.length) {
      console.log({destIndex,direction});
      document.stopScroll = destIndex;
      window.scroll(0, sections[destIndex].offsetTop);
    }
  }


  sections.forEach((section,index) => {
    if (window.pageYOffset === section.offsetTop) {
      document.lastCentered = index;
      section.className = 'active';
      if (document.stopScroll === index) {
        document.stopScroll = null;
      }
    } else {
      section.className = '';
    }
  })

  document.lastScrollPosition = window.pageYOffset;
})