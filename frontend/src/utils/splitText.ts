import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'

export const useSplitText = (selector: string, animationConfig?: gsap.TweenVars) => {
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const splits = Array.from(elements).map((element) => 
      new SplitType(element as HTMLElement, { types: 'chars,words,lines' })
    )

    const ctx = gsap.context(() => {
      splits.forEach((split) => {
        if (split.chars) {
          gsap.from(split.chars, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
            ...animationConfig,
          })
        }
      })
    })

    hasAnimated.current = true

    return () => {
      ctx.revert()
      splits.forEach((split) => split.revert())
    }
  }, [selector, animationConfig])
}

export const splitTextAnimation = (
  element: HTMLElement | null,
  config?: gsap.TweenVars
) => {
  if (!element) return null

  const split = new SplitType(element, { types: 'chars,words,lines' })

  gsap.from(split.chars, {
    opacity: 0,
    y: 20,
    rotationX: -90,
    stagger: 0.02,
    duration: 0.8,
    ease: 'power3.out',
    ...config,
  })

  return split
}

export default SplitType
