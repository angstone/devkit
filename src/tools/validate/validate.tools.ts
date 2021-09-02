/* eslint-disable @typescript-eslint/no-explicit-any */
import { isTools } from '../';

type CustomValidation = (data: unknown) => string | undefined | boolean;

type SupportedDataTypes =
  | 'boolean'
  | 'string'
  | 'number'
  | 'function'
  | 'object'
  | 'map'
  | 'array';

export const throwInterfaceValidationErrors = (): boolean =>
  process.env.APP_THROW_INTERFACE_VALIDATION_ERRORS !== 'false';

export const validate = (
  propertyName: string,
  data: unknown,
  optionalOrRequired: 'required' | 'optional',
  type: SupportedDataTypes | string[],
  limits: unknown = undefined,
  custom?: CustomValidation
): boolean => {
  if (limits === null || limits === undefined) {
    limits = {};
  }
  if (optionalOrRequired === 'required') {
    if ((data as any)[propertyName] === undefined) {
      if (throwInterfaceValidationErrors()) {
        throw new Error('missing property "' + propertyName + '"');
      } else {
        return false;
      }
    }
    if (validateTypeAndLimits(propertyName, data, type, limits) !== true) {
      return false;
    }
    if (validateCustom(propertyName, data, type, custom) !== true) {
      return false;
    }
  } else {
    if ((data as any)[propertyName] !== undefined) {
      if (validateTypeAndLimits(propertyName, data, type, limits) !== true) {
        return false;
      }
      if (validateCustom(propertyName, data, type, custom) !== true) {
        return false;
      }
    }
  }
  return true;
};

export const validateTypeAndLimits = (
  propertyName: string,
  data: unknown,
  type: SupportedDataTypes | string[],
  limits: any = undefined
): boolean => {
  if (limits === null || limits === undefined) {
    limits = {};
  }
  if (Array.isArray(type)) {
    const valid = type.some((ty) => (data as any)[propertyName] === ty);
    if (!valid) {
      let errString = 'property "' + propertyName + '" must be one of those: ';
      const last = type.length;
      type.forEach((ty, tyIndex) => {
        if (tyIndex !== last - 1) {
          errString += '"' + ty + '", ';
        } else {
          errString += '"' + ty + '".';
        }
      });
      errString.substring(0, errString.length - 3);
      if (throwInterfaceValidationErrors()) {
        throw new Error(errString);
      } else {
        return false;
      }
    }
  } else if (type === 'boolean') {
    if (!isTools.isBoolean((data as any)[propertyName])) {
      if (throwInterfaceValidationErrors()) {
        throw new Error(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  } else if (type === 'function') {
    if (!isTools.isFunction((data as any)[propertyName])) {
      if (throwInterfaceValidationErrors()) {
        throw new Error(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  } else if (type === 'array') {
    if (!Array.isArray((data as any)[propertyName])) {
      if (throwInterfaceValidationErrors()) {
        throw new Error(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  } else if (type === 'map') {
    if (!((data as any)[propertyName] instanceof Map)) {
      if (throwInterfaceValidationErrors()) {
        throw new Error(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  } else if (type === 'number') {
    if (typeof (data as any)[propertyName] !== type) {
      if (typeof (data as any)[propertyName] === 'string') {
        const newNumberValue: number = +((data as any)[propertyName] as string);
        if (isNaN(newNumberValue)) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' + propertyName + '" must be of type "' + type + '"'
            );
          } else {
            return false;
          }
        } else {
          (data as any)[propertyName] = newNumberValue;
        }
      } else {
        if (throwInterfaceValidationErrors()) {
          throw new Error(
            'property "' + propertyName + '" must be of type "' + type + '"'
          );
        } else {
          return false;
        }
      }
    }
  } else {
    if (typeof (data as any)[propertyName] !== type) {
      if (throwInterfaceValidationErrors()) {
        throw new Error(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  }

  if (limits[propertyName]) {
    if (type === 'string') {
      if (limits[propertyName].max) {
        if ((data as any)[propertyName].length > limits[propertyName].max) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' +
                propertyName +
                '" length must be less then "' +
                limits[propertyName].max +
                '"'
            );
          } else {
            return false;
          }
        }
      }

      if (limits[propertyName].min) {
        if ((data as any)[propertyName].length < limits[propertyName].min) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' +
                propertyName +
                '" length must be greater then "' +
                limits[propertyName].min +
                '"'
            );
          } else {
            return false;
          }
        }
      }
    } else if (type === 'number') {
      if (limits[propertyName].max) {
        if ((data as any)[propertyName] > limits[propertyName].max) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' +
                propertyName +
                '" must be less then "' +
                limits[propertyName].max +
                '"'
            );
          } else {
            return false;
          }
        }
      }

      if (limits[propertyName].min) {
        if ((data as any)[propertyName] < limits[propertyName].min) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' +
                propertyName +
                '" must be greater then "' +
                limits[propertyName].min +
                '"'
            );
          } else {
            return false;
          }
        }
      }
    } else if (type === 'array') {
      if (limits[propertyName].max) {
        if ((data as any)[propertyName].length > limits[propertyName].max) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' +
                propertyName +
                '" length must be less then "' +
                limits[propertyName].max +
                '"'
            );
          } else {
            return false;
          }
        }
      }

      if (limits[propertyName].min) {
        if ((data as any)[propertyName].length < limits[propertyName].min) {
          if (throwInterfaceValidationErrors()) {
            throw new Error(
              'property "' +
                propertyName +
                '" length must be greater then "' +
                limits[propertyName].min +
                '"'
            );
          } else {
            return false;
          }
        }
      }
    }
  }
  return true;
};

