import { Transform } from 'class-transformer';

export const ToBoolean = () => {
  return Transform(({ value }) => {
    return valueToBoolean(value);
  });
};

const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
    return true;
  }
  if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
    return false;
  }
  return undefined;
};
