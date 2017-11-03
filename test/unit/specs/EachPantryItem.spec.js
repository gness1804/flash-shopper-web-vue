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

  it('should trigger the transferItemToMainList method when the add item button is clicked', () => {
    const component = mount(EachPantryItem, { propsData });
    const transferItemToMainList = sinon.stub();
    component.setMethods({ transferItemToMainList });
    const button = component.find('.add-item-to-main-list-button')[0];
    button.trigger('click');
    expect(transferItemToMainList.calledOnce).to.equal(true);
  });

  it('should trigger the deleteItem method when the delete item button is clicked', () => {
    const component = mount(EachPantryItem, { propsData });
    const deleteItem = sinon.stub();
    component.setMethods({ deleteItem });
    const button = component.find('.delete-item-button')[0];
    button.trigger('click');
    expect(deleteItem.calledOnce).to.equal(true);
  });
});