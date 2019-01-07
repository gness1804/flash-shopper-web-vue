import { mount } from 'avoriaz';
import TimerModal from '@/components/TimerModal';
import display from '../../../src/helpers/displayVars';

describe('TimerModal', () => {
  it('should fire the tabulateNumbers method on mount', () => {
    const component = mount(TimerModal);
    const tabulateNumbers = sinon.stub();
    component.setMethods({ tabulateNumbers });
    setTimeout(() => {
      expect(tabulateNumbers.calledOnce).to.equal(true);
    }, display.timerStandard);
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
    }, display.timerStandard);
  });

  it('the startStopwatch method should fail if there is no time', () => {
    Object.assign(window, { alert: sinon.spy() });
    const component = mount(TimerModal);
    component.setData({ timeOne: '' });
    const button = component.find('.timer-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.alert,
      'Oops! You need to enter at least one valid time.',
    );
  });

  it('the startStopwatch method should fail if there is no unit', () => {
    Object.assign(window, { alert: sinon.spy() });
    const component = mount(TimerModal);
    component.setData({ unitsOne: '' });
    const button = component.find('.timer-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.alert,
      'Oops! You need to enter at least one valid time.',
    );
  });

  it('the startStopwatch method should call window.open with the correct url', () => {
    Object.assign(window, { open: sinon.spy() });
    const component = mount(TimerModal);
    const button = component.find('.stopwatch-icon')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.open,
      'https://www.google.com/search?q=start+stopwatch',
    );
  });

  it('the startTimer method should call window.open with the correct url when there are no time inputs other than the default', () => {
    Object.assign(window, { open: sinon.spy() });
    const component = mount(TimerModal);
    const button = component.find('.timer-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.open,
      'https://www.google.com/search?q=set+timer+for+5+minutes',
    );
  });

  it('the startTimer method should call window.open with the correct url (the default) when the user enters a time but no unit', () => {
    Object.assign(window, { open: sinon.spy() });
    const component = mount(TimerModal);
    component.setData({ timeTwo: '20' });
    const button = component.find('.timer-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.open,
      'https://www.google.com/search?q=set+timer+for+5+minutes',
    );
  });

  it('the startTimer method should call window.open with the correct url (the default) when the user enters a unit but no time', () => {
    Object.assign(window, { open: sinon.spy() });
    const component = mount(TimerModal);
    component.setData({ unitsTwo: 'hours' });
    const button = component.find('.timer-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.open,
      'https://www.google.com/search?q=set+timer+for+5+minutes',
    );
  });

  it('the startTimer method should call window.open with the correct url (the full one) when the user enters both a unit and a time', () => {
    Object.assign(window, { open: sinon.spy() });
    const component = mount(TimerModal);
    component.setData({ timeTwo: '20' });
    component.setData({ unitsTwo: 'hours' });
    const button = component.find('.timer-button')[0];
    button.trigger('click');
    sinon.assert.calledWith(
      window.open,
      'https://www.google.com/search?q=set+timer+for+5+minutes+and+20+hours',
    );
  });
});
