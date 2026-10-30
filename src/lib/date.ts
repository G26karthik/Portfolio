/** "29 October 2026", always in UTC so a build in any timezone prints the same day. */
export const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
