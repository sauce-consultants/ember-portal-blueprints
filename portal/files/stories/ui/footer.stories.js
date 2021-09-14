import {hbs} from 'ember-cli-htmlbars';

export default {
  title: 'UI/Footer',
  decorators: [],
};

export const Default = () => ({
  template: hbs`
    <div class="w-full space-y-2">
      <Ui::Footer />
    </div>
    `,
});
