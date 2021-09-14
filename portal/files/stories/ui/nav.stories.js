import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Nav',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
  },
};

const projects = [
    { label: 'Website redesign' },
    { label: 'GraphQL API' },
    { label: 'Customer migration guides' },
    { label: 'Profit sharing program' },
  ],
  navItems = [
    { label: 'Dashboard', icon: 'home', badge: '5' },
    { label: 'Team', icon: 'users', badge: null },
    { label: 'Projects', icon: 'folder', badge: '19', children: projects },
    { label: 'Calendar', icon: 'calendar', badge: '20+' },
    { label: 'Documents', icon: 'inbox', badge: null },
    { label: 'Reports', icon: 'chart-bar', badge: null },
  ];

const DefaultTemplate = (args) => ({
  template: hbs`
    <Ui::Nav @loading={{this.loading}} as |nav|>
      {{#each this.items as |item|}}
        <nav.Item>{{item.label}}</nav.Item>
      {{/each}}
    </Ui::Nav>
    `,
  context: args,
});

export const Default = DefaultTemplate.bind({});

Default.args = {
  loading: false,
  items: navItems,
};

Default.parameters = {
  layout: 'padded',
};

const WithIconsTemplate = (args) => ({
  template: hbs`
    <Ui::Nav @loading={{this.loading}} as |nav|>
      {{#each this.items as |item|}}
        <nav.Item @icon={{item.icon}}>{{item.label}}</nav.Item>
      {{/each}}
    </Ui::Nav>
    `,
  context: args,
});

export const WithIcons = WithIconsTemplate.bind({});

WithIcons.args = {
  loading: false,
  items: navItems,
};

WithIcons.parameters = {
  layout: 'padded',
};

const WithBadgesTemplate = (args) => ({
  template: hbs`
    <Ui::Nav @loading={{this.loading}} as |nav|>
      {{#each this.items as |item|}}
        <nav.Item @icon={{item.icon}} @badge={{item.badge}}>{{item.label}}</nav.Item>
      {{/each}}
    </Ui::Nav>
    `,
  context: args,
});

export const WithBadges = WithBadgesTemplate.bind({});

WithBadges.args = {
  loading: false,
  items: navItems,
};

WithBadges.parameters = {
  layout: 'padded',
};

const WithSubtitleTemplate = (args) => ({
  template: hbs`
    <Ui::Nav @loading={{this.loading}} as |nav|>

      {{#each this.items as |item|}}
        <nav.Item @icon={{item.icon}} @badge={{item.badge}}>{{item.label}}</nav.Item>
      {{/each}}
      
      <nav.Subtitle>Projects</nav.Subtitle>

      {{#each this.projects as |projects|}}
        <nav.Item>{{projects.label}}</nav.Item>
      {{/each}}

    </Ui::Nav>
    `,
  context: args,
});

export const WithSubtitle = WithSubtitleTemplate.bind({});

WithSubtitle.args = {
  loading: false,
  items: navItems,
  projects: projects,
};

WithSubtitle.parameters = {
  layout: 'padded',
};

const WithSubmenuTemplate = (args) => ({
  template: hbs`
    <Ui::Nav @loading={{this.loading}} as |nav|>

      {{#each this.items as |item|}}
        {{#if item.children}}

          <nav.Group 
            @title={{item.label}} 
            @icon={{item.icon}} 
          as |group|>
            {{#each item.children as |child|}}
              <group.Item 
                @icon={{child.icon}} 
                @badge={{child.badge}}
              >{{child.label}}</group.Item>
            {{/each}}
          </nav.Group>

        {{else}}
          <nav.Item @icon={{item.icon}} @badge={{item.badge}}>{{item.label}}</nav.Item>
        {{/if}}
      {{/each}}
      
      <nav.Subtitle>Projects</nav.Subtitle>

      {{#each this.projects as |projects|}}
        <nav.Item>{{projects.label}}</nav.Item>
      {{/each}}

    </Ui::Nav>
    `,
  context: args,
});

export const WithSubMenu = WithSubmenuTemplate.bind({});

WithSubMenu.args = {
  loading: false,
  items: navItems,
  projects: projects,
};

WithSubMenu.parameters = {
  layout: 'padded',
};
