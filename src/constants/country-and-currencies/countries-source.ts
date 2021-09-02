// tslint:disable:no-var-requires
const countriesIso = require('iso-3166-1-codes')

// tslint:disable:interface-name
interface CountryInfoFromIso {
  numeric: string
  alpha2: string
  alpha3: string
  name: string
}

const allCountriesMappedByAlphaTwo: Map<
  string,
  CountryInfoFromIso
> = countriesIso.byAlpha2()

const allCountriesAlphaTwoArray: string[] = []
const allCountriesAlphaThreeArray: string[] = []
const allCountriesNamesArray: string[] = []

allCountriesMappedByAlphaTwo.forEach(countryData => {
  if (
    countryData.name === 'United Kingdom of Great Britain and Northern Ireland'
  ) {
    countryData.name = 'United Kingdom'
  }
  allCountriesAlphaTwoArray.push(countryData.alpha2)
  allCountriesAlphaThreeArray.push(countryData.alpha3)
  allCountriesNamesArray.push(countryData.name)
})

export const ALL_COUNTRIES_CODES_ALPHA_TWO_ARRAY = () => {
  return [...allCountriesAlphaTwoArray] as const
}

export const ALL_COUNTRIES_CODES_ALPHA_THREE_ARRAY = () => {
  return [...allCountriesAlphaThreeArray] as const
}

export const ALL_COUNTRIES_NAMES_ARRAY = () => {
  return [...allCountriesNamesArray] as const
}

export const SUPPORTED_COUNTRIES_NAMES_ARRAY = () => {
  return [
    'Australia',
    'Bermuda',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    // 'Uruguay', // due to onfido do not support it
  ] as const
}

const supportedCountriesCodesAlphaTwoArray: string[] = SUPPORTED_COUNTRIES_NAMES_ARRAY().map(
  (supportedName: string) =>
    countriesIso.find(
      (countryInfo: CountryInfoFromIso) => countryInfo.name === supportedName
    )!.alpha2
)

const supportedCountriesCodesAlphaThreeArray: string[] = SUPPORTED_COUNTRIES_NAMES_ARRAY().map(
  (supportedName: string) =>
    countriesIso.find(
      (countryInfo: CountryInfoFromIso) => countryInfo.name === supportedName
    )!.alpha3
)

export const SUPPORTED_COUNTRIES_CODES_ALPHA_TWO_ARRAY = () => {
  return [...supportedCountriesCodesAlphaTwoArray] as const
}

export const SUPPORTED_COUNTRIES_CODES_ALPHA_THREE_ARRAY = () => {
  return [...supportedCountriesCodesAlphaThreeArray] as const
}

