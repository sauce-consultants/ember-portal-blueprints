import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Text',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    size: {
      control: 'select',
      options: [
        'xs',
        'sm',
        'base',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
      description: 'The size of the text',
      table: { defaultValue: { summary: 'gray' } },
    },
    text: {
      control: 'text',
      description:
        'The skeleton text (this will be hidden and define the width)',
      table: { defaultValue: { summary: null } },
    },
    skeletonColor: {
      control: 'text',
      description:
        'Use to add bg color classes you want a custom skeleton color e.g. "bg-red-200 dark:bg-red-800"',
      table: { defaultValue: { summary: null } },
    },
  },
};

const Template = (args) => ({
  template: hbs`<Ui::Text @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text>`,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  text: 'Amazing Text',
  size: 'base',
};

Default.parameters = {
  layout: 'centered',
};

export const CustomLoadingColor = Template.bind({});

CustomLoadingColor.args = {
  loading: false,
  text: 'Amazing Text',
  size: 'base',
  skeletonColor: 'bg-primary-200 dark:bg-primary-800',
};

CustomLoadingColor.parameters = {
  layout: 'centered',
};

const PTemplate = (args) => ({
  template: hbs`<Ui::Text::P @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::P>`,
  context: args,
});

export const Paragraph = PTemplate.bind({});

Paragraph.args = {
  loading: false,
  text:
    'Elementum fames mauris aptent commodo consectetur ut ad auctor accumsan phasellus pulvinar dolor lacinia suspendisse ridiculus rhoncus.Sit cursus suspendisse dui nibh augue cras habitant scelerisque erat.',
  size: 'base',
};

Paragraph.parameters = {
  layout: 'centered',
};

const H1Template = (args) => ({
  template: hbs`<Ui::Text::H1 @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::H1>`,
  context: args,
});

export const Heading1 = H1Template.bind({});

Heading1.args = {
  loading: false,
  text: 'Heading Level One',
  size: '3xl',
};

Heading1.parameters = {
  layout: 'centered',
};

const H2Template = (args) => ({
  template: hbs`<Ui::Text::H2 @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::H2>`,
  context: args,
});

export const Heading2 = H2Template.bind({});

Heading2.args = {
  loading: false,
  text: 'Heading Level Two',
  size: '2xl',
};

Heading2.parameters = {
  layout: 'centered',
};

const H3Template = (args) => ({
  template: hbs`<Ui::Text::H3 @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::H3>`,
  context: args,
});

export const Heading3 = H3Template.bind({});

Heading3.args = {
  loading: false,
  text: 'Heading Level Three',
  size: 'xl',
};

Heading3.parameters = {
  layout: 'centered',
};

const H4Template = (args) => ({
  template: hbs`<Ui::Text::H4 @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::H4>`,
  context: args,
});

export const Heading4 = H4Template.bind({});

Heading4.args = {
  loading: false,
  text: 'Heading Level Four',
  size: 'lg',
};

Heading4.parameters = {
  layout: 'centered',
};

const H5Template = (args) => ({
  template: hbs`<Ui::Text::H5 @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::H5>`,
  context: args,
});

export const Heading5 = H5Template.bind({});

Heading5.args = {
  loading: false,
  text: 'Heading Level Five',
  size: 'base',
};

Heading5.parameters = {
  layout: 'centered',
};

const H6Template = (args) => ({
  template: hbs`<Ui::Text::H6 @size={{this.size}} @loading={{this.loading}} @skeletonColor={{this.skeletonColor}}>{{this.text}}</Ui::Text::H6>`,
  context: args,
});

export const Heading6 = H6Template.bind({});

Heading6.args = {
  loading: false,
  text: 'Heading Level Six',
  size: 'sm',
};

Heading6.parameters = {
  layout: 'centered',
};
