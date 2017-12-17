import { mount } from 'avoriaz';
import EditItemModal from '@/components/EditItemModal';

describe('EditItemModal', () => {
  it('should render correctly', () => {
    const component = mount(EditItemModal);
    const header = component.find('h2')[0];
    expect(header.text()).to.equal('Edit Item');
  });

  it('clicking the close modal button should trigger the closeModal method', () => {
    const component = mount(EditItemModal);
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });
});
