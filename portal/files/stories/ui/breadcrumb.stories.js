import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Breadcrumbs',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <Ui::Breadcrumbs @loading={{this.loading}} as |crumb|>
    <crumb.Item>Home</crumb.Item>
    <crumb.Item>User</crumb.Item>
    <crumb.Item @isLast={{true}}>Barry Breadcrumb</crumb.Item>
  </Ui::Breadcrumbs>
  `,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
};

Default.parameters = {
  // layout: 'padded',
};