export const SUPPORTED_COUNTRY_PHONE_CODES_ARRAY = () => {
  return [
    '+972', // for 'Israel'
    '+93', // for 'Afghanistan'
    '+355', // for 'Albania'
    '+213', // for 'Algeria'
    '+1684', // for 'AmericanSamoa'
    '+376', // for 'Andorra'
    '+244', // for 'Angola'
    '+1264', // for 'Anguilla'
    '+1268', // for 'Antigua and Barbuda'
    '+54', // for 'Argentina'
    '+374', // for 'Armenia'
    '+297', // for 'Aruba'
    '+61', // for 'Australia'
    '+43', // for 'Austria'
    '+994', // for 'Azerbaijan'
    '+1242', // for 'Bahamas'
    '+973', // for 'Bahrain'
    '+880', // for 'Bangladesh'
    '+1246', // for 'Barbados'
    '+375', // for 'Belarus'
    '+32', // for 'Belgium'
    '+501', // for 'Belize'
    '+229', // for 'Benin'
    '+1441', // for 'Bermuda'
    '+975', // for 'Bhutan'
    '+387', // for 'Bosnia and Herzegovina'
    '+267', // for 'Botswana'
    '+55', // for 'Brazil'
    '+246', // for 'British Indian Ocean Territory'
    '+359', // for 'Bulgaria'
    '+226', // for 'Burkina Faso'
    '+257', // for 'Burundi'
    '+855', // for 'Cambodia'
    '+237', // for 'Cameroon'
    '+1', // for 'Canada'
    '+238', // for 'Cape Verde'
    '+345', // for 'Cayman Islands'
    '+236', // for 'Central African Republic'
    '+235', // for 'Chad'
    '+56', // for 'Chile'
    '+86', // for 'China'
    '+61', // for 'Christmas Island'
    '+57', // for 'Colombia'
    '+269', // for 'Comoros'
    '+242', // for 'Congo'
    '+682', // for 'Cook Islands'
    '+506', // for 'Costa Rica'
    '+385', // for 'Croatia'
    '+53', // for 'Cuba'
    '+537', // for 'Cyprus'
    '+420', // for 'Czech Republic'
    '+45', // for 'Denmark'
    '+253', // for 'Djibouti'
    '+1767', // for 'Dominica'
    '+1849', // for 'Dominican Republic'
    '+593', // for 'Ecuador'
    '+20', // for 'Egypt'
    '+503', // for 'El Salvador'
    '+240', // for 'Equatorial Guinea'
    '+291', // for 'Eritrea'
    '+372', // for 'Estonia'
    '+251', // for 'Ethiopia'
    '+298', // for 'Faroe Islands'
    '+679', // for 'Fiji'
    '+358', // for 'Finland'
    '+33', // for 'France'
    '+594', // for 'French Guiana'
    '+689', // for 'French Polynesia'
    '+241', // for 'Gabon'
    '+220', // for 'Gambia'
    '+995', // for 'Georgia'
    '+49', // for 'Germany'
    '+233', // for 'Ghana'
    '+350', // for 'Gibraltar'
    '+30', // for 'Greece'
    '+299', // for 'Greenland'
    '+1473', // for 'Grenada'
    '+590', // for 'Guadeloupe'
    '+1671', // for 'Guam'
    '+502', // for 'Guatemala'
    '+224', // for 'Guinea'
    '+245', // for 'Guinea-Bissau'
    '+595', // for 'Guyana'
    '+509', // for 'Haiti'
    '+504', // for 'Honduras'
    '+36', // for 'Hungary'
    '+354', // for 'Iceland'
    '+91', // for 'India'
    '+62', // for 'Indonesia'
    '+964', // for 'Iraq'
    '+353', // for 'Ireland'
    '+39', // for 'Italy'
    '+1876', // for 'Jamaica'
    '+81', // for 'Japan'
    '+962', // for 'Jordan'
    '+77', // for 'Kazakhstan'
    '+254', // for 'Kenya'
    '+686', // for 'Kiribati'
    '+965', // for 'Kuwait'
    '+996', // for 'Kyrgyzstan'
    '+371', // for 'Latvia'
    '+961', // for 'Lebanon'
    '+266', // for 'Lesotho'
    '+231', // for 'Liberia'
    '+423', // for 'Liechtenstein'
    '+370', // for 'Lithuania'
    '+352', // for 'Luxembourg'
    '+261', // for 'Madagascar'
    '+265', // for 'Malawi'
    '+60', // for 'Malaysia'
    '+960', // for 'Maldives'
    '+223', // for 'Mali'
    '+356', // for 'Malta'
    '+692', // for 'Marshall Islands'
    '+596', // for 'Martinique'
    '+222', // for 'Mauritania'
    '+230', // for 'Mauritius'
    '+262', // for 'Mayotte'
    '+52', // for 'Mexico'
    '+377', // for 'Monaco'
    '+976', // for 'Mongolia'
    '+382', // for 'Montenegro'
    '+1664', // for 'Montserrat'
    '+212', // for 'Morocco'
    '+95', // for 'Myanmar'
    '+264', // for 'Namibia'
    '+674', // for 'Nauru'
    '+977', // for 'Nepal'
    '+31', // for 'Netherlands'
    '+599', // for 'Netherlands Antilles'
    '+687', // for 'New Caledonia'
    '+64', // for 'New Zealand'
    '+505', // for 'Nicaragua'
    '+227', // for 'Niger'
    '+234', // for 'Nigeria'
    '+683', // for 'Niue'
    '+672', // for 'Norfolk Island'
    '+1670', // for 'Northern Mariana Islands'
    '+47', // for 'Norway'
    '+968', // for 'Oman'
    '+92', // for 'Pakistan'
    '+680', // for 'Palau'
    '+507', // for 'Panama'
    '+675', // for 'Papua New Guinea'
    '+595', // for 'Paraguay'
    '+51', // for 'Peru'
    '+63', // for 'Philippines'
    '+48', // for 'Poland'
    '+351', // for 'Portugal'
    '+1939', // for 'Puerto Rico'
    '+974', // for 'Qatar'
    '+40', // for 'Romania'
    '+250', // for 'Rwanda'
    '+685', // for 'Samoa'
    '+378', // for 'San Marino'
    '+966', // for 'Saudi Arabia'
    '+221', // for 'Senegal'
    '+381', // for 'Serbia'
    '+248', // for 'Seychelles'
    '+232', // for 'Sierra Leone'
    '+65', // for 'Singapore'
    '+421', // for 'Slovakia'
    '+386', // for 'Slovenia'
    '+677', // for 'Solomon Islands'
    '+27', // for 'South Africa'
    '+500', // for 'South Georgia and the South Sandwich Islands'
    '+34', // for 'Spain'
    '+94', // for 'Sri Lanka'
    '+249', // for 'Sudan'
    '+597', // for 'Suriname'
    '+268', // for 'Swaziland'
    '+46', // for 'Sweden'
    '+41', // for 'Switzerland'
    '+992', // for 'Tajikistan'
    '+66', // for 'Thailand'
    '+228', // for 'Togo'
    '+690', // for 'Tokelau'
    '+676', // for 'Tonga'
    '+1868', // for 'Trinidad and Tobago'
    '+216', // for 'Tunisia'
    '+90', // for 'Turkey'
    '+993', // for 'Turkmenistan'
    '+1649', // for 'Turks and Caicos Islands'
    '+688', // for 'Tuvalu'
    '+256', // for 'Uganda'
    '+380', // for 'Ukraine'
    '+971', // for 'United Arab Emirates'
    '+44', // for 'United Kingdom'
    '+1', // for 'United States'
    '+598', // for 'Uruguay'
    '+998', // for 'Uzbekistan'
    '+678', // for 'Vanuatu'
    '+681', // for 'Wallis and Futuna'
    '+967', // for 'Yemen'
    '+260', // for 'Zambia'
    '+263', // for 'Zimbabwe'
  ] as const
}

