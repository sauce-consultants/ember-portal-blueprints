import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Pagination',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    size: {
      control: 'number',
      description: 'The number of records per page',
      table: { defaultValue: { summary: false } },
    },
    page: {
      control: 'number',
      description: 'The current page number',
      table: { defaultValue: { summary: 'top' } },
    },
    total: {
      control: 'number',
      description: 'The total resources available',
      table: { defaultValue: { summary: 'gray' } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <Ui::Pagination
    @size={{this.size}}
    @page={{this.page}}
    @total={{this.total}} 
    @loading={{this.loading}}
  />`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  size: 20,
  page: 3,
  total: 142,
  loading: false,
};

Default.parameters = {
  layout: 'padded',
};
