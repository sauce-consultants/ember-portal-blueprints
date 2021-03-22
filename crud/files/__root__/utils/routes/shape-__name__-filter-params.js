import routesRemoveEmptyParams from '<%= appName %>/utils/routes/remove-empty-params';

export default function shape<%= classSingular %>FilterParams(params) {
  return routesRemoveEmptyParams(params);
}
