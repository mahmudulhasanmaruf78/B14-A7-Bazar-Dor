/**
 * Bengali numeral and string conversion utilities
 */

const banglaDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const englishDigits: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts English digits and numbers into formatted Bengali digits
 * E.g. 1850 -> "১,৮৫০", 2.1 -> "২.১"
 */
export function toBanglaNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null || value === '') return '০';

  // Format with commas if number
  let str: string;
  if (typeof value === 'number') {
    str = value.toLocaleString('en-IN');
  } else {
    str = String(value);
  }

  return str.replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
}

/**
 * Parses Bengali digits back to a JavaScript number for accurate sorting
 */
export function fromBanglaNumber(value: string | number): number {
  if (typeof value === 'number') return value;
  const converted = value.replace(/[০-৯]/g, (digit) => englishDigits[digit] || digit);
  const cleaned = converted.replace(/[^0-9.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Formats a unit into a Bengali unit label
 */
export function formatUnit(unit: string | undefined | null): string {
  if (!unit) return 'প্রতি একক';
  const u = unit.toLowerCase().trim();
  if (u === 'kg' || u === 'কেজি') return 'প্রতি কেজি';
  if (u === 'liter' || u === 'litre' || u === 'লিটার') return 'প্রতি লিটার';
  if (u === 'dozen' || u === 'ডজন') return 'প্রতি ডজন';
  if (u === 'piece' || u === 'pc' || u === 'পিস' || u === 'হালি') return 'প্রতি পিস';
  return `প্রতি ${unit}`;
}

/**
 * Returns the current date in Bengali
 * e.g., "রবিবার, ১১ অক্টোবর ২০২৬"
 */
export function getBanglaDate(date = new Date()): string {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const dayName = days[date.getDay()];
  const day = toBanglaNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBanglaNumber(date.getFullYear());

  return `${dayName}, ${day} ${month} ${year}`;
}
