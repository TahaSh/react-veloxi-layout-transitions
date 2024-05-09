import { PluginFactory } from 'veloxi'

export const DemoPlugin: PluginFactory = (context) => {
  context.onViewAdded((view) => {
    if (view.name === 'card') {
      view.position.setAnimator('spring')
      view.opacity.setAnimator('tween', { duration: 400 })
      view.layoutTransition(true)

      if (context.initialized) {
        view.onAdd({
          beforeEnter(v) {
            v.position.set({ y: v.position.initialY - 100 }, false)
            v.opacity.set(0, false)
          },
          afterEnter(v) {
            v.position.reset()
            v.opacity.reset()
          }
        })
      }

      view.onRemove((v, done) => {
        v.position.set({ y: v.position.initialY + 100 })
        v.opacity.set(0)
        v.opacity.animator.onComplete(done)
      })
    }
  })
}

DemoPlugin.pluginName = 'DemoPlugin'
