export interface PasswordRule {
  id: string
  label: string
  test: (pw: string) => boolean
}

export const PASSWORD_RULES: PasswordRule[] = [
  { id: 'len', label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { id: 'upper', label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { id: 'num', label: 'One number', test: (p) => /\d/.test(p) },
  { id: 'special', label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

export function validatePassword(pw: string): boolean {
  return PASSWORD_RULES.every((r) => r.test(pw))
}

export function getPasswordStrength(pw: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
  if (!pw) return { score: 0, label: '' }
  const met = PASSWORD_RULES.filter((r) => r.test(pw)).length
  let score: 1 | 2 | 3 | 4
  if (met <= 2) score = 1
  else if (met === 3) score = 2
  else if (met === 4) score = 3
  else score = pw.length >= 12 ? 4 : 3
  return { score, label: ['', 'Weak', 'Fair', 'Good', 'Strong'][score]! }
}
