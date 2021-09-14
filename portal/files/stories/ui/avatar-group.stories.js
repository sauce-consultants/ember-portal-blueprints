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

const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'];

const styleOptions = ['circular', 'rounded'];

const users = [
  {
    src:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    initials: 'JW',
    alt: 'Jim Wardlaw',
    svg: 'cloud',
  },
  {
    src:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    initials: 'MW',
    alt: 'Matt Weldon',
    svg: 'star',
  },
  {
    src:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    initials: 'JP',
    alt: 'John Polling',
    svg: 'pencil',
  },
  {
    src:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    initials: 'MG',
    alt: 'Matt Gibson',
    svg: 'lightning-bolt',
  },
];

export default {
  title: 'UI/Avatar Group',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the direction the avatars are stacked',
      table: { defaultValue: { summary: false } },
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'The color of the button',
      table: { defaultValue: { summary: 'gray' } },
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'The size of the button',
      table: { defaultValue: { summary: 'md' } },
    },
    style: {
      control: 'select',
      options: styleOptions,
      description: 'The style of the button',
      table: { defaultValue: { summary: 'circular' } },
    },
  },
};

const TextTemplate = (args) => ({
  template: hbs`
    <Ui::AvatarGroup 
        @loading={{this.loading}}
        @reverse={{this.reverse}}
        @color={{this.color}}
        @size={{this.size}}
        @style={{this.style}}
    as |group|
    >
      {{#each this.users as |user|}}
        <group.Avatar @text={{user.initials}} @alt={{user.alt}} />
      {{/each}}
    </Ui::AvatarGroup>`,
  context: args,
});

export const Text = TextTemplate.bind({});

Text.args = {
  loading: false,
  reverse: false,
  users: users,
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Text.parameters = {
  layout: 'centered',
};

const IconTemplate = (args) => ({
  template: hbs`
    <Ui::AvatarGroup 
        @loading={{this.loading}}
        @reverse={{this.reverse}}
        @color={{this.color}}
        @size={{this.size}}
        @style={{this.style}}
    as |group|
    >
      {{#each this.users as |user|}}
        <group.Avatar @svg={{user.svg}} @alt={{user.alt}} />
      {{/each}}
    </Ui::AvatarGroup>`,
  context: args,
});

export const Icon = IconTemplate.bind({});

Icon.args = {
  loading: false,
  reverse: false,
  users: users,
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Icon.parameters = {
  layout: 'centered',
};

const ImageTemplate = (args) => ({
  template: hbs`
    <Ui::AvatarGroup 
        @loading={{this.loading}}
        @reverse={{this.reverse}}
        @color={{this.color}}
        @size={{this.size}}
        @style={{this.style}}
    as |group|
    >
      {{#each this.users as |user|}}
        <group.Avatar @src={{user.src}} @alt={{user.alt}} />
      {{/each}}
    </Ui::AvatarGroup>`,
  context: args,
});

export const Image = ImageTemplate.bind({});

Image.args = {
  loading: false,
  reverse: false,
  users: users,
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Image.parameters = {
  layout: 'centered',
};

/*
export const Icon = Template.bind({});

Icon.args = {
  loading: false,
  users: users,
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Icon.parameters = {
  layout: 'centered',
};

export const Text = Template.bind({});

Text.args = {
  loading: false,
  users: users,
  size: 'md',
  color: 'primary',
  style: 'circular',
};

Text.parameters = {
  layout: 'centered',
};
*/
