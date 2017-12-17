import Vue from 'vue';
import { mount } from 'avoriaz';
import AuthedMain from '@/components/AuthedMain';
import items from '../helpers/FakeItemsArray';

describe('AuthedMain.vue', () => {
  const Constructor = Vue.extend(AuthedMain);
  const propsData = {
    items,
    itemsRef: {
      child: () => {},
    },
  };

  it('should render correct contents', () => {
    const vm = new Constructor({ propsData }).$mount();
    expect(vm.$el.querySelector('.authed-main .headline').textContent)
      .to.equal('Enter New Item:');
    expect(vm.$el.querySelector('.authed-main .items-length').textContent)
      .to.equal('3');
    expect(vm.$el.querySelector('.authed-main .items-in-cart-count').textContent)
      .to.equal('1');
  });

  it('should render the correct content from buttonStrings', () => {
    const component = mount(AuthedMain, { propsData });
    const addItemText = component.find('.add-item-button')[0];
    const deleteAllItemsText = component.find('.delete-all-items-button')[0];
    const deleteAllInCartText = component.find('.delete-all-items-in-cart-button')[0];
    expect(addItemText.text().trim()).to.equal('Add Item');
    expect(deleteAllItemsText.text().trim()).to.equal('Delete ALL Items');
    expect(deleteAllInCartText.text().trim()).to.equal('Delete ALL in Cart');
  });

  it('renders correct number of items', () => {
    const component = mount(AuthedMain, { propsData });
    const el = component.find('.authed-main .each-item-container');
    expect(el.length).to.equal(3);
  });

  it('should render error message if add item is clicked and the name field is empty', () => {
    const component = mount(AuthedMain, { propsData });
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    const button = component.find('.add-item-button')[0];
    button.trigger('click');
    expect(triggerErrorState.calledOnce).to.equal(true);
  });

  it('should trigger the add item method if user clicks on the add item button', () => {
    const component = mount(AuthedMain, { propsData });
    const addItem = sinon.stub();
    component.setMethods({ addItem });
    const button = component.find('.add-item-button')[0];
    button.trigger('click');
    expect(addItem.calledOnce).to.equal(true);
  });

  it('should trigger the delete all items method if user clicks on the delete all items button', () => {
    const component = mount(AuthedMain, { propsData });
    const deleteAllItems = sinon.stub();
    component.setMethods({ deleteAllItems });
    const button = component.find('.delete-all-items-button')[0];
    button.trigger('click');
    expect(deleteAllItems.calledOnce).to.equal(true);
  });

  it('should trigger the delete all items in cart method if user clicks on the delete all items in cart button', () => {
    const component = mount(AuthedMain, { propsData });
    const deleteAllInCart = sinon.stub();
    component.setMethods({ deleteAllInCart });
    const button = component.find('.delete-all-items-in-cart-button')[0];
    button.trigger('click');
    expect(deleteAllInCart.calledOnce).to.equal(true);
  });
});
