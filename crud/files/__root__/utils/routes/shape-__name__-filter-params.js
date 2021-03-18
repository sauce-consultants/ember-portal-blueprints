/* beautify ignore:start */
import routesRemoveEmptyParams from '<%= appName %>/utils/routes/remove-empty-params';

export default function shape<%= sUpper %>FilterParams(params) {
  return routesRemoveEmptyParams(params);
}
/* beautify ignore:end */