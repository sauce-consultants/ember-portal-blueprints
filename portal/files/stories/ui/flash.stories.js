import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Flash',
  decorators: [],
  argTypes: {
    message: {
      control: 'text',
      description: 'Icon svg path for the button',
      table: { defaultValue: { summary: null } },
    },
    type: {
      control: 'select',
      options: ['success', 'warning', 'alert', 'info'],
      description: 'The type of flash message',
      table: { defaultValue: { summary: 'info' } },
    },
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
      <Ui::Flash @loading={{this.loading}} @flash={{hash type=this.type message=this.message}} />
    `,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  message:
    'Inceptos mi himenaeos nec id convallis dui eros rutrum aliquam euismod cubilia.',
  type: 'info',
  loading: false,
};

Default.parameters = {
  layout: 'padded',
};
