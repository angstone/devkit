const UNRECOGNIZED = 'Unrecognized Error'

export const dealErrorToString = (error: any): string => {
  if (error === undefined || error === null) {
    return UNRECOGNIZED
  } else {
    if (
      typeof error === 'string' &&
      (error?.length || 0) > 0 &&
      error !== '{}'
    ) {
      return error
    } else {
      let ans: string | undefined = error.message || error.msg || undefined
      if (ans !== undefined && (ans?.length || 0) > 0 && ans !== '{}') {
        return ans
      } else {
        // tslint:disable-next-line: prefer-conditional-expression
        if (error.toString) {
          ans = error?.toString()
          if (ans !== undefined && (ans?.length || 0) > 0 && ans !== '{}') {
            return ans
          } else {
            return continueSearching(error)
          }
        } else {
          return continueSearching(error)
        }
      }
    }
  }
}

const continueSearching = (error: any): string => {
  try {
    const jsonError = JSON.stringify(error)
    if (
      jsonError !== undefined &&
      (jsonError?.length || 0) > 0 &&
      jsonError !== '{}'
    ) {
      return jsonError
    } else {
      return UNRECOGNIZED
    }
  } catch (err) {
    return UNRECOGNIZED
  }
}
