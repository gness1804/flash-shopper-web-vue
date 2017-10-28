import { mount } from 'avoriaz';
import EachPantryItem from '@/components/EachPantryItem';
import item from '../helpers/FakeItem';

describe('EachPantryItem', () => {
  const propsData = {
    item,
  };

  it('should render the correct contents', () => {
    const component = mount(EachPantryItem, { propsData });
    const name = component.find('.pantry-item-name')[0];
    expect(name.text()).to.equal('Foo bread');
  });
});
