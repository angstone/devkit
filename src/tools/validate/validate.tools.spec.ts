/* eslint-disable no-console */
/* tslint:disable:no-implicit-dependencies */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-reference */
/* tslint:disable:no-console */
import { expect } from 'chai';
// import chalk from 'chalk'
// import { spy } from 'sinon'

import * as vt from './validate.tools';

describe('validateTools', () => {
  describe('basic string property', () => {
    it('should validate', () => {
      const simple = {
        peter: 'pan'
      };
      vt.validate('peter', simple, 'required', 'string');
      vt.validate('peter', simple, 'required', ['pan']);
      vt.validate('john', simple, 'optional', 'string');
    });

    it('should INvalidate in expected ways', () => {
      const simple = {
        peter: 'pan'
      };

      try {
        vt.validate('john', simple, 'required', 'string');
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals('missing property "john"');
      }

      try {
        vt.validate('peter', simple, 'required', ['james']);
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "peter" must be one of those: "james".'
        );
      }

      try {
        vt.validate('peter', simple, 'required', 'number');
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "peter" must be of type "number"'
        );
      }
    });
  });

  describe('basic number property', () => {
    it('should validate', () => {
      const integer = {
        one: 1
      };
      vt.validate('one', integer, 'required', 'number');
      vt.validate('two', integer, 'optional', 'number');
    });

    it('should INvalidate in expected ways', () => {
      const integer = {
        one: 1
      };

      try {
        vt.validate('one', integer, 'required', 'string');
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "one" must be of type "string"'
        );
      }

      try {
        vt.validate('two', integer, 'required', 'number');
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals('missing property "two"');
      }
    });
  });

  describe('limits string property', () => {
    it('should validate', () => {
      const limited = {
        peter: 'pan'
      };
      const limitedBorderLast = {
        peter: 'panZ'
      };
      const limitedBorderFirst = {
        peter: 'pa'
      };
      const LIMITS = {
        peter: {
          max: 4,
          min: 2
        }
      };
      vt.validate('peter', limited, 'required', 'string', LIMITS);
      vt.validate('peter', limitedBorderLast, 'required', 'string', LIMITS);
      vt.validate('peter', limitedBorderFirst, 'required', 'string', LIMITS);
    });

    it('should INvalidate in expected ways', () => {
      const limitedOver = {
        peter: 'panZx'
      };
      const limitedUnder = {
        peter: 'p'
      };
      const LIMITS = {
        peter: {
          max: 4,
          min: 2
        }
      };
      try {
        vt.validate('peter', limitedOver, 'required', 'string', LIMITS);
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "peter" length must be less then "4"'
        );
      }

      try {
        vt.validate('peter', limitedUnder, 'required', 'string', LIMITS);
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "peter" length must be greater then "2"'
        );
      }
    });
  });

  describe('limits number property', () => {
    it('should validate', () => {
      const limited = {
        value: 42
      };
      const limitedBorderLast = {
        value: 666
      };
      const limitedBorderFirst = {
        value: 7
      };
      const LIMITS = {
        value: {
          max: 666,
          min: 7
        }
      };
      vt.validate('value', limited, 'required', 'number', LIMITS);
      vt.validate('value', limitedBorderLast, 'required', 'number', LIMITS);
      vt.validate('value', limitedBorderFirst, 'required', 'number', LIMITS);
    });

    it('should INvalidate in expected ways', () => {
      const limitedOver = {
        value: 667
      };
      const limitedUnder = {
        value: 6
      };
      const LIMITS = {
        value: {
          max: 666,
          min: 7
        }
      };
      try {
        vt.validate('value', limitedOver, 'required', 'number', LIMITS);
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "value" must be less then "666"'
        );
      }

      try {
        vt.validate('value', limitedUnder, 'required', 'number', LIMITS);
        expect(false).to.be.true;
      } catch (err) {
        console.log(err);
        expect(err.message).to.be.equals(
          'property "value" must be greater then "7"'
        );
      }
    });
  });

  describe('custom validations', () => {
    it('should validate a simple custom validation', () => {
      const result = {
        value: 3
      };
      const isOnePlusTwo = (d: any) => {
        console.log(d);
        if (d !== 1 + 2) {
          return 'is not one plus two';
        }
      };
      vt.validate('value', result, 'required', 'number', {}, isOnePlusTwo);
    });

    it('should INvalidate a simple custom validation in expected way', () => {
      const result = {
        value: 4
      };
      const isOnePlusTwo = (d: any) => {
        console.log(d);
        if (d !== 1 + 2) {
          return 'is not one plus two';
        }
      };
      try {
        vt.validate('value', result, 'required', 'number', {}, isOnePlusTwo);
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "value", is not one plus two'
        );
      }
    });

    it('should validate integer, floats', () => {
      const values = {
        float1dec: 3.1,
        float2dec: 3.12,
        float9dec: 8.123456789,
        integer: 3
      };
      vt.validate(
        'integer',
        values,
        'required',
        'number',
        {},
        vt.COMMON_VALIDATIONS.INTEGER
      );
      vt.validate(
        'float1dec',
        values,
        'required',
        'number',
        {},
        vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(1)
      );
      vt.validate(
        'float2dec',
        values,
        'required',
        'number',
        {},
        vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(2)
      );
      vt.validate(
        'float9dec',
        values,
        'required',
        'number',
        {},
        vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(9)
      );
    });

    it('should INvalidate integer, floats in expected way', () => {
      const values = {
        float1dec: 3.1,
        float2dec: 3.12,
        float9dec: 8.123456789,
        integer: 3
      };
      try {
        vt.validate(
          'float1dec',
          values,
          'required',
          'number',
          {},
          vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(0)
        );
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "float1dec", data must have 0 decimals at maximum'
        );
      }

      try {
        vt.validate(
          'float2dec',
          values,
          'required',
          'number',
          {},
          vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(1)
        );
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "float2dec", data must have 1 decimals at maximum'
        );
      }

      try {
        vt.validate(
          'float9dec',
          values,
          'required',
          'number',
          {},
          vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(8)
        );
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "float9dec", data must have 8 decimals at maximum'
        );
      }

      try {
        vt.validate(
          'float1dec',
          values,
          'required',
          'number',
          {},
          vt.COMMON_VALIDATIONS.INTEGER
        );
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "float1dec", data must be integer'
        );
      }

      try {
        vt.validate(
          'float2dec',
          values,
          'required',
          'number',
          {},
          vt.COMMON_VALIDATIONS.INTEGER
        );
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "float2dec", data must be integer'
        );
      }
      // vt.validate('integer', values, 'required', 'number', {}, vt.COMMON_VALIDATIONS.INTEGER)
      // vt.validate('float2', values, 'required', 'number', {}, vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(2))
      // vt.validate('float9', values, 'required', 'number', {}, vt.COMMON_VALIDATIONS.FLOAT_DECIMALS(9))
    });

    it('should validate ALL_UPPERCASE', () => {
      const text = {
        allUpper: 'ALLPO',
        allUpperStrange: 'ALL_APFASD__EFSDF --- .',
        nonAllUpper: 'ALLbutTHIS'
      };
      vt.validate(
        'allUpper',
        text,
        'required',
        'string',
        {},
        vt.COMMON_VALIDATIONS.ALL_UPPERCASE
      );
      vt.validate(
        'allUpperStrange',
        text,
        'required',
        'string',
        {},
        vt.COMMON_VALIDATIONS.ALL_UPPERCASE
      );
    });

    it('should INvalidate non_all_UPPERCASE', () => {
      const text = {
        allUpper: 'ALLPO',
        allUpperStrange: 'ALL_APFASD__EFSDF --- .',
        nonAllUpper: 'ALLbutTHIS'
      };
      try {
        vt.validate(
          'nonAllUpper',
          text,
          'required',
          'string',
          {},
          vt.COMMON_VALIDATIONS.ALL_UPPERCASE
        );
        expect(false).to.be.true;
      } catch (err) {
        expect(err.message).to.be.equals(
          'on property "nonAllUpper", data must be uppercase'
        );
      }
    });
  });

  describe('validate each', () => {
    const isZero = (d: any) => {
      if (d !== 0) {
        throw new Error('is not zero');
      }
      return true;
    };

    const isZeroOrOne = (d: any) => {
      if (d !== 0 && d !== 1) {
        throw new Error('is nor zero neither one');
      }
      return true;
    };

    it('should validate each element of array', () => {
      const data = {
        arrayOfZeros: [0, 0, 0, 0, 0, 0, 0],
        arrayOfZerosOneOne: [0, 0, 0, 1, 0, 0, 0]
      };

      vt.validateEach('arrayOfZeros', data, isZero);
      vt.validateEach('arrayOfZerosOneOne', data, isZeroOrOne);
    });

    it('should INvalidate if some element of array is invalid', () => {
      const data = {
        arrayOfZeros: [0, 0, 0, 0, 0, 0, 0],
        arrayOfZerosOneOne: [0, 0, 0, 1, 0, 0, 0]
      };
      try {
        vt.validateEach('arrayOfZerosOneOne', data, isZero);
        expect(true).to.be.false;
      } catch (err) {
        expect(err.message).to.be.equals('is not zero');
      }
    });
  });
});
