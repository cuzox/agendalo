/**
 * @param {"xl" | "lg" | "md" | "sm" | "xs"} track screen size to target
 * @param {function} cb function to execute when width is less than or equal to the track value
 * @returns {function} remove media query listener from returned object
 */
export default function MediaQuery (track, cb){
  let mq;
  let timeout;
  let queries = {
    xl: "(max-width: 1690px)",
    lg: "(max-width: 1280px)",
    md: "(max-width: 980px)",
    sm: "(max-width: 736px)",
    xs: "(max-width: 480px)"
  }

  let widthChange = (mq) => {
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
      if (mq.matches) cb()
    }, 200)
  }

  if(matchMedia){
    mq = window.matchMedia(queries[track] || `(max-width: ${track}px`)
    mq.addListener(widthChange)
    widthChange(mq)
  }

  return {
    removeListener: ()=>{
      if(mq) mq.removeListener(widthChange)
    }
  }
}