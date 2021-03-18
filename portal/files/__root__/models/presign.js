import Model, {
  attr
} from '@ember-data/model';

export default class PresignModel extends Model {
  @attr('string') resource;
  @attr('string') signature;
  @attr('string') signedResource;
}
