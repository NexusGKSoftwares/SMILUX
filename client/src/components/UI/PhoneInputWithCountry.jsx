import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Dropdown from './Dropdown.jsx';
import {
  PhoneIcon,
  SearchIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  AlertIcon,
  ChevronDownIcon,
  XIcon,
  ChatIcon,
  BuildingIcon,
} from './tableIcons.jsx';

export function ReactFlag({ code, className = "" }) {
  const codeLower = (code || 'ke').toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${codeLower}.png`}
      srcSet={`https://flagcdn.com/w80/${codeLower}.png 2x`}
      alt={code}
      className={`w-5 h-3.5 object-cover rounded-2xs border border-slate-200/90 shadow-2xs shrink-0 ${className}`}
      loading="lazy"
    />
  );
}

export function formatPlaceholder(fmt) {
  if (!fmt) return '0700 000 000';
  return fmt.replace(/x/gi, '0');
}

export const COUNTRY_CODES = [
  { code: 'KE', name: 'Kenya', dial: '+254', format: '07xx xxx xxx / 01xx xxx xxx' },
  { code: 'AF', name: 'Afghanistan', dial: '+93', format: '07x xxx xxxx' },
  { code: 'AL', name: 'Albania', dial: '+355', format: '06x xxx xxxx' },
  { code: 'DZ', name: 'Algeria', dial: '+213', format: '05xx xx xx xx' },
  { code: 'AS', name: 'American Samoa', dial: '+1684', format: '(684) xxx-xxxx' },
  { code: 'AD', name: 'Andorra', dial: '+376', format: 'xxx xxx' },
  { code: 'AO', name: 'Angola', dial: '+244', format: '9xx xxx xxx' },
  { code: 'AI', name: 'Anguilla', dial: '+1264', format: '(264) xxx-xxxx' },
  { code: 'AQ', name: 'Antarctica', dial: '+672', format: 'xxx xxx' },
  { code: 'AG', name: 'Antigua and Barbuda', dial: '+1268', format: '(268) xxx-xxxx' },
  { code: 'AR', name: 'Argentina', dial: '+54', format: '9 11 xxxx-xxxx' },
  { code: 'AM', name: 'Armenia', dial: '+374', format: '0xx xxxxxx' },
  { code: 'AW', name: 'Aruba', dial: '+297', format: '5xx xxxx' },
  { code: 'AC', name: 'Ascension Island', dial: '+247', format: 'xxxx' },
  { code: 'AU', name: 'Australia', dial: '+61', format: '04xx xxx xxx' },
  { code: 'AT', name: 'Austria', dial: '+43', format: '06xx xxxxxx' },
  { code: 'AZ', name: 'Azerbaijan', dial: '+994', format: '0xx xxx xx xx' },
  { code: 'BS', name: 'Bahamas', dial: '+1242', format: '(242) xxx-xxxx' },
  { code: 'BH', name: 'Bahrain', dial: '+973', format: '3xxx xxxx' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', format: '01xxx-xxxxxx' },
  { code: 'BB', name: 'Barbados', dial: '+1246', format: '(246) xxx-xxxx' },
  { code: 'BY', name: 'Belarus', dial: '+375', format: '29 xxx-xx-xx' },
  { code: 'BE', name: 'Belgium', dial: '+32', format: '04xx xx xx xx' },
  { code: 'BZ', name: 'Belize', dial: '+501', format: '6xx-xxxx' },
  { code: 'BJ', name: 'Benin', dial: '+229', format: '9x xx xx xx' },
  { code: 'BM', name: 'Bermuda', dial: '+1441', format: '(441) xxx-xxxx' },
  { code: 'BT', name: 'Bhutan', dial: '+975', format: '17 xx xx xx' },
  { code: 'BO', name: 'Bolivia', dial: '+591', format: '7xxx xxxx' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387', format: '06x xxx xxx' },
  { code: 'BW', name: 'Botswana', dial: '+267', format: '7x xxx xxx' },
  { code: 'BR', name: 'Brazil', dial: '+55', format: '(xx) 9xxxx-xxxx' },
  { code: 'VG', name: 'British Virgin Islands', dial: '+1284', format: '(284) xxx-xxxx' },
  { code: 'BN', name: 'Brunei', dial: '+673', format: '8xx xxxx' },
  { code: 'BG', name: 'Bulgaria', dial: '+359', format: '08x xxx xxxx' },
  { code: 'BF', name: 'Burkina Faso', dial: '+226', format: '70 xx xx xx' },
  { code: 'MM', name: 'Burma (Myanmar)', dial: '+95', format: '09 xxxxxxxx' },
  { code: 'BI', name: 'Burundi', dial: '+257', format: '79 xx xx xx' },
  { code: 'KH', name: 'Cambodia', dial: '+855', format: '012 xxx xxx' },
  { code: 'CM', name: 'Cameroon', dial: '+237', format: '6 xx xx xx xx' },
  { code: 'CA', name: 'Canada', dial: '+1', format: '(xxx) xxx-xxxx' },
  { code: 'CV', name: 'Cape Verde', dial: '+238', format: '9xx xx xx' },
  { code: 'KY', name: 'Cayman Islands', dial: '+1345', format: '(345) xxx-xxxx' },
  { code: 'CF', name: 'Central African Republic', dial: '+236', format: '75 xx xx xx' },
  { code: 'TD', name: 'Chad', dial: '+235', format: '66 xx xx xx' },
  { code: 'CL', name: 'Chile', dial: '+56', format: '9 xxxx xxxx' },
  { code: 'CN', name: 'China', dial: '+86', format: '1xx xxxx xxxx' },
  { code: 'CX', name: 'Christmas Island', dial: '+61', format: '04xx xxx xxx' },
  { code: 'CC', name: 'Cocos (Keeling) Islands', dial: '+61', format: '04xx xxx xxx' },
  { code: 'CO', name: 'Colombia', dial: '+57', format: '3xx xxx xxxx' },
  { code: 'KM', name: 'Comoros', dial: '+269', format: '3xx xx xx' },
  { code: 'CG', name: 'Congo', dial: '+242', format: '06 xxx xxxx' },
  { code: 'CK', name: 'Cook Islands', dial: '+682', format: '5x xxx' },
  { code: 'CR', name: 'Costa Rica', dial: '+506', format: '8xxx xxxx' },
  { code: 'HR', name: 'Croatia', dial: '+385', format: '09x xxx xxxx' },
  { code: 'CU', name: 'Cuba', dial: '+53', format: '5 xxx xxxx' },
  { code: 'CY', name: 'Cyprus', dial: '+357', format: '9x xxxxxx' },
  { code: 'CZ', name: 'Czech Republic', dial: '+420', format: '7xx xxx xxx' },
  { code: 'CD', name: 'Democratic Republic of the Congo', dial: '+243', format: '81x xxx xxx' },
  { code: 'DK', name: 'Denmark', dial: '+45', format: 'xx xx xx xx' },
  { code: 'DG', name: 'Diego Garcia', dial: '+246', format: '370 xxxx' },
  { code: 'DJ', name: 'Djibouti', dial: '+253', format: '77 xx xx xx' },
  { code: 'DM', name: 'Dominica', dial: '+1767', format: '(767) xxx-xxxx' },
  { code: 'DO', name: 'Dominican Republic', dial: '+1809', format: '(809) xxx-xxxx' },
  { code: 'EC', name: 'Ecuador', dial: '+593', format: '09x xxx xxxx' },
  { code: 'EG', name: 'Egypt', dial: '+20', format: '01x xxxx xxxx' },
  { code: 'SV', name: 'El Salvador', dial: '+503', format: '7xxx xxxx' },
  { code: 'GQ', name: 'Equatorial Guinea', dial: '+240', format: '222 xxx xxx' },
  { code: 'ER', name: 'Eritrea', dial: '+291', format: '7 xxx xxx' },
  { code: 'EE', name: 'Estonia', dial: '+372', format: '5xxx xxxx' },
  { code: 'ET', name: 'Ethiopia', dial: '+251', format: '09xx xxx xxx' },
  { code: 'FK', name: 'Falkland Islands', dial: '+500', format: '5xxxx' },
  { code: 'FO', name: 'Faroe Islands', dial: '+298', format: 'xx xx xx' },
  { code: 'FJ', name: 'Fiji', dial: '+679', format: '7xx xxxx' },
  { code: 'FI', name: 'Finland', dial: '+358', format: '04x xxx xxxx' },
  { code: 'FR', name: 'France', dial: '+33', format: '06 xx xx xx xx' },
  { code: 'GF', name: 'French Guiana', dial: '+594', format: '0694 xx xx xx' },
  { code: 'PF', name: 'French Polynesia', dial: '+689', format: '87 xx xx xx' },
  { code: 'GA', name: 'Gabon', dial: '+241', format: '06 xx xx xx' },
  { code: 'GM', name: 'Gambia', dial: '+220', format: '7x xx xx xx' },
  { code: 'GE', name: 'Georgia', dial: '+995', format: '5xx xx xx xx' },
  { code: 'DE', name: 'Germany', dial: '+49', format: '015x xxxxxxxx' },
  { code: 'GH', name: 'Ghana', dial: '+233', format: '024 xxx xxxx' },
  { code: 'GI', name: 'Gibraltar', dial: '+350', format: '58xxx' },
  { code: 'GR', name: 'Greece', dial: '+30', format: '69x xxx xxxx' },
  { code: 'GL', name: 'Greenland', dial: '+299', format: '5x xx xx' },
  { code: 'GD', name: 'Grenada', dial: '+1473', format: '(473) xxx-xxxx' },
  { code: 'GP', name: 'Guadeloupe', dial: '+590', format: '0690 xx xx xx' },
  { code: 'GU', name: 'Guam', dial: '+1671', format: '(671) xxx-xxxx' },
  { code: 'GT', name: 'Guatemala', dial: '+502', format: '5xxx xxxx' },
  { code: 'GN', name: 'Guinea', dial: '+224', format: '62x xx xx xx' },
  { code: 'GW', name: 'Guinea-Bissau', dial: '+245', format: '95 xxx xxxx' },
  { code: 'GY', name: 'Guyana', dial: '+592', format: '6xx xxxx' },
  { code: 'HT', name: 'Haiti', dial: '+509', format: '34 xx xxxx' },
  { code: 'VA', name: 'Holy See (Vatican City)', dial: '+39', format: '06 698xxxxx' },
  { code: 'HN', name: 'Honduras', dial: '+504', format: '9xxx xxxx' },
  { code: 'HK', name: 'Hong Kong', dial: '+852', format: '9xxx xxxx' },
  { code: 'HU', name: 'Hungary', dial: '+36', format: '20 xxx xxxx' },
  { code: 'IS', name: 'Iceland', dial: '+354', format: '6xx xxxx' },
  { code: 'IN', name: 'India', dial: '+91', format: '9xxxx xxxxx' },
  { code: 'ID', name: 'Indonesia', dial: '+62', format: '0812-xxxx-xxxx' },
  { code: 'IR', name: 'Iran', dial: '+98', format: '0912 xxx xxxx' },
  { code: 'IQ', name: 'Iraq', dial: '+964', format: '0790 xxx xxxx' },
  { code: 'IE', name: 'Ireland', dial: '+353', format: '087 xxx xxxx' },
  { code: 'IM', name: 'Isle of Man', dial: '+44', format: '07624 xxxxxx' },
  { code: 'IL', name: 'Israel', dial: '+972', format: '05x-xxx-xxxx' },
  { code: 'IT', name: 'Italy', dial: '+39', format: '3xx xxx xxxx' },
  { code: 'CI', name: 'Ivory Coast (Côte d\'Ivoire)', dial: '+225', format: '07 xx xx xx xx' },
  { code: 'JM', name: 'Jamaica', dial: '+1876', format: '(876) xxx-xxxx' },
  { code: 'JP', name: 'Japan', dial: '+81', format: '090-xxxx-xxxx' },
  { code: 'JE', name: 'Jersey', dial: '+44', format: '07797 xxxxxx' },
  { code: 'JO', name: 'Jordan', dial: '+962', format: '07 9xxx xxxx' },
  { code: 'KZ', name: 'Kazakhstan', dial: '+7', format: '77x xxx xx xx' },
  { code: 'KI', name: 'Kiribati', dial: '+686', format: '73xx xxxx' },
  { code: 'KW', name: 'Kuwait', dial: '+965', format: '9xxx xxxx' },
  { code: 'KG', name: 'Kyrgyzstan', dial: '+996', format: '055x xxx xxx' },
  { code: 'LA', name: 'Laos', dial: '+856', format: '020 xx xxx xxx' },
  { code: 'LV', name: 'Latvia', dial: '+371', format: '2xxx xxxx' },
  { code: 'LB', name: 'Lebanon', dial: '+961', format: '70 xxx xxx' },
  { code: 'LS', name: 'Lesotho', dial: '+266', format: '58xx xxxx' },
  { code: 'LR', name: 'Liberia', dial: '+231', format: '88 xxx xxxx' },
  { code: 'LY', name: 'Libya', dial: '+218', format: '091 xxx xxxx' },
  { code: 'LI', name: 'Liechtenstein', dial: '+423', format: '79x xxx x' },
  { code: 'LT', name: 'Lithuania', dial: '+370', format: '8 6xx xx xxx' },
  { code: 'LU', name: 'Luxembourg', dial: '+352', format: '661 xxx xxx' },
  { code: 'MO', name: 'Macau', dial: '+853', format: '6xxx xxxx' },
  { code: 'MK', name: 'Macedonia', dial: '+389', format: '07x xxx xxx' },
  { code: 'MG', name: 'Madagascar', dial: '+261', format: '034 xx xxx xx' },
  { code: 'MW', name: 'Malawi', dial: '+265', format: '099 xx xxxx' },
  { code: 'MY', name: 'Malaysia', dial: '+60', format: '01x-xxx xxxx' },
  { code: 'MV', name: 'Maldives', dial: '+960', format: '7xx xxxx' },
  { code: 'ML', name: 'Mali', dial: '+223', format: '7x xx xx xx' },
  { code: 'MT', name: 'Malta', dial: '+356', format: '99xx xxxx' },
  { code: 'MH', name: 'Marshall Islands', dial: '+692', format: '247 xxxx' },
  { code: 'MQ', name: 'Martinique', dial: '+596', format: '0696 xx xx xx' },
  { code: 'MR', name: 'Mauritania', dial: '+222', format: '4x xx xx xx' },
  { code: 'MU', name: 'Mauritius', dial: '+230', format: '5xxx xxxx' },
  { code: 'YT', name: 'Mayotte', dial: '+262', format: '0639 xx xx xx' },
  { code: 'MX', name: 'Mexico', dial: '+52', format: '1 xxx xxx xxxx' },
  { code: 'FM', name: 'Micronesia', dial: '+691', format: '92x xxxx' },
  { code: 'MD', name: 'Moldova', dial: '+373', format: '06xx xx xxx' },
  { code: 'MC', name: 'Monaco', dial: '+377', format: '06 xx xx xx xx' },
  { code: 'MN', name: 'Mongolia', dial: '+976', format: '88xx xxxx' },
  { code: 'ME', name: 'Montenegro', dial: '+382', format: '067 xxx xxx' },
  { code: 'MS', name: 'Montserrat', dial: '+1664', format: '(664) xxx-xxxx' },
  { code: 'MA', name: 'Morocco', dial: '+212', format: '06xx-xxxxxx' },
  { code: 'MZ', name: 'Mozambique', dial: '+258', format: '82 xxx xxxx' },
  { code: 'NA', name: 'Namibia', dial: '+264', format: '081 xxx xxxx' },
  { code: 'NR', name: 'Nauru', dial: '+674', format: '555 xxxx' },
  { code: 'NP', name: 'Nepal', dial: '+977', format: '98xxxxxxxx' },
  { code: 'NL', name: 'Netherlands', dial: '+31', format: '06 xxxxxxxx' },
  { code: 'AN', name: 'Netherlands Antilles', dial: '+599', format: '9 xxx xxxx' },
  { code: 'NC', name: 'New Caledonia', dial: '+687', format: '7x xx xx' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', format: '021 xxx xxxx' },
  { code: 'NI', name: 'Nicaragua', dial: '+505', format: '8xxx xxxx' },
  { code: 'NE', name: 'Niger', dial: '+227', format: '9x xx xx xx' },
  { code: 'NG', name: 'Nigeria', dial: '+234', format: '080x xxx xxxx' },
  { code: 'NU', name: 'Niue', dial: '+683', format: '4xxx' },
  { code: 'NF', name: 'Norfolk Island', dial: '+672', format: '3 xx xxx' },
  { code: 'KP', name: 'North Korea', dial: '+850', format: '191 xxx xxxx' },
  { code: 'MP', name: 'Northern Mariana Islands', dial: '+1670', format: '(670) xxx-xxxx' },
  { code: 'NO', name: 'Norway', dial: '+47', format: '4xx xx xxx' },
  { code: 'OM', name: 'Oman', dial: '+968', format: '9xxx xxxx' },
  { code: 'PK', name: 'Pakistan', dial: '+92', format: '03xx xxxxxxx' },
  { code: 'PW', name: 'Palau', dial: '+680', format: '77x xxxx' },
  { code: 'PS', name: 'Palestine', dial: '+970', format: '059 xxx xxxx' },
  { code: 'PA', name: 'Panama', dial: '+507', format: '6xxx-xxxx' },
  { code: 'PG', name: 'Papua New Guinea', dial: '+675', format: '7xxx xxxx' },
  { code: 'PY', name: 'Paraguay', dial: '+595', format: '098x xxx xxx' },
  { code: 'PE', name: 'Peru', dial: '+51', format: '9xx xxx xxx' },
  { code: 'PH', name: 'Philippines', dial: '+63', format: '09xx xxx xxxx' },
  { code: 'PN', name: 'Pitcairn Islands', dial: '+870', format: 'xxx xxx xxx' },
  { code: 'PL', name: 'Poland', dial: '+48', format: '5xx xxx xxx' },
  { code: 'PT', name: 'Portugal', dial: '+351', format: '91x xxx xxx' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1787', format: '(787) xxx-xxxx' },
  { code: 'QA', name: 'Qatar', dial: '+974', format: '3xxx xxxx' },
  { code: 'RE', name: 'Reunion Island', dial: '+262', format: '0692 xx xx xx' },
  { code: 'RO', name: 'Romania', dial: '+40', format: '07xx xxx xxx' },
  { code: 'RU', name: 'Russia', dial: '+7', format: '9xx xxx-xx-xx' },
  { code: 'RW', name: 'Rwanda', dial: '+250', format: '078x xxx xxx' },
  { code: 'BL', name: 'Saint Barthelemy', dial: '+590', format: '0690 xx xx xx' },
  { code: 'SH', name: 'Saint Helena', dial: '+290', format: '2xxxx' },
  { code: 'KN', name: 'Saint Kitts and Nevis', dial: '+1869', format: '(869) xxx-xxxx' },
  { code: 'LC', name: 'Saint Lucia', dial: '+1758', format: '(758) xxx-xxxx' },
  { code: 'MF', name: 'Saint Martin', dial: '+590', format: '0690 xx xx xx' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', dial: '+508', format: '55 xx xx' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', dial: '+1784', format: '(784) xxx-xxxx' },
  { code: 'WS', name: 'Samoa', dial: '+685', format: '7x xxxxx' },
  { code: 'SM', name: 'San Marino', dial: '+378', format: '66 xx xx xx' },
  { code: 'ST', name: 'Sao Tome and Principe', dial: '+239', format: '98x xxxx' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', format: '05x xxx xxxx' },
  { code: 'SN', name: 'Senegal', dial: '+221', format: '77 xxx xx xx' },
  { code: 'RS', name: 'Serbia', dial: '+381', format: '06x xxx xxxx' },
  { code: 'SC', name: 'Seychelles', dial: '+248', format: '2 xx xx xx' },
  { code: 'SL', name: 'Sierra Leone', dial: '+232', format: '76 xxx xxx' },
  { code: 'SG', name: 'Singapore', dial: '+65', format: '8xxx xxxx' },
  { code: 'SX', name: 'Sint Maarten', dial: '+1721', format: '(721) xxx-xxxx' },
  { code: 'SK', name: 'Slovakia', dial: '+421', format: '09xx xxx xxx' },
  { code: 'SI', name: 'Slovenia', dial: '+386', format: '031 xxx xxx' },
  { code: 'SB', name: 'Solomon Islands', dial: '+677', format: '7xx xxxx' },
  { code: 'SO', name: 'Somalia', dial: '+252', format: '61x xxx xxx' },
  { code: 'ZA', name: 'South Africa', dial: '+27', format: '08x xxx xxxx' },
  { code: 'KR', name: 'South Korea', dial: '+82', format: '010-xxxx-xxxx' },
  { code: 'SS', name: 'South Sudan', dial: '+211', format: '09xx xxx xxx' },
  { code: 'ES', name: 'Spain', dial: '+34', format: '6xx xx xx xx' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', format: '07x xxx xxxx' },
  { code: 'SD', name: 'Sudan', dial: '+249', format: '09x xxx xxxx' },
  { code: 'SR', name: 'Suriname', dial: '+597', format: '8xx-xxxx' },
  { code: 'SJ', name: 'Svalbard', dial: '+47', format: '79 xx xx xx' },
  { code: 'SZ', name: 'Swaziland', dial: '+268', format: '76xx xxxx' },
  { code: 'SE', name: 'Sweden', dial: '+46', format: '070-xxx xx xx' },
  { code: 'CH', name: 'Switzerland', dial: '+41', format: '079 xxx xx xx' },
  { code: 'SY', name: 'Syria', dial: '+963', format: '09xx xxx xxx' },
  { code: 'TW', name: 'Taiwan', dial: '+886', format: '09xx-xxx-xxx' },
  { code: 'TJ', name: 'Tajikistan', dial: '+992', format: '918 xx xx xx' },
  { code: 'TZ', name: 'Tanzania', dial: '+255', format: '07xx xxx xxx' },
  { code: 'TH', name: 'Thailand', dial: '+66', format: '08x-xxx-xxxx' },
  { code: 'TL', name: 'Timor-Leste (East Timor)', dial: '+670', format: '77xx xxxx' },
  { code: 'TG', name: 'Togo', dial: '+228', format: '90 xx xx xx' },
  { code: 'TK', name: 'Tokelau', dial: '+690', format: 'xxxx' },
  { code: 'TO', name: 'Tonga Islands', dial: '+676', format: '77x xxxx' },
  { code: 'TT', name: 'Trinidad and Tobago', dial: '+1868', format: '(868) xxx-xxxx' },
  { code: 'TN', name: 'Tunisia', dial: '+216', format: '2x xxx xxx' },
  { code: 'TR', name: 'Turkey', dial: '+90', format: '05xx xxx xx xx' },
  { code: 'TM', name: 'Turkmenistan', dial: '+993', format: '65 xx-xx-xx' },
  { code: 'TC', name: 'Turks and Caicos Islands', dial: '+1649', format: '(649) xxx-xxxx' },
  { code: 'TV', name: 'Tuvalu', dial: '+688', format: '90xxxx' },
  { code: 'UG', name: 'Uganda', dial: '+256', format: '07xx xxx xxx' },
  { code: 'UA', name: 'Ukraine', dial: '+380', format: '050 xxx xx xx' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', format: '50 xxx xxxx' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', format: '7xxx xxxxxx' },
  { code: 'US', name: 'United States', dial: '+1', format: '(xxx) xxx-xxxx' },
  { code: 'UY', name: 'Uruguay', dial: '+598', format: '099 xxx xxx' },
  { code: 'VI', name: 'US Virgin Islands', dial: '+1340', format: '(340) xxx-xxxx' },
  { code: 'UZ', name: 'Uzbekistan', dial: '+998', format: '90 xxx xx xx' },
  { code: 'VU', name: 'Vanuatu', dial: '+678', format: '5xx xxxx' },
  { code: 'VE', name: 'Venezuela', dial: '+58', format: '0412-xxx-xxxx' },
  { code: 'VN', name: 'Vietnam', dial: '+84', format: '09x xxx xxxx' },
  { code: 'WF', name: 'Wallis and Futuna', dial: '+681', format: '82 xx xx' },
  { code: 'EH', name: 'Western Sahara', dial: '+212', format: '06xx-xxxxxx' },
  { code: 'YE', name: 'Yemen', dial: '+967', format: '77x xxx xxx' },
  { code: 'ZM', name: 'Zambia', dial: '+260', format: '097 xxx xxxx' },
  { code: 'ZW', name: 'Zimbabwe', dial: '+263', format: '077 xxx xxxx' },
];

export const SECONDARY_TYPE_OPTIONS = [
  { value: 'WhatsApp', label: 'WhatsApp', icon: <ChatIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> },
  { value: 'Alternative', label: 'Alternative Phone', icon: <PhoneIcon className="w-3.5 h-3.5 text-brand-600 shrink-0" /> },
  { value: 'Office', label: 'Office / Landline', icon: <BuildingIcon className="w-3.5 h-3.5 text-sky-600 shrink-0" /> },
  { value: 'Emergency', label: 'Emergency Contact', icon: <AlertIcon className="w-3.5 h-3.5 text-rose-600 shrink-0" /> },
];

// Helper for fetching user country code via IP geolocation
let cachedUserCountryCode = null;

export async function fetchUserCountryCode() {
  if (cachedUserCountryCode) return cachedUserCountryCode;

  try {
    const saved = sessionStorage.getItem('smilux_user_country_code');
    if (saved) {
      cachedUserCountryCode = saved;
      return saved;
    }
  } catch (e) {
    // Ignore storage errors
  }

  // 1. Try ipapi.co
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        const code = String(data.country_code).toUpperCase();
        cachedUserCountryCode = code;
        try { sessionStorage.setItem('smilux_user_country_code', code); } catch (e) { }
        return code;
      }
    }
  } catch (e) {
    // Fallback to next API
  }

  // 2. Try api.country.is
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://api.country.is', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.country) {
        const code = String(data.country).toUpperCase();
        cachedUserCountryCode = code;
        try { sessionStorage.setItem('smilux_user_country_code', code); } catch (e) { }
        return code;
      }
    }
  } catch (e) {
    // Fallback to browser locale
  }

  // 3. Fallback to browser navigator language
  try {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const parts = navigator.language.split('-');
      if (parts.length > 1) {
        const region = parts[parts.length - 1].toUpperCase();
        if (region.length === 2) {
          cachedUserCountryCode = region;
          return region;
        }
      }
    }
  } catch (e) {
    // Ignore
  }

  return null;
}

