// Convert distance to dB value
export function convertDistanceTodB(
  value: number,
  dBMinValue: number = 0,
  dBMaxValue: number = 120,
): number {
  const mappedValue =
    dBMinValue + (dBMaxValue - dBMinValue) * (1 - (value - minValue) / (maxValue - minValue))
  return mappedValue
}

// Color transition calculations based on distance
const minValue = 0
const maxValue = 2
const colorMaxValue = 255

function convertDistanceToColor(value: number, colorMinValue: number): number {
  return (
    colorMinValue + ((value - minValue) * (colorMaxValue - colorMinValue)) / (maxValue - minValue)
  )
}

export function convertDistanceToColorR(value: number): number {
  return convertDistanceToColor(value, 179)
}

export function convertDistanceToColorG(value: number): number {
  return convertDistanceToColor(value, 25)
}

export function convertDistanceToColorB(value: number): number {
  return convertDistanceToColor(value, 146)
}
