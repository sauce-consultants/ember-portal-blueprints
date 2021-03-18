/* beautify ignore:start */
export const <%= config %>_SORT_OPTIONS = [{
    label: "<%= translations %>.list.actions.sort.options.id",
    value: "id",
  },
  {
    label: "<%= translations %>.list.actions.sort.options.createdAt",
    value: "createdAt",
  },
  {
    label: "<%= translations %>.list.actions.sort.options.updatedAt",
    value: "updatedAt",
  },
];

export const <%= config %>_STATUS_OPTIONS = [
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

export const <%= config %>_FILTER_ATTRS = [
  'status',
];

export const <%= config %>_ACTIONS = [{
  title: "<%= translations %>.view.navTitle",
  route: "<%= sRoute %>.index"
}, {
  title: "<%= translations %>.edit.navTitle",
  route: "<%= sRoute %>.edit"
}, {
  title: "<%= translations %>.archive.navTitle",
  route: "<%= sRoute %>.archive"
}, ];
/* beautify ignore:end */
