import Vue from 'vue';
import { mount } from 'avoriaz';
import AuthedMain from '@/components/AuthedMain';
import items from '../helpers/FakeItemsArray';
import pantryItems from '../helpers/FakePantryShortItems';
import display from '../../../src/helpers/displayVars';

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
    const completeAllInCartText = component.find('.complete-all-items-in-cart-button')[0];
    expect(addItemText.text().trim()).to.equal('Add Item');
    expect(deleteAllItemsText.text().trim()).to.equal('Delete ALL Items');
    expect(completeAllInCartText.text().trim()).to.equal('Complete ALL in Cart');
  });

  it('should fire the detectBrowser method and assign this.names properly on mount', () => {
    const component = mount(AuthedMain, { propsData });
    const detectBrowser = sinon.stub();
    component.setMethods({ detectBrowser });
    component.setData({ pantryShortItems: pantryItems });
    setTimeout(() => {
      expect(detectBrowser.calledOnce).to.equal(true);
      expect(component.data().names).to.equal(['Bread', 'Sausage', 'Milk', 'Frozen onions']);
    }, display.timerStandard);
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

  it('The search HEB name button should trigger the addToHEB method.', () => {
    const component = mount(AuthedMain, { propsData });
    const addToHEB = sinon.stub();
    component.setMethods({ addToHEB });
    component.setData({ name: 'apples' });
    const button = component.find('.search-heb-button')[0];
    button.trigger('click');
    sinon.assert.calledOnce(addToHEB);
    addToHEB.resetHistory();
  });

  it('should trigger the complete all items in cart method if user clicks on the complete all items in cart button', () => {
    const component = mount(AuthedMain, { propsData });
    const completeAllInCart = sinon.stub();
    component.setMethods({ completeAllInCart });
    const button = component.find('.complete-all-items-in-cart-button')[0];
    button.trigger('click');
    expect(completeAllInCart.calledOnce).to.equal(true);
  });

  it.skip('should render the safari dropdown if the browser is safari', () => {
    const component = mount(AuthedMain, { propsData });
    component.setData({ isSafari: true });
    component.setData({ names: ['Bread', 'Milk', 'Cheese'] });
    expect(component.contains('.safari-dropdown')).to.equal(true);
    const el = component.find('.safari-dropdown-item')[0];
    expect(el.text().trim()).to.equal('Bread');
  });
});
