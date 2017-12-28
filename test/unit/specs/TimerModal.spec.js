import { mount } from 'avoriaz';
import TimerModal from '@/components/TimerModal';

describe('TimerModal', () => {
  it('should fire the tabulateNumbers method on mount', () => {
    const component = mount(TimerModal);
    const tabulateNumbers = sinon.stub();
    component.setMethods({ tabulateNumbers });
    setTimeout(() => {
      expect(tabulateNumbers.calledOnce).to.equal(true);
    }, 3000);
  });

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

  it('tabulateNumbers should correctly populate the number dropdowns', () => {
    const component = mount(TimerModal);
    const n1 = component.data().numbersOne;
    const n2 = component.data().numbersTwo;
    setTimeout(() => {
      expect(n1.length).to.equal(100);
      expect(n2.length).to.equal(100);
      expect(n1[0]).to.equal(1);
      expect(n2[0]).to.equal(1);
      expect(n1[n1.length - 1]).to.equal(100);
      expect(n2[n2.length - 1]).to.equal(100);
    }, 3000);
  });
});
