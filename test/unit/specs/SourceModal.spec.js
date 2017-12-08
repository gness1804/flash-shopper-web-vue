import { mount } from 'avoriaz';
import SourceModal from '@/components/SourceModal';

describe('SourceModal', () => {
  it('clicking the close modal button should trigger the closeModal method', () => {
    const component = mount(SourceModal);
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });
});
