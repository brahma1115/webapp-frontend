const ALARM_LEVELS = {
  NORMAL: 'NORMAL',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
};

const COLORS = {
  NORMAL: '#28A745',
  WARNING: '#FFA500',
  CRITICAL: '#DC3545',
};

export const getStatus = (type, value) => {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return { level: ALARM_LEVELS.NORMAL, color: 'inherit', label: 'Unknown' };

  const t = type.toUpperCase();

  if (t === 'RR') {
    if (numValue >= 12 && numValue <= 20) return { level: ALARM_LEVELS.NORMAL, color: COLORS.NORMAL, label: 'Normal' };
    if ((numValue >= 10 && numValue < 12) || (numValue > 20 && numValue <= 24)) return { level: ALARM_LEVELS.WARNING, color: COLORS.WARNING, label: 'Warning' };
    return { level: ALARM_LEVELS.CRITICAL, color: COLORS.CRITICAL, label: 'Critical' };
  }

  if (t === 'FIO2') {
    if (numValue >= 30 && numValue <= 50) return { level: ALARM_LEVELS.NORMAL, color: COLORS.NORMAL, label: 'Normal' };
    if ((numValue >= 21 && numValue < 30) || (numValue > 50 && numValue <= 60)) return { level: ALARM_LEVELS.WARNING, color: COLORS.WARNING, label: 'Warning' };
    return { level: ALARM_LEVELS.CRITICAL, color: COLORS.CRITICAL, label: 'Critical' };
  }

  if (t === 'PIP' || t === 'PPEAK') {
    if (numValue >= 15 && numValue <= 25) return { level: ALARM_LEVELS.NORMAL, color: COLORS.NORMAL, label: 'Normal' };
    if (numValue > 25 && numValue <= 30) return { level: ALARM_LEVELS.WARNING, color: COLORS.WARNING, label: 'Warning' };
    return { level: ALARM_LEVELS.CRITICAL, color: COLORS.CRITICAL, label: 'Critical' };
  }

  if (t === 'PEEP') {
    if (numValue >= 5 && numValue <= 8) return { level: ALARM_LEVELS.NORMAL, color: COLORS.NORMAL, label: 'Normal' };
    if ((numValue >= 3 && numValue < 5) || (numValue > 8 && numValue <= 10)) return { level: ALARM_LEVELS.WARNING, color: COLORS.WARNING, label: 'Warning' };
    return { level: ALARM_LEVELS.CRITICAL, color: COLORS.CRITICAL, label: 'Critical' };
  }

  if (t === 'SPO2') {
    if (numValue >= 95 && numValue <= 100) return { level: ALARM_LEVELS.NORMAL, color: COLORS.NORMAL, label: 'Normal' };
    if (numValue >= 90 && numValue < 95) return { level: ALARM_LEVELS.WARNING, color: COLORS.WARNING, label: 'Warning' };
    return { level: ALARM_LEVELS.CRITICAL, color: COLORS.CRITICAL, label: 'Critical' };
  }

  if (t === 'HR' || t === 'HEART_RATE') {
    if (numValue >= 60 && numValue <= 100) return { level: ALARM_LEVELS.NORMAL, color: COLORS.NORMAL, label: 'Normal' };
    if ((numValue >= 50 && numValue < 60) || (numValue > 100 && numValue <= 120)) return { level: ALARM_LEVELS.WARNING, color: COLORS.WARNING, label: 'Warning' };
    return { level: ALARM_LEVELS.CRITICAL, color: COLORS.CRITICAL, label: 'Critical' };
  }

  return { level: ALARM_LEVELS.NORMAL, color: 'inherit', label: 'Normal' };
};
