/* eslint-disable @typescript-eslint/no-explicit-any */
export const dealErrorToString = <T extends Error>(error: T): string => {
  if (error.message && error.message !== '') {
    return error.message;
  } else if ((error as any).msg && (error as any).msg !== '') {
    return (error as any).msg as string;
  } else if ((error as any).toString) {
    return (error as any).toString() as string;
  } else {
    try {
      const errorParsed = JSON.stringify(error);
      if (errorParsed && errorParsed !== '') {
        return errorParsed;
      } else {
        return 'unknown error';
      }
    } catch {
      return 'unknown error';
    }
  }
};
