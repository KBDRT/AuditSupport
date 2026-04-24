export const FixDialog = () =>
{
  setTimeout(() => {
    document.body.style.pointerEvents = ''
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.paddingRight = ''  
    
    document.body.style.removeProperty('padding-right')
  }, 0)
}