export const AUTH_METHODS = Object.freeze([
  'oauth',
  'service-account',
  'signed-webhook',
  'customer-managed-api-key',
  'private-network-agent'
]);

export function createConnectorProfile({
  provider,
  authMethod,
  scopes = [],
  readOnly = true,
  destructiveActions = false
}) {
  if (!provider) throw new TypeError('provider is required');
  if (!AUTH_METHODS.includes(authMethod)) throw new TypeError(`Unsupported auth method: ${authMethod}`);
  if (destructiveActions && readOnly) throw new TypeError('A read-only connector cannot enable destructive actions');

  return Object.freeze({
    provider,
    authMethod,
    scopes: [...new Set(scopes)].sort(),
    readOnly,
    destructiveActions,
    authorizationRequired: true,
    fieldDiscovery: 'automatic-with-confidence-review'
  });
}
