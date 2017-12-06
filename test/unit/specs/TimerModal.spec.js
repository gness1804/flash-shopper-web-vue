import { mount } from 'avoriaz';
import TimerModal from '@/components/TimerModal';

describe('TimerModal', () => {
  it('clicking the close modal button should trigger the closeModal method', () => {
    const component = mount(TimerModal);
    const closeModal = sinon.stub();
    component.setMethods({ closeModal });
    const button = component.find('.close-modal-button')[0];
    button.trigger('click');
    expect(closeModal.calledOnce).to.equal(true);
  });
});
