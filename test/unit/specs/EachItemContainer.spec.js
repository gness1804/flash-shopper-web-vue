import { mount } from 'avoriaz';
import EachItemContainer from '@/components/EachItemContainer';
import item from '../helpers/FakeItem';

describe('EachItemContainer.vue', () => {
  const propsData = {
    item,
    itemsRef: {
      child: () => { },
    },
  };

  it('should render correct contents', () => {
    const component = mount(EachItemContainer, { propsData });
    const el = component.find('.each-item-name')[0];
    expect(el.text().trim()).to.equal('Foo bread');
    const el2 = component.find('.each-item-aisle')[0];
    expect(el2.text().trim()).to.equal('Aisle:\n    \n    10');
    const el3 = component.find('.each-item-note')[0];
    expect(el3.text().trim()).to.equal('Note:\n    \n    Please do not get stale bread');
    const el4 = component.find('.each-item-quantity')[0];
    expect(el4.text().trim()).to.equal('Quantity:\n    \n    2 loaves');
  });

  it('should not display the inCart styling by default', () => {
    // the fakeItem component has inCart of false by default
    const component = mount(EachItemContainer, { propsData });
    const el = component.find('.each-item-name');
    expect(el.length).to.equal(1);
    const el2 = component.find('.each-item-name.strike');
    expect(el2.length).to.equal(0);
  });

  it('should call the removeItem method when user clicks the remove item button', () => {
    const component = mount(EachItemContainer, { propsData });
    const removeItem = sinon.stub();
    component.setMethods({ removeItem });
    const button = component.find('.remove-item-button')[0];
    button.trigger('click');
    expect(removeItem.calledOnce).to.equal(true);
  });

  it('should call the toggleInCart method when user clicks the toggle in cart button', () => {
    const component = mount(EachItemContainer, { propsData });
    const toggleInCart = sinon.stub();
    component.setMethods({ toggleInCart });
    const button = component.find('.toggle-in-cart-button')[0];
    button.trigger('click');
    expect(toggleInCart.calledOnce).to.equal(true);
  });

  it.skip('should call the AddToAPN method when user clicks the add to Amazon Prime Now button', () => {
    const component = mount(EachItemContainer, { propsData });
    const addToAPN = sinon.stub();
    component.setMethods({ addToAPN });
    const button = component.find('.add-to-apn-button')[0];
    button.trigger('click');
    expect(addToAPN.calledOnce).to.equal(true);
  });

  it('should call the addToInstacart method when user clicks the add to Instacart button', () => {
    const component = mount(EachItemContainer, { propsData });
    const addToInstacart = sinon.stub();
    component.setMethods({ addToInstacart });
    const button = component.find('.add-to-instacart-button')[0];
    button.trigger('click');
    expect(addToInstacart.calledOnce).to.equal(true);
  });

  it('should call the addToHEB method when user clicks the add to HEB button', () => {
    const component = mount(EachItemContainer, { propsData });
    const addToHEB = sinon.stub();
    component.setMethods({ addToHEB });
    const button = component.find('.add-to-heb-button')[0];
    button.trigger('click');
    expect(addToHEB.calledOnce).to.equal(true);
  });

  it('should apply the strike styling when the item is in the cart', () => {
    const otherFakeItem = {
      id: '2',
      name: 'Frozen waffles',
      aisle: 'Frozen',
      note: '',
      quantity: '2 boxes',
      inCart: true,
    };
    const propsData2 = {
      item: otherFakeItem,
      itemsRef: {
        child: () => { },
      },
    };
    const component = mount(EachItemContainer, { propsData: propsData2 });
    const el = component.find('.each-item-name.strike');
    expect(el.length).to.equal(1);
  });
});
