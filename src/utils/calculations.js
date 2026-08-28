const DAMAGE_MULTIPLIERS = {
  water: 1.0,
  fire: 1.3,
  mold: 1.5,
  smoke: 1.2,
  storm: 1.1,
  biohazard: 2.0,
}

const COMPLEXITY_MULTIPLIERS = {
  mild: 0.8,
  moderate: 1.0,
  severe: 1.5,
}

const ADDITIONAL_SERVICES = {
  demolition: 2500,
  disposal: 1500,
  mold: 3000,
  odor: 800,
  dehumidify: 1200,
  carpet: 2000,
}

export function calculateEstimate(data) {
  const {
    damageType,
    squareFeet,
    complexity,
    services,
    laborRate = 65,
  } = data

  const damageMultiplier = DAMAGE_MULTIPLIERS[damageType] || 1
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[complexity] || 1

  const baseHours = (squareFeet / 1000) * 3
  const adjustedHours = baseHours * damageMultiplier * complexityMultiplier
  const labor = Math.round(adjustedHours * laborRate)

  const materials = Math.round(squareFeet * 2.5 * damageMultiplier * complexityMultiplier)

  const additionalServices = services.reduce((sum, serviceId) => {
    return sum + (ADDITIONAL_SERVICES[serviceId] || 0)
  }, 0)

  const subtotalWithoutOverhead = labor + materials + additionalServices
  const overhead = Math.round(subtotalWithoutOverhead * 0.15)

  const subtotal = labor + materials + additionalServices + overhead
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + tax

  return {
    labor,
    materials,
    additionalServices,
    overhead,
    subtotal,
    tax,
    total,
  }
}