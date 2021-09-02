import {
  COMMON_VALIDATIONS,
  ICurrency,
  IMoneyValue,
  isICurrency,
  isIMoneyValue,
  validate,
} from '../../../'

/*balance: {
    broker: {
        available: raw.balance.available,
        balance: raw.balance.balance,
        profit: raw.balance.profit,
        margin: raw.balance.margin,
    },
    cash: {
        deposits: rawAccount.brokerDeposits,
        withdrawals: rawAccount.brokerWithdrawals,
        balance: rawAccount.balanceActual,
        profit: rawAccount.profitActual,
    },
    currency: {
        code: rawAccount.currency,
        symbol: rawAccount.currencySymbol,
    },
},*/
/*
broker {
  available: // cash.balance - broker.margin
  margin: // given value 20 ~ 30 % of balance actually took from account.
  // a safer value to grant the position
  balance: 10k // BROKER DISPLAYED BALANCE
  profit: -1k // totalMarketValueOfOpenedAssets - totalBallastValuePaidForOpenedAssets
},
cash {
  deposits: // actual money client transfered in to broker
  withdrawals: // actual money client transfered out from broker
  balance: 9k // cash.deposits - cash.withdrawals - totalAssetsBallastValuesPaidForAllAssets + totalOpenedAssetsCurrentMarketPrice + totalClosedAssetsMarketValuesAtTheTimeEachWasClosed
  // - AllTaxesAndFeesPaid
  profit: // cash.withdrawals - cash.deposits
}
*/
export interface IFinancialBalanceBroker {
  currency: ICurrency // REQUIRED
  //_________________________________
  equity: IMoneyValue // REQUIRED. WHEN BUYING POSITION POINT OF VIEW, ALL OFFER PRICES IF LONG, ALL BID PRICE WHEN SHORT
  leverage: number // REQUIRED. Leverage Multiplier. If plugin offers MaxLeveragedBalance we can siomply divide by equity
  cash: IMoneyValue // REQUIRED cashOperationBalance + profits? sometimes broker can take a fee? dunno. thing is: the available real cash for operation NOT LEVERAGED.
  // if above not available query positions and prices and use: Equity - [PositionsQuantities]transposed * [Assets Offer Prices] !
  //_________________________________ ALL OPITIONAL BELLOW
  deposits?: IMoneyValue
  withdrawals?: IMoneyValue
  cashOperationBalance?: IMoneyValue // dep - with
  cashProfit?: IMoneyValue // equity - cashOperationBalance (BEFORE REALIZATION) {NOT equity - [positions col matrix]*[spreads line matrix]}
  //_________________________________
  margin: IMoneyValue // initial + maintenance REQUIRED
  initialMargin?: IMoneyValue // OPTIONAL
  maintenanceMargin?: IMoneyValue // OPTIONAL
  //_________________________________ ALL OPITIONAL BELLOW
  positionWhenBuying?: IMoneyValue // longOffer + shortBid
  longPositionOffer?: IMoneyValue //
  shortPositionBid?: IMoneyValue //
  //_________________________________ ALL OPITIONAL BELLOW
  positionRealized?: IMoneyValue // longBid + shortOffer
  longPositionBid?: IMoneyValue //
  shortPositionOffer?: IMoneyValue //
}

export const isIFinancialBalanceBroker = (
  t: any
): t is IFinancialBalanceBroker =>
  validate('currency', t, 'required', 'object', null, isICurrency) &&
  validate('equity', t, 'required', 'number', null, isIMoneyValue) &&
  validate(
    'leverage',
    t,
    'required',
    'number',
    null,
    COMMON_VALIDATIONS.INTEGER
  ) &&
  validate('cash', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('deposits', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('withdrawals', t, 'optional', 'number', null, isIMoneyValue) &&
  validate(
    'cashOperationBalance',
    t,
    'optional',
    'number',
    null,
    isIMoneyValue
  ) &&
  validate('cashProfit', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('margin', t, 'required', 'number', null, isIMoneyValue) &&
  validate('initialMargin', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('maintenanceMargin', t, 'optional', 'number', null, isIMoneyValue) &&
  validate(
    'positionWhenBuying',
    t,
    'optional',
    'number',
    null,
    isIMoneyValue
  ) &&
  validate('longPositionOffer', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('shortPositionBid', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('positionRealized', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('longPositionBid', t, 'optional', 'number', null, isIMoneyValue) &&
  validate('shortPositionOffer', t, 'optional', 'number', null, isIMoneyValue)