export const validateCustom = (
  propertyName: string,
  data: unknown,
  type: SupportedDataTypes | string[],
  custom?: CustomValidation
): boolean => {
  if (type === 'map') {
    if (custom !== undefined) {
      const newCustom = (dt: any) => {
        dt.forEach((propInDt: any) => {
          if (!custom(propInDt)) {
            return false;
          }
        });
        return true;
      };
      const result: string | undefined | boolean = newCustom(
        (data as any)[propertyName]
      );
      if (result !== undefined && result !== true) {
        if (throwInterfaceValidationErrors()) {
          throw new Error('on property "' + propertyName + '", ' + result);
        } else {
          return false;
        }
      }
    }
    return true;
  } else if (type === 'array') {
    if (custom !== undefined) {
      const newCustom = () => validateEach(propertyName, data, custom);
      const result: string | undefined | boolean = newCustom();
      if (result !== undefined && result !== true) {
        if (throwInterfaceValidationErrors()) {
          throw new Error('on property "' + propertyName + '", ' + result);
        } else {
          return false;
        }
      }
    }
    return true;
  } else {
    if (custom !== undefined) {
      const result: string | undefined | boolean = custom(
        (data as any)[propertyName]
      );
      if (result !== undefined && result !== true) {
        if (throwInterfaceValidationErrors()) {
          throw new Error('on property "' + propertyName + '", ' + result);
        } else {
          return false;
        }
      }
    }
    return true;
  }
};

export const mergeValidations = (
  ...args: CustomValidation[]
): CustomValidation => {
  const customValidation: CustomValidation = (data: any) => {
    args.forEach((custom: CustomValidation) => {
      const ans: string | undefined | boolean = custom(data);
      if (ans !== undefined && ans !== true) {
        return ans;
      }
    });
    return undefined;
  };
  return customValidation;
};

export const validateEach = (
  propertyName: string,
  data: unknown,
  validation: (data: any) => any,
  requiredOrOptional: 'required' | 'optional' = 'required'
): boolean => {
  if ((data as any)[propertyName] === undefined) {
    if (requiredOrOptional === 'optional') {
      return true;
    }
    if (throwInterfaceValidationErrors()) {
      throw new Error('missing property "' + propertyName + '"');
    } else {
      return false;
    }
  }
  if (!Array.isArray((data as any)[propertyName])) {
    if (throwInterfaceValidationErrors()) {
      throw new Error('property "' + propertyName + '" should be an array');
    } else {
      return false;
    }
  }

  (data as any)[propertyName].forEach((dataProp: any) => {
    if (!validation(dataProp)) {
      return false;
    }
  });
  return true;
};

const ALL_UPPERCASE = (data: unknown): string | undefined => {
  if (typeof data !== 'string') {
    return 'data must be string';
  } else {
    if (data !== data.toUpperCase()) {
      return 'data must be uppercase';
    }
  }
};

export const validateAny = (...validations: [any, any][]): boolean => {
  let lastError: any;
  let result: any;
  validations.forEach((validation: [any, any]) => {
    if (result !== true) {
      try {
        result = validation[0](validation[1]);
      } catch (e) {
        lastError = e;
      }
    }
  });
  if (result === true) {
    return true;
  } else {
    if (lastError !== undefined) {
      throw new Error(lastError);
    }
    return false;
  }
};

const INTEGER = (data: unknown): string | undefined => {
  if (typeof data !== 'number') {
    return 'data must be number';
  } else {
    if (!Number.isInteger(data)) {
      return 'data must be integer';
    }
  }
};

const precision = (a: number): number => {
  if (!isFinite(a)) {
    return 0;
  }
  let e = 1;
  let p = 0;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p++;
  }
  return p;
};

const FLOAT_DECIMALS = (decimals: number): CustomValidation => {
  return (data: any): string | undefined => {
    if (typeof data !== 'number') {
      return 'data must be number';
    } else {
      if (precision(data) > decimals) {
        return 'data must have ' + decimals + ' decimals at maximum';
      }
    }
  };
};

const NO_SPACE = (data: unknown): string | undefined => {
  if (typeof data !== 'string') {
    return 'data must be string';
  } else {
    if (data.indexOf(' ') > -1) {
      return 'data cannot contain spaces';
    }
  }
};

export const COMMON_VALIDATIONS = {
  ALL_UPPERCASE,
  FLOAT_DECIMALS,
  INTEGER,
  NO_SPACE
};
