/* beautify ignore:start */
export const <%= capitalizedSingular %>_SORT_OPTIONS = [{
    label: "<%= dasherizedSingular %>.list.actions.sort.options.id",
    value: "id",
  },
  {
    label: "<%= dasherizedSingular %>.list.actions.sort.options.createdAt",
    value: "createdAt",
  },
  {
    label: "<%= dasherizedSingular %>.list.actions.sort.options.updatedAt",
    value: "updatedAt",
  },
];

export const <%= capitalizedPlural %>_STATUS_OPTIONS = [
  {
    label: 'active',
    value: 'active',
  },
  {
    label: 'canceled',
    value: 'canceled',
  },
  {
    label: 'pending',
    value: 'pending',
  },
  {
    label: 'suspended',
    value: 'suspended',
  },
]

export const <%= capitalizedSingular %>_FILTER_ATTRS = [
  'status',
];

export const <%= capitalizedSingular %>_ACTIONS = [{
  title: "<%= dasherizedSingular %>.view.navTitle",
  route: "<%= routeNameSingular %>.index"
}, {
  title: "<%= dasherizedSingular %>.edit.navTitle",
  route: "<%= routeNameSingular %>.edit"
}, {
  title: "<%= dasherizedSingular %>.archive.navTitle",
  route: "<%= routeNameSingular %>.archive"
}, ];
/* beautify ignore:end */
