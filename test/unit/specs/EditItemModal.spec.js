import { mount } from 'avoriaz';
import EditItemModal from '@/components/EditItemModal';
import item from '../helpers/FakeItem';
import display from '../../../src/helpers/displayVars';

describe('EditItemModal', () => {
  const propsData = {
    item,
    itemsRef: {
      child: () => {},
    },
  };

  it('should render correctly', () => {
    const component = mount(EditItemModal, { propsData });
    const header = component.find('h2')[0];
    expect(header.text()).to.equal('Edit Item');
  });

  it('should contain the correct item data', () => {
    const component = mount(EditItemModal, { propsData });
    expect(component.data().name).to.equal('Foo bread');
    expect(component.data().aisle).to.equal('10');
    expect(component.data().note).to.equal('Please do not get stale bread');
    expect(component.data().quantity).to.equal('2 loaves');
  });

  it('should properly assign this.targetItem on mount', () => {
    const component = mount(EditItemModal, { propsData });
    setTimeout(() => {
      expect(component.data().targetItem).to.equal('1');
    }, display.timerStandard);
  });

  it('clicking the close modal button should trigger the closeModal method', () => {
    const component = mount(EditItemModal, { propsData });
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });

  it('clicking the save item button should trigger the saveItem method', () => {
    const component = mount(EditItemModal, { propsData });
    const saveItem = sinon.stub();
    component.setMethods({ saveItem });
    const button = component.find('.save-item-button')[0];
    button.trigger('click');
    expect(saveItem.calledOnce).to.equal(true);
  });

  it('clicking the save item button should trigger an error if there is not valid name', () => {
    const component = mount(EditItemModal, { propsData });
    const triggerErrorState = sinon.stub();
    component.setMethods({ triggerErrorState });
    component.setData({ name: '' });
    const button = component.find('.save-item-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(triggerErrorState, 'Oops! Your item must have at least a name.');
  });

  it('clicking the save item button should call the update method if there is a valid name', () => {
    const component = mount(EditItemModal, { propsData });
    const triggerErrorState = sinon.stub();
    const closeModal = sinon.stub();
    component.setMethods({ triggerErrorState });
    component.setMethods({ closeModal });
    component.setData({ targetItem: {
      update: sinon.spy(),
    } });
    const button = component.find('.save-item-button')[0];
    button.trigger('click');
    sinon.assert.notCalled(triggerErrorState);
    sinon.assert.calledOnce(component.data().targetItem.update);
    sinon.assert.calledWith(closeModal, 'saved');
  });
});
