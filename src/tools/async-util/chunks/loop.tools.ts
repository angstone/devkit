type syncFunc = () => void
type asyncFunc = () => Promise<void>
type TheLoopToBeLooping = syncFunc | asyncFunc

type conditionToStopSync = () => boolean
type conditionToStopAsync = () => Promise<boolean>
type ConditionToStop = conditionToStopSync | conditionToStopAsync | null

type ConditionToStopOrRestTime = null | ConditionToStop | number

const MINIMAL_REST_TIME = 10

export const loop = async (
  theLoop: TheLoopToBeLooping,
  conditionToStopOrRestTime: ConditionToStopOrRestTime = null,
  conditionToStopOrRestTime2: ConditionToStopOrRestTime = null
) => {
  let conditionToStop: ConditionToStop = null
  let restTime: number | null = null
  if (conditionToStopOrRestTime !== null) {
    if (typeof conditionToStopOrRestTime === 'number') {
      restTime = conditionToStopOrRestTime
    } else {
      conditionToStop = conditionToStopOrRestTime as ConditionToStop
    }
  }
  if (conditionToStopOrRestTime2 !== null) {
    if (typeof conditionToStopOrRestTime2 === 'number') {
      restTime = conditionToStopOrRestTime2
    } else {
      conditionToStop = conditionToStopOrRestTime2 as ConditionToStop
    }
  }

  if (restTime === null) {
    restTime = MINIMAL_REST_TIME
  }

  if (conditionToStop === null) {
    while (true) {
      await theLoop()
      await new Promise(r => setTimeout(r, restTime!))
    }
  } else if (restTime === null) {
    while (!(await conditionToStop!())) {
      await theLoop()
    }
  } else {
    while (!(await conditionToStop!())) {
      await theLoop()
      await new Promise(r => setTimeout(r, restTime!))
    }
  }
}