export const SUPPORTED_COUNTRY_POSTAL_CODE_VALIDATORS: () => any = () => {
  return {
    GB:
      'GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(d[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?d{1,4}',
    JE: 'JEd[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}',
    GG: 'GYd[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}',
    IM: 'IMd[dA-Z]?[ ]?d[ABD-HJLN-UW-Z]{2}',
    US: 'd{5}([ -]d{4})?',
    CA: '[ABCEGHJKLMNPRSTVXY]d[ABCEGHJ-NPRSTV-Z][ ]?d[ABCEGHJ-NPRSTV-Z]d',
    DE: 'd{5}',
    JP: 'd{3}-d{4}',
    FR: 'd{2}[ ]?d{3}',
    AU: 'd{4}',
    IT: 'd{5}',
    CH: 'd{4}',
    AT: 'd{4}',
    ES: 'd{5}',
    NL: 'd{4}[ ]?[A-Z]{2}',
    BE: 'd{4}',
    DK: 'd{4}',
    SE: 'd{3}[ ]?d{2}',
    NO: 'd{4}',
    BR: 'd{5}[-]?d{3}',
    PT: 'd{4}([-]d{3})?',
    FI: 'd{5}',
    AX: '22d{3}',
    KR: 'd{3}[-]d{3}',
    CN: 'd{6}',
    TW: 'd{3}(d{2})?',
    SG: 'd{6}',
    DZ: 'd{5}',
    AD: 'ADd{3}',
    AR: '([A-HJ-NP-Z])?d{4}([A-Z]{3})?',
    AM: '(37)?d{4}',
    AZ: 'd{4}',
    BH: '((1[0-2]|[2-9])d{2})?',
    BD: 'd{4}',
    BB: '(BBd{5})?',
    BY: 'd{6}',
    BM: '[A-Z]{2}[ ]?[A-Z0-9]{2}',
    BA: 'd{5}',
    IO: 'BBND 1ZZ',
    BN: '[A-Z]{2}[ ]?d{4}',
    BG: 'd{4}',
    KH: 'd{5}',
    CV: 'd{4}',
    CL: 'd{7}',
    CR: 'd{4,5}|d{3}-d{4}',
    HR: 'd{5}',
    CY: 'd{4}',
    CZ: 'd{3}[ ]?d{2}',
    DO: 'd{5}',
    EC: '([A-Z]d{4}[A-Z]|(?:[A-Z]{2})?d{6})?',
    EG: 'd{5}',
    EE: 'd{5}',
    FO: 'd{3}',
    GE: 'd{4}',
    GR: 'd{3}[ ]?d{2}',
    GL: '39d{2}',
    GT: 'd{5}',
    HT: 'd{4}',
    HN: '(?:d{5})?',
    HU: 'd{4}',
    IS: 'd{3}',
    IN: 'd{6}',
    ID: 'd{5}',
    IL: 'd{5}',
    JO: 'd{5}',
    KZ: 'd{6}',
    KE: 'd{5}',
    KW: 'd{5}',
    LA: 'd{5}',
    LV: 'd{4}',
    LB: '(d{4}([ ]?d{4})?)?',
    LI: '(948[5-9])|(949[0-7])',
    LT: 'd{5}',
    LU: 'd{4}',
    MK: 'd{4}',
    MY: 'd{5}',
    MV: 'd{5}',
    MT: '[A-Z]{3}[ ]?d{2,4}',
    MU: '(d{3}[A-Z]{2}d{3})?',
    MX: 'd{5}',
    MD: 'd{4}',
    MC: '980d{2}',
    MA: 'd{5}',
    NP: 'd{5}',
    NZ: 'd{4}',
    NI: '((d{4}-)?d{3}-d{3}(-d{1})?)?',
    NG: '(d{6})?',
    OM: '(PC )?d{3}',
    PK: 'd{5}',
    PY: 'd{4}',
    PH: 'd{4}',
    PL: 'd{2}-d{3}',
    PR: '00[679]d{2}([ -]d{4})?',
    RO: 'd{6}',
    RU: 'd{6}',
    SM: '4789d',
    SA: 'd{5}',
    SN: 'd{5}',
    SK: 'd{3}[ ]?d{2}',
    SI: 'd{4}',
    ZA: 'd{4}',
    LK: 'd{5}',
    TJ: 'd{6}',
    TH: 'd{5}',
    TN: 'd{4}',
    TR: 'd{5}',
    TM: 'd{6}',
    UA: 'd{5}',
    UY: 'd{5}',
    UZ: 'd{6}',
    VA: '00120',
    VE: 'd{4}',
    ZM: 'd{5}',
    AS: '96799',
    CC: '6799',
    CK: 'd{4}',
    RS: 'd{6}',
    ME: '8d{4}',
    CS: 'd{5}',
    YU: 'd{5}',
    CX: '6798',
    ET: 'd{4}',
    FK: 'FIQQ 1ZZ',
    NF: '2899',
    FM: '(9694[1-4])([ -]d{4})?',
    GF: '9[78]3d{2}',
    GN: 'd{3}',
    GP: '9[78][01]d{2}',
    GS: 'SIQQ 1ZZ',
    GU: '969[123]d([ -]d{4})?',
    GW: 'd{4}',
    HM: 'd{4}',
    IQ: 'd{5}',
    KG: 'd{6}',
    LR: 'd{4}',
    LS: 'd{3}',
    MG: 'd{3}',
    MH: '969[67]d([ -]d{4})?',
    MN: 'd{6}',
    MP: '9695[012]([ -]d{4})?',
    MQ: '9[78]2d{2}',
    NC: '988d{2}',
    NE: 'd{4}',
    VI: '008(([0-4]d)|(5[01]))([ -]d{4})?',
    PF: '987d{2}',
    PG: 'd{3}',
    PM: '9[78]5d{2}',
    PN: 'PCRN 1ZZ',
    PW: '96940',
    RE: '9[78]4d{2}',
    SH: '(ASCN|STHL) 1ZZ',
    SJ: 'd{4}',
    SO: 'd{5}',
    SZ: '[HLMS]d{3}',
    TC: 'TKCA 1ZZ',
    WF: '986d{2}',
    XK: 'd{5}',
    YT: '976d{2}',
  }
}
