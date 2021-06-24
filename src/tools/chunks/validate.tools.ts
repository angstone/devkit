/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { error } from '@angstone/cement-basic';
import { isTools } from '../..';

type CustomValidation = (data: unknown) => string | undefined | boolean;

type ISupportedDataTypes =
  | 'boolean'
  | 'string'
  | 'number'
  | 'function'
  | 'object'
  | 'map';

export const throwInterfaceValidationErrors = (): boolean =>
  process.env.APP_THROW_INTERFACE_VALIDATION_ERRORS === 'true';

export const validate = (
  propertyName: string,
  data: any,
  optionalOrRequired: 'required' | 'optional',
  type: ISupportedDataTypes | string[],
  limits: any = {},
  custom?: CustomValidation
): boolean => {
  if (optionalOrRequired === 'required') {
    if (data[propertyName] === undefined) {
      if (throwInterfaceValidationErrors()) {
        error.throw('missing property "' + propertyName + '"');
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
    if (data[propertyName] !== undefined) {
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
  data: any,
  type: ISupportedDataTypes | string[],
  limits: any = {}
): boolean => {
  if (Array.isArray(type)) {
    const valid = type.some((ty) => data[propertyName] === ty);
    if (!valid) {
      let errString = 'property "' + propertyName + '" must be one of those: "';
      type.forEach((ty) => {
        errString += ty + ', ';
      });
      errString.substring(0, errString.length - 3);
      errString += '"';
      if (throwInterfaceValidationErrors()) {
        error.throw(errString);
      } else {
        return false;
      }
    }
  } else if (type === 'boolean') {
    if (!isTools.isBoolean(data[propertyName])) {
      if (throwInterfaceValidationErrors()) {
        error.throw(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  } else if (type === 'function') {
    if (!isTools.isFunction(data[propertyName])) {
      if (throwInterfaceValidationErrors()) {
        error.throw(
          'property "' + propertyName + '" must be of type "' + type + '"'
        );
      } else {
        return false;
      }
    }
  } else {
    if (typeof data[propertyName] !== type) {
      if (throwInterfaceValidationErrors()) {
        error.throw(
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
        if (data[propertyName].length > limits[propertyName].max) {
          if (throwInterfaceValidationErrors()) {
            error.throw(
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
        if (data[propertyName].length < limits[propertyName].min) {
          if (throwInterfaceValidationErrors()) {
            error.throw(
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
        if (data[propertyName] > limits[propertyName].max) {
          if (throwInterfaceValidationErrors()) {
            error.throw(
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
        if (data[propertyName] < limits[propertyName].min) {
          if (throwInterfaceValidationErrors()) {
            error.throw(
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
    }
  }
  return true;
};

export const validateCustom = (
  propertyName: string,
  data: any,
  type: ISupportedDataTypes | string[],
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
        data[propertyName]
      );
      if (result !== undefined && result !== true) {
        if (throwInterfaceValidationErrors()) {
          error.throw('on property "' + propertyName + '", ' + result);
        } else {
          return false;
        }
      }
    }
    return true;
  } else {
    if (custom !== undefined) {
      const result: string | undefined | boolean = custom(data[propertyName]);
      if (result !== undefined && result !== true) {
        if (throwInterfaceValidationErrors()) {
          error.throw('on property "' + propertyName + '", ' + result);
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
  data: any,
  validation: (data: any) => any
): boolean => {
  if (data[propertyName] === undefined) {
    if (throwInterfaceValidationErrors()) {
      error.throw('missing property "' + propertyName + '"');
    } else {
      return false;
    }
  }
  if (!Array.isArray(data[propertyName])) {
    if (throwInterfaceValidationErrors()) {
      error.throw('property "' + propertyName + '" should be an array');
    } else {
      return false;
    }
  }

  data[propertyName].forEach((dataProp: any) => {
    if (!validation(dataProp)) {
      return false;
    }
  });
  return true;
};

const ALL_UPPERCASE = (data: any) => {
  if (typeof data !== 'string') {
    return 'data must be string';
  } else {
    if (data !== data.toUpperCase()) {
      return 'data must be uppercase';
    }
  }
};

export const validateAny = (...validations: Array<[any, any]>): boolean => {
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
      error.throw(lastError);
    }
    return false;
  }
};

const INTEGER = (data: any) => {
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

const NO_SPACE = (data: any) => {
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
