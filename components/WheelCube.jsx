'use client'

import { useEffect, useRef } from 'react'

export default function WheelCube() {
  const canvasRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return

    const ctx = canvas.getContext('2d', { alpha: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let DPR = 1
    let W = 0
    let H = 0

    function applyStyles() {
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = '#141414'
      ctx.fillStyle = '#141414'
      ctx.lineWidth = 1.5
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.floor(W * DPR)
      canvas.height = Math.floor(H * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      applyStyles()
    }
    window.addEventListener('resize', resize, { passive: true })
    resize()

    const V = [
      [1, 1, 1],
      [-1, 1, 1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, -1],
      [1, -1, -1],
    ]

    const CUBE_EDGES = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ]

    function rotAxis(v, k, theta) {
      const c = Math.cos(theta), s = Math.sin(theta)
      const kv = k[0] * v[0] + k[1] * v[1] + k[2] * v[2]
      const cx = k[1] * v[2] - k[2] * v[1]
      const cy = k[2] * v[0] - k[0] * v[2]
      const cz = k[0] * v[1] - k[1] * v[0]
      return [
        v[0] * c + cx * s + k[0] * kv * (1 - c),
        v[1] * c + cy * s + k[1] * kv * (1 - c),
        v[2] * c + cz * s + k[2] * kv * (1 - c),
      ]
    }

    const ISO_AXIS = [1 / Math.SQRT2, -1 / Math.SQRT2, 0]
    const ISO_ANGLE = Math.acos(1 / Math.sqrt(3))
    const ISO_TWIST = -Math.PI / 12

    function isoView(v) {
      const r = rotAxis(v, ISO_AXIS, ISO_ANGLE)
      const c = Math.cos(ISO_TWIST), s = Math.sin(ISO_TWIST)
      return [r[0] * c - r[1] * s, r[0] * s + r[1] * c, r[2]]
    }

    const ISO_X = new Float64Array(8)
    const ISO_Y = new Float64Array(8)
    const ISO_Z = new Float64Array(8)
    for (let i = 0; i < 8; i++) {
      const r = isoView(V[i])
      ISO_X[i] = r[0]
      ISO_Y[i] = r[1]
      ISO_Z[i] = r[2]
    }

    const P_STILLNESS = 0, P_SPIN_UP = 1, P_SPIN = 2, P_SPIN_DOWN = 3,
      P_TUMBLE_UP = 4, P_TUMBLE = 5, P_TUMBLE_DOWN = 6,
      P_ROLL_UP = 7, P_ROLL = 8, P_ROLL_DOWN = 9,
      P_REST = 10

    const PHASES = [
      { id: P_STILLNESS, dur: 5.0 },
      { id: P_SPIN_UP, dur: 3.0 },
      { id: P_SPIN, dur: 10.0 },
      { id: P_SPIN_DOWN, dur: 4.5 },
      { id: P_TUMBLE_UP, dur: 3.5 },
      { id: P_TUMBLE, dur: 14.0 },
      { id: P_TUMBLE_DOWN, dur: 4.5 },
      { id: P_ROLL_UP, dur: 3.5 },
      { id: P_ROLL, dur: 14.0 },
      { id: P_ROLL_DOWN, dur: 4.5 },
      { id: P_REST, dur: 6.0 },
    ]
    const TOTAL = PHASES.reduce((s, p) => s + p.dur, 0)

    const PHASE_START = new Float64Array(PHASES.length)
    {
      let acc = 0
      for (let i = 0; i < PHASES.length; i++) {
        PHASE_START[i] = acc
        acc += PHASES[i].dur
      }
    }

    let _phaseIndex = 0
    function phaseAt(t) {
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (t >= PHASE_START[i]) {
          _phaseIndex = i
          return (t - PHASE_START[i]) / PHASES[i].dur
        }
      }
      _phaseIndex = 0
      return 0
    }

    const SPIN_UP_DUR = 3.0
    const SPIN_DUR = 10.0
    const SPIN_DOWN_DUR = 4.5
    const SPIN_OMEGA = (2 * Math.PI) /
      (SPIN_UP_DUR / 2 + SPIN_DUR + SPIN_DOWN_DUR / 2)
    const SPIN_UP_END = SPIN_OMEGA * SPIN_UP_DUR / 2
    const SPIN_DOWN_START = SPIN_UP_END + SPIN_OMEGA * SPIN_DUR

    const TUMBLE_PIVOT = isoView([-1, 1, -1])
    const TUMBLE_AXIS = (() => {
      const v3 = isoView([1, -1, 1])
      const dx = v3[0] - TUMBLE_PIVOT[0]
      const dy = v3[1] - TUMBLE_PIVOT[1]
      const dz = v3[2] - TUMBLE_PIVOT[2]
      const m = Math.sqrt(dx * dx + dy * dy + dz * dz)
      return [dx / m, dy / m, dz / m]
    })()
    const TAX = TUMBLE_AXIS[0], TAY = TUMBLE_AXIS[1], TAZ = TUMBLE_AXIS[2]
    const TPX = TUMBLE_PIVOT[0], TPY = TUMBLE_PIVOT[1], TPZ = TUMBLE_PIVOT[2]

    const REL_X = new Float64Array(8)
    const REL_Y = new Float64Array(8)
    const REL_Z = new Float64Array(8)
    for (let i = 0; i < 8; i++) {
      REL_X[i] = ISO_X[i] - TPX
      REL_Y[i] = ISO_Y[i] - TPY
      REL_Z[i] = ISO_Z[i] - TPZ
    }

    const TUMBLE_UP_DUR = 3.5
    const TUMBLE_DUR = 14.0
    const TUMBLE_DOWN_DUR = 4.5
    const TUMBLE_TOTAL_ANGLE = 2 * Math.PI / 3
    const TUMBLE_OMEGA = TUMBLE_TOTAL_ANGLE /
      (TUMBLE_UP_DUR / 2 + TUMBLE_DUR + TUMBLE_DOWN_DUR / 2)
    const TUMBLE_UP_END = TUMBLE_OMEGA * TUMBLE_UP_DUR / 2
    const TUMBLE_DOWN_START = TUMBLE_UP_END + TUMBLE_OMEGA * TUMBLE_DUR

    const ROLL_UP_DUR = 3.5
    const ROLL_DUR = 14.0
    const ROLL_DOWN_DUR = 4.5
    const ROLL_TOTAL_ANGLE = Math.PI
    const ROLL_OMEGA = ROLL_TOTAL_ANGLE /
      (ROLL_UP_DUR / 2 + ROLL_DUR + ROLL_DOWN_DUR / 2)
    const ROLL_UP_END = ROLL_OMEGA * ROLL_UP_DUR / 2
    const ROLL_DOWN_START = ROLL_UP_END + ROLL_OMEGA * ROLL_DUR

    const PX = new Float64Array(8)
    const PY = new Float64Array(8)
    const TWO_PI = Math.PI * 2

    function draw(t) {
      ctx.clearRect(0, 0, W, H)

      const local = phaseAt(t)
      const phase = PHASES[_phaseIndex]

      const cx = W * 0.5, cy = H * 0.5

      const R_REST = Math.min(W, H) * 0.22
      const R_ROLL = R_REST * 0.94280904

      let wheelAngle = 0, tumbleAngle = 0, rollAngle = 0

      switch (phase.id) {
        case P_SPIN_UP:
          wheelAngle = SPIN_OMEGA * SPIN_UP_DUR * (local * local) * 0.5
          break
        case P_SPIN:
          wheelAngle = SPIN_UP_END + SPIN_OMEGA * local * SPIN_DUR
          break
        case P_SPIN_DOWN: {
          const inv = 1 - local
          wheelAngle = SPIN_DOWN_START + SPIN_OMEGA * SPIN_DOWN_DUR * (1 - inv * inv) * 0.5
          break
        }
        case P_TUMBLE_UP:
          tumbleAngle = TUMBLE_OMEGA * TUMBLE_UP_DUR * (local * local) * 0.5
          break
        case P_TUMBLE:
          tumbleAngle = TUMBLE_UP_END + TUMBLE_OMEGA * local * TUMBLE_DUR
          break
        case P_TUMBLE_DOWN: {
          const inv = 1 - local
          tumbleAngle = TUMBLE_DOWN_START + TUMBLE_OMEGA * TUMBLE_DOWN_DUR * (1 - inv * inv) * 0.5
          break
        }
        case P_ROLL_UP:
          rollAngle = ROLL_OMEGA * ROLL_UP_DUR * (local * local) * 0.5
          break
        case P_ROLL:
          rollAngle = ROLL_UP_END + ROLL_OMEGA * local * ROLL_DUR
          break
        case P_ROLL_DOWN: {
          const inv = 1 - local
          rollAngle = ROLL_DOWN_START + ROLL_OMEGA * ROLL_DOWN_DUR * (1 - inv * inv) * 0.5
          break
        }
      }

      let rollness = 0
      switch (phase.id) {
        case P_ROLL_UP: rollness = local * local; break
        case P_ROLL: rollness = 1; break
        case P_ROLL_DOWN: { const inv = 1 - local; rollness = inv * inv; break }
      }
      const R = R_REST + (R_ROLL - R_REST) * rollness

      const doTumble = tumbleAngle !== 0
      const doRoll = rollAngle !== 0
      const doWheel = wheelAngle !== 0

      let tC = 1, tS = 0, tOC = 0
      if (doTumble) { tC = Math.cos(tumbleAngle); tS = Math.sin(tumbleAngle); tOC = 1 - tC }
      let roC = 1, roS = 0
      if (doRoll) { roC = Math.cos(rollAngle); roS = Math.sin(rollAngle) }
      let wC = 1, wS = 0
      if (doWheel) { wC = Math.cos(wheelAngle); wS = Math.sin(wheelAngle) }

      for (let i = 0; i < 8; i++) {
        let rx, ry, rz

        if (doTumble) {
          const x = REL_X[i], y = REL_Y[i], z = REL_Z[i]
          const kv = TAX * x + TAY * y + TAZ * z
          rx = TPX + x * tC + (TAY * z - TAZ * y) * tS + TAX * kv * tOC
          ry = TPY + y * tC + (TAZ * x - TAX * z) * tS + TAY * kv * tOC
          rz = TPZ + z * tC + (TAX * y - TAY * x) * tS + TAZ * kv * tOC
        } else {
          rx = ISO_X[i]; ry = ISO_Y[i]; rz = ISO_Z[i]
        }

        if (doRoll) {
          const ny = ry * roC - rz * roS
          const nz = ry * roS + rz * roC
          ry = ny; rz = nz
        }

        if (doWheel) {
          const nx = rx * wC - ry * wS
          const ny = rx * wS + ry * wC
          rx = nx; ry = ny
        }

        PX[i] = cx + rx * R
        PY[i] = cy + ry * R
      }

      ctx.beginPath()
      for (let i = 0; i < 12; i++) {
        const e = CUBE_EDGES[i]
        ctx.moveTo(PX[e[0]], PY[e[0]])
        ctx.lineTo(PX[e[1]], PY[e[1]])
      }
      ctx.stroke()

      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const x = PX[i], y = PY[i]
        ctx.moveTo(x + 5, y)
        ctx.arc(x, y, 5, 0, TWO_PI)
      }
      ctx.fill()
    }

    let rafId = 0
    let startTime = 0
    let pausedAt = 0
    let running = false

    function frame(now) {
      const elapsed = ((now - startTime) / 1000) % TOTAL
      draw(elapsed)
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      if (running) return
      running = true
      if (pausedAt !== 0) {
        const resumeNow = performance.now()
        startTime += (resumeNow - pausedAt)
        pausedAt = 0
      } else {
        startTime = performance.now()
      }
      rafId = requestAnimationFrame(frame)
    }

    function stop() {
      if (!running) return
      running = false
      pausedAt = performance.now()
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0 }
    }

    let isVisible = true
    let isOnScreen = true

    function syncRunState() {
      if (isVisible && isOnScreen) start(); else stop()
    }

    function onVisibility() {
      isVisible = !document.hidden
      syncRunState()
    }
    document.addEventListener('visibilitychange', onVisibility)

    let io = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
          isOnScreen = entries[i].isIntersecting
        }
        syncRunState()
      }, { threshold: 0 })
      io.observe(stage)
    }

    if (reducedMotion) {
      draw(0)
    } else {
      start()
    }

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (io) io.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      className="relative w-full aspect-square"
      style={{ contain: 'layout paint' }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
