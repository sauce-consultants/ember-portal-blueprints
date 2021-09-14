import { hbs } from 'ember-cli-htmlbars';

const colorOptions = [
  'white',
  'gray',
  'black',
  'primary',
  'accent',
  'success',
  'warning',
  'danger',
  'red',
];

export default {
  title: 'UI/Splash Notice',
  decorators: [],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the Splash',
      table: { defaultValue: { summary: null } },
    },
    icon: {
      control: 'text',
      description: 'The splash icon/svg path',
      table: { defaultValue: { summary: null } },
    },
    text: {
      control: 'text',
      description: 'Text of the Splash message',
      table: { defaultValue: { summary: null } },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The color of the splash',
      table: { defaultValue: { summary: 'gray' } },
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
    <Ui::SplashNotice 
      @loading={{this.loading}}
      @title={{this.title}}
      @text={{this.text}}
      @icon={{this.icon}} 
      @color={{this.color}} 
    />
  `,
  context: args,
});

export const WithIcon = Template.bind({});

WithIcon.args = {
  title: null,
  icon: 'document-search',
  text: null,
  color: 'gray',
  loading: false,
};

WithIcon.parameters = {
  layout: 'center',
};

export const WithTitle = Template.bind({});

WithTitle.args = {
  title: 'Somethings happened',
  icon: 'document-search',
  text: null,
  color: 'gray',
  loading: false,
};

WithTitle.parameters = {
  layout: 'center',
};

export const WithTitleAndText = Template.bind({});

WithTitleAndText.args = {
  title: 'Somethings happened',
  icon: 'document-search',
  text:
    'Condimentum libero arcu quisque potenti varius sed ad condimentum cubilia ullamcorper vestibulum aptent et in id id sed at.',
  color: 'gray',
  loading: false,
};

WithTitleAndText.parameters = {
  layout: 'center',
};