function SecondaryCountryPicker({ selectedCode, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 240, isReady: false });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  const country = useMemo(() => {
    return COUNTRY_CODES.find((c) => c.code === selectedCode) || COUNTRY_CODES[0];
  }, [selectedCode]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRY_CODES;
    const q = search.toLowerCase();
    return COUNTRY_CODES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [search]);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 260;
    const menuHeight = 240;

    let top = rect.bottom + 4;
    if (rect.bottom + menuHeight + 10 > window.innerHeight && rect.top > menuHeight) {
      top = rect.top - menuHeight - 4;
    }

    let left = rect.left;
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    top = Math.max(8, top);

    setCoords({ top, left, width: menuWidth, isReady: true });
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      calculatePosition();
      const handleScrollOrResize = () => calculatePosition();
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);

      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    } else {
      setCoords((prev) => ({ ...prev, isReady: false }));
    }
  }, [isOpen, calculatePosition]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        calculatePosition();
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 0);

      const handleClickOutside = (e) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target) &&
          menuRef.current &&
          !menuRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setSearch('');
    }
  }, [isOpen, calculatePosition]);

  return (
    <div className="relative shrink-0 h-full font-sans" ref={triggerRef}>
      <button
        type="button"
        onClick={() => {
          if (!isOpen) calculatePosition();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center gap-0.5 px-1.5 bg-slate-50/90 hover:bg-slate-100 border-r border-slate-200 rounded-l-md text-xs font-semibold text-slate-700 h-full transition-colors cursor-pointer  shrink-0"
        title="Select country code"
      >
        <ReactFlag code={country.code} />
        <span className="font-sans text-slate-700 text-[11px]">{country.dial}</span>
        <ChevronDownIcon className="w-3 h-3 text-slate-400 shrink-0" />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 9999,
              opacity: coords.isReady ? 1 : 0,
              visibility: coords.isReady ? 'visible' : 'hidden',
            }}
            className="bg-white/95 backdrop-blur-md border border-slate-200 rounded shadow-xl flex flex-col max-h-[240px] overflow-hidden animate-in fade-in zoom-in-95 duration-100 font-sans"
          >
            <div className="p-2 border-b border-slate-100 bg-slate-50/90 sticky top-0 z-10 flex items-center gap-2">
              <SearchIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full text-xs bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 font-sans"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="overflow-y-auto flex-1 py-1 no-scrollbar divide-y divide-slate-50">
              {filteredCountries.length === 0 ? (
                <div className="px-3 py-3 text-center text-xs text-slate-400">No matching countries</div>
              ) : (
                filteredCountries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      onSelect(c);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors text-left cursor-pointer ${country.code === c.code ? 'bg-brand-50 font-bold text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <ReactFlag code={c.code} />
                      <span>{c.name}</span>
                    </div>
                    <span className="font-sans text-slate-500 text-[11px] shrink-0 ml-2">{c.dial}</span>
                  </button>
                ))
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}


export default function PhoneInputWithCountry({
  value = '',
  onChange,
  secondaryNumbers = [],
  onSecondaryChange,
  allowMultiple = true,
  required = false,
  label = 'Phone Number',
  className = '',
  error = '',
  placeholder,
  size = 'md',
  disabled = false,
}) {
  const [selectedCountry, setSelectedCountry] = useState(() => COUNTRY_CODES.find(c => c.code === 'KE') || COUNTRY_CODES[0]);
  const userHasSelectedRef = useRef(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 280, isReady: false });

  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Auto-detect user country via IP geolocation on mount / value initialization
  useEffect(() => {
    let isMounted = true;

    // Check if value already has explicit matching country code / dial code
    if (value) {
      const str = String(value).trim();
      const digits = str.replace(/\D/g, '');
      const withPlus = str.startsWith('+') ? str : '+' + str;
      const matched = COUNTRY_CODES.find(
        (c) => withPlus.startsWith(c.dial) || (digits && (digits.startsWith(c.dial.replace('+', '')) || digits.startsWith(c.code.toLowerCase())))
      );
      if (matched) {
        setSelectedCountry(matched);
        return;
      }
    }

    if (!userHasSelectedRef.current) {
      fetchUserCountryCode().then((code) => {
        if (isMounted && code && !userHasSelectedRef.current) {
          const match = COUNTRY_CODES.find((c) => c.code === code);
          if (match) {
            setSelectedCountry(match);
          }
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [value]);

  // Position calculation for React Portal dropdown (escapes all modal/card overflows)
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = Math.max(260, rect.width || 260);
    const menuHeight = menuRef.current?.offsetHeight || 260;

    let top = rect.bottom + 4;
    if (rect.bottom + menuHeight + 10 > window.innerHeight && rect.top > menuHeight) {
      top = rect.top - menuHeight - 4;
    }

    let left = rect.left;
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));
    top = Math.max(8, top);

    setCoords({ top, left, width: menuWidth, isReady: true });
  }, []);

  useLayoutEffect(() => {
    if (dropdownOpen) {
      calculatePosition();
      const handleScrollOrResize = () => calculatePosition();
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);

      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    } else {
      setCoords((prev) => ({ ...prev, isReady: false }));
    }
  }, [dropdownOpen, calculatePosition]);

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => {
        calculatePosition();
        if (searchInputRef.current) searchInputRef.current.focus();
      }, 0);

      const handleClickOutside = (e) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target) &&
          menuRef.current &&
          !menuRef.current.contains(e.target)
        ) {
          setDropdownOpen(false);
        }
      };
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setDropdownOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setSearch('');
    }
  }, [dropdownOpen, calculatePosition]);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRY_CODES;
    const q = search.toLowerCase();
    return COUNTRY_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [search]);

  // Smart Kenyan validation & Auto-formatting
  const isKenya = selectedCountry.dial === '+254';
  const cleanNum = (value || '').replace(/\D/g, '');

  // Auto-normalize Kenyan phone numbers (e.g. 0768193991 -> 254768193991)
  const autoNormalizePhone = useCallback((rawVal) => {
    if (!rawVal) return rawVal;
    const str = String(rawVal).trim();
    const digits = str.replace(/\D/g, '');

    // Handle +254... format
    if (str.startsWith('+254')) {
      return '254' + digits.slice(3);
    }
    // Handle 07xx xxx xxx or 01xx xxx xxx (10 digits starting with 0)
    if (/^0[71]\d{8}$/.test(digits) || (digits.length === 10 && digits.startsWith('0'))) {
      return '254' + digits.slice(1);
    }
    // Handle 7xx xxx xxx or 1xx xxx xxx (9 digits starting with 7 or 1)
    if (/^[71]\d{8}$/.test(digits)) {
      return '254' + digits;
    }

    return rawVal;
  }, []);

  // Auto-normalize prefilled primary value (e.g. 0768193991 -> 254768193991)
  useEffect(() => {
    if (value) {
      const normalized = autoNormalizePhone(value);
      if (normalized !== value) {
        onChange?.(normalized);
      }
    }
  }, [value, autoNormalizePhone, onChange]);

  const isKenyanValid = useMemo(() => {
    if (!isKenya || !cleanNum) return false;
    if (cleanNum.length === 10) return /^0(7|1)\d{8}$/.test(cleanNum);
    if (cleanNum.length === 9) return /^(7|1)\d{8}$/.test(cleanNum);
    if (cleanNum.length === 12) return /^254(7|1)\d{8}$/.test(cleanNum);
    return false;
  }, [isKenya, cleanNum]);

  const handlePrimaryChange = (e) => {
    const raw = e.target.value;
    const normalized = autoNormalizePhone(raw);
    onChange?.(normalized);
  };

  const handleAddSecondary = () => {
    if (!onSecondaryChange) return;
    onSecondaryChange([
      ...(secondaryNumbers || []),
      { number: '', type: 'WhatsApp', dial: selectedCountry.dial, countryCode: selectedCountry.code },
    ]);
  };

  const handleUpdateSecondary = (index, fieldOrObj, val) => {
    if (!onSecondaryChange) return;
    const updated = [...secondaryNumbers];
    if (typeof fieldOrObj === 'object') {
      const newObj = { ...fieldOrObj };
      if (newObj.number) {
        newObj.number = autoNormalizePhone(newObj.number);
      }
      updated[index] = { ...updated[index], ...newObj };
    } else {
      let finalVal = val;
      if (fieldOrObj === 'number') {
        finalVal = autoNormalizePhone(val);
      }
      updated[index] = { ...updated[index], [fieldOrObj]: finalVal };
    }
    onSecondaryChange(updated);
  };

  const handleRemoveSecondary = (index) => {
    if (!onSecondaryChange) return;
    const updated = secondaryNumbers.filter((_, i) => i !== index);
    onSecondaryChange(updated);
  };

  const menuContent = dropdownOpen && (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: `${coords.width}px`,
        zIndex: 9999,
        opacity: coords.isReady ? 1 : 0,
        visibility: coords.isReady ? 'visible' : 'hidden',
      }}
      className="bg-white/95 backdrop-blur-md border border-slate-200 rounded shadow-xl shadow-slate-900/10 flex flex-col max-h-[280px] overflow-hidden animate-in fade-in zoom-in-95 duration-100 font-sans"
    >
      {/* Search Input */}
      <div className="p-2 border-b border-slate-100 bg-slate-50/90 sticky top-0 z-10 flex items-center gap-2">
        <SearchIcon className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
        <input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search country or dial code..."
          className="w-full text-xs bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 font-sans"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
          >
            <XIcon className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Country List */}
      <div className="overflow-y-auto flex-1 py-1 no-scrollbar divide-y divide-slate-50">
        {filteredCountries.length === 0 ? (
          <div className="px-3 py-4 text-center text-xs text-slate-400 font-sans">No matching countries</div>
        ) : (
          filteredCountries.map((c) => {
            const isSelected = selectedCountry.code === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  userHasSelectedRef.current = true;
                  setSelectedCountry(c);
                  setDropdownOpen(false);
                  setSearch('');
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left cursor-pointer  font-sans
                  ${isSelected ? 'bg-brand-50 font-bold text-brand-700' : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'}
                `.trim()}
              >
                <div className="flex items-center gap-2.5">
                  <ReactFlag code={c.code} />
                  <span>{c.name}</span>
                </div>
                <span className="font-sans text-slate-500 text-[11px] shrink-0 ml-2">{c.dial}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-1.5 w-full font-sans ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-700 flex items-center justify-between font-sans">
          <span className="flex items-center gap-1.5">
            <PhoneIcon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>{label}</span>
            {required && <span className="text-rose-500 font-bold">*</span>}
          </span>
          {isKenya && value && (
            <span
              className={`text-[10px] font-bold flex items-center gap-1 ${isKenyanValid ? 'text-emerald-600' : 'text-amber-600'
                }`}
            >
              {isKenyanValid ? (
                <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
              ) : (
                <AlertIcon className="w-3 h-3 text-amber-600" />
              )}
              {isKenyanValid ? 'Valid Kenyan Number' : '07xx or 01xx format'}
            </span>
          )}
        </label>
      )}

      {/* Primary Input Group */}
      <div className="relative flex items-center w-full font-sans">
        {/* Country Code Trigger */}
        <div className="relative shrink-0" ref={triggerRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                if (!dropdownOpen) calculatePosition();
                setDropdownOpen((prev) => !prev);
              }
            }}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-r-0 border-slate-300 rounded-l text-xs font-semibold text-slate-800
              hover:bg-slate-100/90 focus:outline-none transition-colors cursor-pointer  h-[38px] font-sans
              ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}
            `.trim()}
          >
            <ReactFlag code={selectedCountry.code} />
            <span className="font-sans">{selectedCountry.dial}</span>
            <ChevronDownIcon className="w-3 h-3 text-slate-400 shrink-0" />
          </button>
        </div>

        {/* Number Input Field */}
        <input
          type="tel"
          disabled={disabled}
          value={value}
          onChange={handlePrimaryChange}
          placeholder={placeholder || (isKenya ? 'e.g. 0700 000 000' : `e.g. ${formatPlaceholder(selectedCountry.format)}`)}
          className={`
            w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-r bg-white text-slate-800
            focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 focus:outline-none transition-all
            placeholder:text-slate-400 h-[38px] font-sans
            ${error ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500' : ''}
            ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}
          `.trim()}
        />

        {/* Escaping React Portal Dropdown */}
        {createPortal(menuContent, document.body)}
      </div>

      {/* Validation Helper Hint */}
      {isKenya && (
        <p className="text-[11px] text-slate-500 font-sans">
          Enter a valid Kenyan mobile number (e.g. 0700 000 000 or 0100 000 000) or international format.
        </p>
      )}

      {error && <p className="text-xs text-rose-500 font-medium font-sans">{error}</p>}

      {/* Multiple Secondary Numbers Section */}
      {allowMultiple && (
        <div className="space-y-2 pt-1 font-sans">
          {secondaryNumbers?.map((sec, idx) => {
            const secCountryCode = sec.countryCode || selectedCountry.code;
            const secCountry = COUNTRY_CODES.find((c) => c.code === secCountryCode) || COUNTRY_CODES[0];
            const secPlaceholder = secCountry?.format
              ? `e.g. ${formatPlaceholder(secCountry.format)}`
              : 'e.g. 0700 000 000';
            return (
              <div
                key={idx}
                className="flex items-center gap-2 p-1.5 rounded bg-slate-50/90 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors font-sans"
              >
                {/* Contact Type Dropdown Component */}
                <div className="w-26 shrink-0">
                  <Dropdown
                    variant="dropdown"
                    size="sm"
                    options={SECONDARY_TYPE_OPTIONS}
                    value={sec.type || 'WhatsApp'}
                    onChange={(val) => handleUpdateSecondary(idx, 'type', val)}
                    isClearable={false}
                    className="w-full font-sans"
                  />
                </div>

                {/* Unified Country Code + Phone Number Input Box */}
                <div className="flex-1 min-w-0 flex items-center border border-slate-300 rounded bg-white focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500/20 transition-all h-8 font-sans">
                  <SecondaryCountryPicker
                    selectedCode={secCountryCode}
                    onSelect={(c) =>
                      handleUpdateSecondary(idx, { countryCode: c.code, dial: c.dial })
                    }
                  />
                  <input
                    type="tel"
                    value={sec.number || ''}
                    onChange={(e) => handleUpdateSecondary(idx, 'number', e.target.value)}
                    placeholder={secPlaceholder}
                    className="flex-1 min-w-0 px-1 text-xs bg-transparent text-slate-800 font-sans outline-none border-none focus:outline-none focus:ring-0 placeholder:text-slate-400 h-full"
                  />
                </div>

                {/* Remove Secondary Number Button (Cleanly Outside) */}
                <button
                  type="button"
                  onClick={() => handleRemoveSecondary(idx)}
                  className="text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  title="Remove number"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={handleAddSecondary}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800 hover:underline cursor-pointer transition-colors pt-0.5 font-sans"
          >
            <PlusIcon className="w-3.5 h-3.5 text-brand-600" />
            <span>Add alternative number (WhatsApp / Second Phone)</span>
          </button>
        </div>
      )}
    </div>
  );
}
