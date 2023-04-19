const Currencies = [
  { id: 'AED', label: 'AED' },
  { id: 'ALL', label: 'ALL' },
  { id: 'AMD', label: 'AMD' },
  { id: 'ANG', label: 'ANG' },
  { id: 'AOA', label: 'AOA' },
  { id: 'ARS', label: 'ARS' },
  { id: 'ASC', label: 'ASC' },
  { id: 'AUD', label: 'AUD' },
  { id: 'AWG', label: 'AWG' },
  { id: 'AZN', label: 'AZN' },
  { id: 'BAM', label: 'BAM' },
  { id: 'BBD', label: 'BBD' },
  { id: 'BDT', label: 'BDT' },
  { id: 'BGN', label: 'BGN' },
  { id: 'BHD', label: 'BHD' },
  { id: 'BIF', label: 'BIF' },
  { id: 'BND', label: 'BND' },
  { id: 'BOB', label: 'BOB' },
  { id: 'BOV', label: 'BOV' },
  { id: 'BRL', label: 'BRL' },
  { id: 'BSD', label: 'BSD' },
  { id: 'BTN', label: 'BTN' },
  { id: 'BWP', label: 'BWP' },
  { id: 'BYR', label: 'BYR' },
  { id: 'BZD', label: 'BZD' },
  { id: 'CAD', label: 'CAD' },
  { id: 'CDF', label: 'CDF' },
  { id: 'CHE', label: 'CHE' },
  { id: 'CHF', label: 'CHF' },
  { id: 'CLF', label: 'CLF' },
  { id: 'CLP', label: 'CLP' },
  { id: 'CNY', label: 'CNY' },
  { id: 'CO', label: 'CO' },
  { id: 'COP', label: 'COP' },
  { id: 'CRC', label: 'CRC' },
  { id: 'CUC', label: 'CUC' },
  { id: 'CVE', label: 'CVE' },
  { id: 'CZK', label: 'CZK' },
  { id: 'DJF', label: 'DJF' },
  { id: 'DKK', label: 'DKK' },
  { id: 'DMO', label: 'DMO' },
  { id: 'DOP', label: 'DOP' },
  { id: 'DZD', label: 'DZD' },
  { id: 'EGP', label: 'EGP' },
  { id: 'ERN', label: 'ERN' },
  { id: 'ETB', label: 'ETB' },
  { id: 'EUR', label: 'EUR' },
  { id: 'FJD', label: 'FJD' },
  { id: 'FKP', label: 'FKP' },
  { id: 'GBP', label: 'GBP' },
  { id: 'GEL', label: 'GEL' },
  { id: 'GIP', label: 'GIP' },
  { id: 'GMD', label: 'GMD' },
  { id: 'GNF', label: 'GNF' },
  { id: 'GTQ', label: 'GTQ' },
  { id: 'GYD', label: 'GYD' },
  { id: 'HKD', label: 'HKD' },
  { id: 'HNL', label: 'HNL' },
  { id: 'HRK', label: 'HRK' },
  { id: 'HTG', label: 'HTG' },
  { id: 'HUF', label: 'HUF' },
  { id: 'IDR', label: 'IDR' },
  { id: 'ILS', label: 'ILS' },
  { id: 'INR', label: 'INR' },
  { id: 'IQD', label: 'IQD' },
  { id: 'IRR', label: 'IRR' },
  { id: 'ISK', label: 'ISK' },
  { id: 'JMD', label: 'JMD' },
  { id: 'JOD', label: 'JOD' },
  { id: 'JPY', label: 'JPY' },
  { id: 'KES', label: 'KES' },
  { id: 'KGS', label: 'KGS' },
  { id: 'KHR', label: 'KHR' },
  { id: 'KMF', label: 'KMF' },
  { id: 'KPW', label: 'KPW' },
  { id: 'KRW', label: 'KRW' },
  { id: 'KWD', label: 'KWD' },
  { id: 'KYD', label: 'KYD' },
  { id: 'KZT', label: 'KZT' },
  { id: 'LAK', label: 'LAK' },
  { id: 'LBP', label: 'LBP' },
  { id: 'LKR', label: 'LKR' },
  { id: 'LRD', label: 'LRD' },
  { id: 'LSL', label: 'LSL' },
  { id: 'LYD', label: 'LYD' },
  { id: 'MAD', label: 'MAD' },
  { id: 'MDL', label: 'MDL' },
  { id: 'MGA', label: 'MGA' },
  { id: 'MKD', label: 'MKD' },
  { id: 'MMK', label: 'MMK' },
  { id: 'MNT', label: 'MNT' },
  { id: 'MOP', label: 'MOP' },
  { id: 'MRO', label: 'MRO' },
  { id: 'MUR', label: 'MUR' },
  { id: 'MVR', label: 'MVR' },
  { id: 'MWK', label: 'MWK' },
  { id: 'MXN', label: 'MXN' },
  { id: 'MXV', label: 'MXV' },
  { id: 'MYR', label: 'MYR' },
  { id: 'MZN', label: 'MZN' },
  { id: 'NAD', label: 'NAD' },
  { id: 'NGN', label: 'NGN' },
  { id: 'NIO', label: 'NIO' },
  { id: 'NOK', label: 'NOK' },
  { id: 'NPR', label: 'NPR' },
  { id: 'NZD', label: 'NZD' },
  { id: 'OMR', label: 'OMR' },
  { id: 'PAB', label: 'PAB' },
  { id: 'PEN', label: 'PEN' },
  { id: 'PGK', label: 'PGK' },
  { id: 'PHP', label: 'PHP' },
  { id: 'PKR', label: 'PKR' },
  { id: 'PLN', label: 'PLN' },
  { id: 'PYG', label: 'PYG' },
  { id: 'QAR', label: 'QAR' },
  { id: 'RCS', label: 'RCS' },
  { id: 'RON', label: 'RON' },
  { id: 'RSD', label: 'RSD' },
  { id: 'RUB', label: 'RUB' },
  { id: 'RWF', label: 'RWF' },
  { id: 'SAR', label: 'SAR' },
  { id: 'SBD', label: 'SBD' },
  { id: 'SDG', label: 'SDG' },
  { id: 'SEK', label: 'SEK' },
  { id: 'SGD', label: 'SGD' },
  { id: 'SGH', label: 'SGH' },
  { id: 'SHP', label: 'SHP' },
  { id: 'SLL', label: 'SLL' },
  { id: 'SOS', label: 'SOS' },
  { id: 'SRD', label: 'SRD' },
  { id: 'SSP', label: 'SSP' },
  { id: 'STD', label: 'STD' },
  { id: 'SVC', label: 'SVC' },
  { id: 'SYP', label: 'SYP' },
  { id: 'SZL', label: 'SZL' },
  { id: 'THB', label: 'THB' },
  { id: 'TJS', label: 'TJS' },
  { id: 'TMT', label: 'TMT' },
  { id: 'TND', label: 'TND' },
  { id: 'TOP', label: 'TOP' },
  { id: 'TRY', label: 'TRY' },
  { id: 'TTD', label: 'TTD' },
  { id: 'TWD', label: 'TWD' },
  { id: 'TZS', label: 'TZS' },
  { id: 'UAH', label: 'UAH' },
  { id: 'UGX', label: 'UGX' },
  { id: 'USD', label: 'USD' },
  { id: 'USN', label: 'USN' },
  { id: 'UYI', label: 'UYI' },
  { id: 'UYU', label: 'UYU' },
  { id: 'UZS', label: 'UZS' },
  { id: 'VEF', label: 'VEF' },
  { id: 'VND', label: 'VND' },
  { id: 'VUV', label: 'VUV' },
  { id: 'WST', label: 'WST' },
  { id: 'XAF', label: 'XAF' },
  { id: 'XCD', label: 'XCD' },
  { id: 'XDR', label: 'XDR' },
  { id: 'XOF', label: 'XOF' },
  { id: 'XPF', label: 'XPF' },
  { id: 'XSU', label: 'XSU' },
  { id: 'XUA', label: 'XUA' },
  { id: 'YER', label: 'YER' },
  { id: 'ZAR', label: 'ZAR' },
  { id: 'ZMW', label: 'ZMW' },
  { id: 'ZWL', label: 'ZWL' }
];

// Export Default
export default Currencies;
