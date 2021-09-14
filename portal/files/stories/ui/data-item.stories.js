import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'UI/Data Items',
  decorators: [],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle the skeleton placeholder state',
      table: { defaultValue: { summary: false } },
    },
    label: {
      control: 'text',
      description: 'Label text for the item',
      table: { defaultValue: { summary: null } },
    },
    value: {
      control: 'text',
      description: 'Value text for the item',
      table: { defaultValue: { summary: null } },
    },
    tip: {
      control: 'text',
      description: 'Tip text for the item',
      table: { defaultValue: { summary: null } },
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <Ui::Data @loading={{this.loading}} as |data|>
    <data.Item @name="my-data-item"
      @label={{this.label}}
      @value={{this.value}}
      @tip={{this.tip}}/>
  </Ui::Data>
  `,
  context: args,
});

export const Default = Template.bind({});

Default.args = {
  loading: false,
  label: 'Data Label',
  value: 'This is the value',
  tip: 'A elit torquent ut torquent nam ullamcorper.',
};

Default.parameters = {
  layout: 'padded',
};

export const EmptyItem = Template.bind({});

EmptyItem.args = {
  loading: false,
  label: 'Data Label',
  tip: 'A elit torquent ut torquent nam ullamcorper.',
  value: null,
};

EmptyItem.parameters = {
  layout: 'padded',
};

const CardTemplate = (args) => ({
  template: hbs`
  <Ui::Card as |card|>
    <card.Body>
      <Ui::Data class="-mx-2" @loading={{this.loading}} as |data|>
        <data.Item
          @label="Item One"
          @value="Scelerisque commodo"
          @tip="Non suspendisse lacus a tristique posuere." />
        <data.Item
          @label="Item Two"
          @value="A placerat"
          @tip="Dapibus lectus massa nam imperdiet facilisis duis curabitur." />
        <data.Item
          @label="Item Three (Yield Value)"
          @tip="Vestibulum fringilla consectetur fames volutpat ut.Ullamcorper molestie curae.">

            <div class="space-y-4">
              <Ui::Text::P @loading={{this.loading}}>
                Mus torquent adipiscing condimentum purus ultrices a proin urna nibh hac a ullamcorper euismod a curae. Vel scelerisque ullamcorper tellus in montes ut eu potenti suspendisse amet hendrerit a suspendisse egestas. Diam cras a nec scelerisque magnis aliquam taciti nostra turpis ullamcorper quis suspendisse a proin hendrerit placerat a ullamcorper consectetur proin lorem commodo odio commodo. Parturient tellus elit scelerisque duis vivamus dis urna proin leo vestibulum pulvinar suspendisse risus morbi mus scelerisque suspendisse nec arcu odio orci egestas adipiscing nec facilisis lectus egestas. 
              </Ui::Text::P>
              <Ui::Text::P @loading={{this.loading}}>
                Aenean quam ipsum parturient justo a justo per a vulputate mollis nostra lacus blandit parturient feugiat fusce egestas malesuada dictum. A imperdiet sodales in nulla potenti fames cubilia nec placerat scelerisque tincidunt duis ullamcorper platea sociosqu elementum per a malesuada a a nam scelerisque a nostra ac libero. Scelerisque per a cursus quam viverra nulla adipiscing imperdiet elit ullamcorper semper duis lacinia rutrum odio vestibulum suscipit a risus vestibulum risus ad. Sem a diam lobortis ullamcorper fames a vestibulum ac duis eleifend laoreet id vestibulum sit leo lorem enim velit magnis egestas parturient scelerisque faucibus malesuada sit. Ullamcorper parturient a suspendisse semper a cubilia nisl scelerisque accumsan condimentum est ridiculus parturient vel metus praesent ullamcorper conubia magnis adipiscing adipiscing.
              </Ui::Text::P>
            </div>

        </data.Item>
      </Ui::Data>
    </card.Body>
  </Ui::Card>
  `,
  context: args,
});

export const Card = CardTemplate.bind({});

Card.args = {
  loading: false,
};

Card.parameters = {
  layout: 'padded',
};
