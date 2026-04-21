import { useEffect } from 'react'
import nbsp from '../utils/nbsp.js'

// Проходим по всем текстовым узлам документа и заменяем пробел
// ПОСЛЕ коротких слов (в, с, и, у, на, что, как, не, для, ...) на
// неразрывный пробел, чтобы они не висели в конце строки.
// Избегаем <input>, <textarea>, <code>, <pre>, <style>, <script> и
// служебных контейнеров.

const SKIP_TAGS = new Set([
  'INPUT', 'TEXTAREA', 'CODE', 'PRE', 'STYLE', 'SCRIPT', 'KBD', 'NOSCRIPT',
])

function walk(node) {
  if (!node) return
  if (node.nodeType === 3) {
    // текстовый узел
    const parent = node.parentNode
    if (!parent) return
    if (SKIP_TAGS.has(parent.tagName)) return
    if (parent.closest('[data-nonbsp="true"]')) return
    const fixed = nbsp(node.nodeValue)
    if (fixed !== node.nodeValue) node.nodeValue = fixed
    return
  }
  if (node.nodeType !== 1) return
  if (SKIP_TAGS.has(node.tagName)) return
  for (let child = node.firstChild; child; child = child.nextSibling) {
    walk(child)
  }
}

export default function useNbspTypography() {
  useEffect(() => {
    const root = document.getElementById('root') || document.body
    // первичный проход после маунта
    const run = () => walk(root)
    run()

    // наблюдаем за изменениями DOM (роут-смена, анимации)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((n) => walk(n))
        } else if (m.type === 'characterData') {
          walk(m.target)
        }
      }
    })
    mo.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => mo.disconnect()
  }, [])
}
