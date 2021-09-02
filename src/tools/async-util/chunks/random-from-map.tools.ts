export const randomKeyFromMap = <T, U>(map: Map<T, U>): T | undefined => {
  const index = Math.floor(Math.random() * map.size)
  let cntr = 0
  for (const key of map.keys()) {
    if (cntr++ === index) {
      return key
    }
  }
}

export const randomFromMap = <T, U>(map: Map<T, U>): U | undefined => {
  const key = randomKeyFromMap(map)
  if (key !== undefined) {
    return map.get(key)
  }
}
