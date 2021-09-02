type TaskOfIfDo = () => void

export const ifdo = (evalBoolean: boolean, ...tasks: TaskOfIfDo[]) => {
  if (evalBoolean) {
    tasks.forEach(task => task())
  }
}
