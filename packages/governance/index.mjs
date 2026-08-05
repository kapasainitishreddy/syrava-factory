export const GOVERNANCE_LEVELS = Object.freeze({
  STANDARD: 'standard',
  CONTROLLED: 'controlled',
  HIGH: 'high-governance'
});

export function resolveExecutionBoundary({ risk, requestedAutonomy }) {
  if (!Object.values(GOVERNANCE_LEVELS).includes(risk)) {
    throw new TypeError(`Unknown risk level: ${risk}`);
  }

  if (!['advisory', 'human-approval', 'bounded-automation'].includes(requestedAutonomy)) {
    throw new TypeError(`Unknown autonomy mode: ${requestedAutonomy}`);
  }

  if (risk === GOVERNANCE_LEVELS.HIGH) {
    return {
      autonomy: 'human-approval',
      finalDecision: 'qualified-human',
      externalActions: 'approval-required',
      reason: 'High-governance assets fail closed and cannot make consequential final decisions.'
    };
  }

  if (risk === GOVERNANCE_LEVELS.CONTROLLED && requestedAutonomy === 'bounded-automation') {
    return {
      autonomy: 'human-approval',
      finalDecision: 'human',
      externalActions: 'approval-required',
      reason: 'Controlled assets require approval until a customer policy explicitly allows a bounded action.'
    };
  }

  return {
    autonomy: requestedAutonomy,
    finalDecision: requestedAutonomy === 'advisory' ? 'human' : 'policy-bounded',
    externalActions: requestedAutonomy === 'bounded-automation' ? 'policy-bounded' : 'approval-required',
    reason: 'Execution remains inside the configured customer policy.'
  };
}
