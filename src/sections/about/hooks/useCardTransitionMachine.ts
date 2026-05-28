import { useEffect, useRef, useReducer } from 'react'

/* ================================================================
   Public types
   ================================================================ */

/**
 * The five phases of the card/video transition cycle.
 *
 *   FIRST_ENTER → IDLE ⇄ EXIT_OUT → SWAPPING → ENTER_IN → IDLE
 */
export type Phase =
  | 'FIRST_ENTER'
  | 'IDLE'
  | 'EXIT_OUT'
  | 'SWAPPING'
  | 'ENTER_IN'

export interface TransitionState {
  /** Index of the card currently displayed (or being exited). */
  visualIndex: number
  /** Index of the card we are transitioning towards. */
  targetIndex: number
  /** Current phase of the state machine. */
  phase: Phase
  /** Index of the card that is exiting (only meaningful during EXIT_OUT). */
  exitingIndex: number
}

/* ================================================================
   Reducer
   ================================================================ */

export type Action =
  | { type: 'SCROLL_CHANGED'; scrollIndex: number }
  | { type: 'EXIT_ENDED' }
  | { type: 'SWAP_DONE' }
  | { type: 'ENTER_ENDED' }
  | { type: 'FIRST_ENTER_ENDED' }

function reducer(state: TransitionState, action: Action): TransitionState {
  switch (action.type) {
    /* ---- Scroll moved to a different card ---- */
    case 'SCROLL_CHANGED': {
      const { scrollIndex } = action

      // During active transitions, just update the target silently.
      // The FSM will pick up the latest target when it reaches IDLE.
      if (state.phase === 'EXIT_OUT' || state.phase === 'SWAPPING') {
        return { ...state, targetIndex: scrollIndex }
      }

      // During ENTER_IN, we can't interrupt — just record the new target.
      if (state.phase === 'ENTER_IN') {
        return { ...state, targetIndex: scrollIndex }
      }

      // During FIRST_ENTER, ignore scroll changes.
      if (state.phase === 'FIRST_ENTER') {
        return { ...state, targetIndex: scrollIndex }
      }

      // IDLE — if the index actually changed, start EXIT_OUT
      if (scrollIndex !== state.visualIndex) {
        return {
          ...state,
          phase: 'EXIT_OUT',
          targetIndex: scrollIndex,
          exitingIndex: state.visualIndex,
        }
      }

      return state
    }

    /* ---- Outing video finished ---- */
    case 'EXIT_ENDED':
      return {
        ...state,
        phase: 'SWAPPING',
      }

    /* ---- Visual index updated, ready to play entrance ---- */
    case 'SWAP_DONE':
      return {
        ...state,
        phase: 'ENTER_IN',
        visualIndex: state.targetIndex,
        exitingIndex: -1,
      }

    /* ---- Entrance video finished ---- */
    case 'ENTER_ENDED': {
      // If scroll moved again during ENTER_IN, immediately start a new exit
      if (state.targetIndex !== state.visualIndex) {
        return {
          ...state,
          phase: 'EXIT_OUT',
          exitingIndex: state.visualIndex,
        }
      }
      return {
        ...state,
        phase: 'IDLE',
      }
    }

    /* ---- First entrance video finished ---- */
    case 'FIRST_ENTER_ENDED': {
      if (state.targetIndex !== state.visualIndex) {
        return {
          ...state,
          phase: 'EXIT_OUT',
          exitingIndex: state.visualIndex,
        }
      }
      return {
        ...state,
        phase: 'IDLE',
      }
    }

    default:
      return state
  }
}

/* ================================================================
   Hook
   ================================================================ */

/**
 * useCardTransitionMachine
 * ────────────────────────
 * Single Responsibility: Finite state machine that orchestrates the
 * sequence of card/video transitions.
 *
 * Receives the current `scrollIndex` from the scroll observer.
 * Returns the current transition state (phase, visualIndex, etc.)
 * and dispatch functions for the video player to call when videos end.
 */
export function useCardTransitionMachine(scrollIndex: number) {
  const [state, dispatch] = useReducer(reducer, {
    visualIndex: 0,
    targetIndex: 0,
    phase: 'FIRST_ENTER' as Phase,
    exitingIndex: -1,
  })

  // Forward scroll changes into the FSM
  const prevScrollIndex = useRef(scrollIndex)
  useEffect(() => {
    if (scrollIndex !== prevScrollIndex.current) {
      prevScrollIndex.current = scrollIndex
      dispatch({ type: 'SCROLL_CHANGED', scrollIndex })
    }
  }, [scrollIndex])

  // SWAPPING is a micro-state — resolve it in the next animation frame
  useEffect(() => {
    if (state.phase !== 'SWAPPING') return

    const id = requestAnimationFrame(() => {
      dispatch({ type: 'SWAP_DONE' })
    })
    return () => cancelAnimationFrame(id)
  }, [state.phase])

  return {
    ...state,
    dispatch,
  }
}
