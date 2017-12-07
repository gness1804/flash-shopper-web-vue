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

  it('clicking the start stopwatch button should trigger the startStopwatch method', () => {
    const component = mount(TimerModal);
    const startStopwatch = sinon.stub();
    component.setMethods({ startStopwatch });
    const button = component.find('.stopwatch-icon')[0];
    button.trigger('click');
    expect(startStopwatch.calledOnce).to.equal(true);
  });
});
