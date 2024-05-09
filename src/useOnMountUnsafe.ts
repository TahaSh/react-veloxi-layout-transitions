// https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7

import type { EffectCallback } from "react"
import { useEffect, useRef } from "react"

export function useOnMountUnsafe(effect: EffectCallback) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
