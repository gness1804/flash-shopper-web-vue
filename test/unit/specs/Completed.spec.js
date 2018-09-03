import { mount } from 'avoriaz';
import Completed from '@/components/Completed';
import items from '../helpers/FakeItemsArray';
import display from '../../../src/helpers/displayVars';

describe('Completed', () => {
  const itemsRef = {
    push: sinon.spy(),
    child: {
      remove: sinon.spy(),
    },
  };
  const items2 = items.filter(i => i.dateCompleted !== null);

  it('should render the correct data', () => {
    const component = mount(Completed);
    component.setData({ items: items2 });
    component.setData({ itemsRef });
    const header = component.find('h2')[0];
    expect(header.text().trim()).to.equal('Completed Items');
  });

  it('should fire the initializeApp method on mount', () => {
    const component = mount(Completed);
    const initializeApp = sinon.stub();
    component.setData({ items: items2 });
    component.setData({ isUser: true });
    component.setMethods({ initializeApp });
    setTimeout(() => {
      expect(initializeApp.calledOnce).to.equal(true);
    }, display.timerStandard);
  });

  it('clicking the Sort by Date button should trigger the appropriate method', () => {
    const component = mount(Completed);
    component.setData({ items: items2 });
    component.setData({ itemsRef });
    component.setData({ isUser: true });
    const sortByDate = sinon.stub();
    component.setMethods({ sortByDate });
    const button = component.find('.sort-items-button')[0];
    button.trigger('click');
    expect(sortByDate.calledOnce).to.equal(true);
  });

  it('clicking the Sort Alpha button should trigger the appropriate method', () => {
    const component = mount(Completed);
    component.setData({ items: items2 });
    component.setData({ itemsRef });
    component.setData({ isUser: true });
    const sortAlpha = sinon.stub();
    component.setMethods({ sortAlpha });
    const button = component.find('.sort-alpha-button')[0];
    button.trigger('click');
    expect(sortAlpha.calledOnce).to.equal(true);
  });
});
