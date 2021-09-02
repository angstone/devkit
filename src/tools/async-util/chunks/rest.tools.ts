type conditionToStopSync = () => boolean
type conditionToStopAsync = () => Promise<boolean>
type ConditionToStop = conditionToStopSync | conditionToStopAsync | null

type ConditionToStopOrRestTime = null | ConditionToStop | number

const MINIMAL_REST_TIME = 10

export const rest = async (
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

  // tslint:disable:no-empty
  if (conditionToStop === null && restTime === null) {
    while (true) {
      await new Promise(r => setTimeout(r, MINIMAL_REST_TIME))
    }
  } else if (conditionToStop === null) {
    await new Promise(r => setTimeout(r, restTime!))
  } else if (restTime === null) {
    while (!(await conditionToStop!())) {
      await new Promise(r => setTimeout(r, MINIMAL_REST_TIME))
    }
  } else {
    await new Promise(r => setTimeout(r, restTime!))
    while (!(await conditionToStop!())) {
      await new Promise(r => setTimeout(r, restTime!))
    }
  }
}
